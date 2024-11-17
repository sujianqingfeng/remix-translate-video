import fsp from 'node:fs/promises'
import path from 'node:path'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import invariant from 'tiny-invariant'
import { YOUTUBE_COMMENT_ID_PREFIX } from '~/constants'
import { webpackOverride } from '~/remotion/webpack-override'
import type { YoutubeComment, YoutubeInfo } from '~/types'
import { publicPlayVideoFile } from '~/utils'
import { execCommand } from '~/utils/exec'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'
import {
	generateRemotionVideoComment,
	getYoutubeCommentOut,
} from '~/utils/translate-comment'
import { tryGetYoutubeDownloadFile } from '~/utils/youtube'

const entryPoint = path.join(
	process.cwd(),
	'app',
	'remotion',
	'translate-comments',
	'index.ts',
)

export async function action({ request, params }: ActionFunctionArgs) {
	invariant(params.videoId, 'videoId is required')

	const formData = await request.formData()
	const videoSrc = formData.get('videoSrc')
	const totalDurationInFrames = formData.get('totalDurationInFrames')
	const fps = formData.get('fps')
	const durationInSeconds = formData.get('durationInSeconds')
	const coverDuration = formData.get('coverDuration')

	invariant(videoSrc, 'videoSrc is required')
	invariant(totalDurationInFrames, 'totalDurationInFrames is required')
	invariant(fps, 'fps is required')
	invariant(durationInSeconds, 'durationInSeconds is required')
	invariant(coverDuration, 'coverDuration is required')

	const { videoId } = params

	const { commentFile, infoFile, outDir } = getYoutubeCommentOut(videoId)

	const commentStr = await fsp.readFile(commentFile, 'utf-8')
	const comments: YoutubeComment[] = JSON.parse(commentStr)

	const infoStr = await fsp.readFile(infoFile, 'utf-8')
	const info: YoutubeInfo = JSON.parse(infoStr)

	const maybePlayVideoFile = await tryGetYoutubeDownloadFile(outDir)
	if (maybePlayVideoFile) {
		const { destPath } = publicPlayVideoFile(maybePlayVideoFile)
		const end = comments.length * +durationInSeconds
		const command = `ffmpeg -y -ss 0 -i ${maybePlayVideoFile} -t ${end} -c copy ${destPath} -progress pipe:1`
		console.log('processing video...')
		await execCommand(command)
		console.log('video processed')
	}

	const remotionVideoComments = generateRemotionVideoComment(
		comments,
		+fps,
		+durationInSeconds,
	)

	const bundled = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
	})

	const inputProps = {
		comments: remotionVideoComments,
		title: info.translatedTitle,
		videoSrc: videoSrc,
		viewCount: info.viewCount,
		coverDuration: +coverDuration,
		author: info.author,
	}

	const composition = await selectComposition({
		serveUrl: bundled,
		id: 'TranslateComment',
		inputProps,
	})

	composition.durationInFrames = +totalDurationInFrames
	composition.fps = +fps

	await renderMedia({
		codec: 'h264',
		composition,
		serveUrl: bundled,
		inputProps,
		outputLocation: `out/${YOUTUBE_COMMENT_ID_PREFIX}${videoId}/output.mp4`,
		concurrency: 2,
		onProgress: throttleRenderOnProgress,
	})

	return json({ success: true })
}
