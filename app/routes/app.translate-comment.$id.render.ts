import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import invariant from 'tiny-invariant'
import { PUBLIC_DIR } from '~/constants'
import { webpackOverride } from '~/remotion/webpack-override'
import { execCommand } from '~/utils/exec'
import { createDownloadDir } from '~/utils/file'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'
import { buildTranslateCommentRemotionRenderData } from '~/utils/translate-comment'
import { getTranslateCommentAndDownloadInfo } from '~/utils/translate-comment.server'

const entryPoint = path.join(process.cwd(), 'app', 'remotion', 'new-translate-comments', 'index.ts')

export const action = async ({ params }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const { translateComment, download } = await getTranslateCommentAndDownloadInfo(id)

	const render = await buildTranslateCommentRemotionRenderData({
		mode: translateComment.mode,
		fps: translateComment.fps,
		secondsForEvery30Words: translateComment.secondsForEvery30Words,
		coverDurationInSeconds: translateComment.coverDurationInSeconds,
		comments: translateComment.comments ?? [],
	})

	let playFile = download.filePath ? path.basename(download.filePath) : null

	// scale video to 720p
	const newPlayFile = `new-${playFile}`
	const newPlayFilePath = path.join(PUBLIC_DIR, newPlayFile)
	const end = render.commentsEndFrame / translateComment.fps
	const command = `ffmpeg -y -ss 0 -i ${download.filePath} -t ${end} -threads 3 -preset medium -crf 30 -vf "scale=trunc(oh*a/2)*2:720" ${newPlayFilePath} -progress pipe:1`
	await execCommand(command)
	playFile = newPlayFile

	const bundled = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
	})

	const inputProps = {
		comments: render.remotionVideoComments,
		title: translateComment.translatedTitle || '',
		playFile,
		viewCountText: download.viewCountText || '',
		coverDurationInSeconds: translateComment.coverDurationInSeconds,
		author: download.author || '',
	}

	const composition = await selectComposition({
		serveUrl: bundled,
		id: render.compositionId,
		inputProps,
	})

	composition.durationInFrames = render.totalDurationInFrames
	composition.fps = translateComment.fps
	composition.height = render.compositionHeight
	composition.width = render.compositionWidth

	const dir = await createDownloadDir(download.id)
	const outputPath = path.join(dir, 'output.mp4')

	await renderMedia({
		codec: 'h264',
		composition,
		serveUrl: bundled,
		inputProps,
		outputLocation: outputPath,
		concurrency: 2,
		onProgress: throttleRenderOnProgress,
	})

	return {}
}
