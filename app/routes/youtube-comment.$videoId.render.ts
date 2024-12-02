import fsp from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import invariant from 'tiny-invariant'
import { YOUTUBE_COMMENT_ID_PREFIX } from '~/constants'
import { webpackOverride } from '~/remotion/webpack-override'
import type { YoutubeInfo } from '~/types'
import { publicPlayVideoFile } from '~/utils'
import { execCommand } from '~/utils/exec'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'
import { buildRemotionRenderData, getYoutubeCommentOut } from '~/utils/translate-comment'
import { tryGetYoutubeDownloadFile } from '~/utils/youtube'

const entryPoint = path.join(process.cwd(), 'app', 'remotion', 'translate-comments', 'index.ts')

export async function action({ request, params }: ActionFunctionArgs) {
	invariant(params.videoId, 'videoId is required')
	const { videoId } = params

	const formData = await request.formData()
	const playVideoFileName = formData.get('playVideoFileName')
	invariant(playVideoFileName, 'playVideoFileName is required')

	const { infoFile, outDir } = getYoutubeCommentOut(videoId)

	const infoStr = await fsp.readFile(infoFile, 'utf-8')
	const info: YoutubeInfo = JSON.parse(infoStr)

	const { fps, compositionHeight, compositionWidth, totalDurationInFrames, coverDuration, remotionVideoComments, compositionId, commentsEndFrame } = await buildRemotionRenderData({
		videoId,
		mode: info.mode,
	})

	const maybePlayVideoFile = await tryGetYoutubeDownloadFile(outDir)
	// if (maybePlayVideoFile) {
	// 	const { destPath } = publicPlayVideoFile(maybePlayVideoFile)
	// 	const end = commentsEndFrame / fps
	// 	const command = `ffmpeg -y -ss 0 -i ${maybePlayVideoFile} -t ${end} -threads 3 -preset medium -crf 40 ${destPath} -progress pipe:1`
	// 	console.log('processing video...')
	// 	await execCommand(command)
	// 	console.log('video processed')
	// }

	const bundled = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
	})

	const inputProps = {
		comments: remotionVideoComments,
		title: info.translatedTitle,
		videoSrc: playVideoFileName,
		viewCount: info.viewCount,
		coverDuration: +coverDuration,
		author: info.author,
	}

	const composition = await selectComposition({
		serveUrl: bundled,
		id: compositionId,
		inputProps,
	})

	composition.durationInFrames = +totalDurationInFrames
	composition.fps = +fps
	composition.height = compositionHeight
	composition.width = compositionWidth

	await renderMedia({
		codec: 'h264',
		composition,
		serveUrl: bundled,
		inputProps,
		outputLocation: `out/${YOUTUBE_COMMENT_ID_PREFIX}${videoId}/output.mp4`,
		concurrency: 2,
		onProgress: throttleRenderOnProgress,
	})

	return { success: true }
}
