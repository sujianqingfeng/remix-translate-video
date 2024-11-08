import fsp from 'node:fs/promises'
import path from 'node:path'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import type { RenderMediaOnProgress } from '@remotion/renderer'
import { renderMedia, selectComposition } from '@remotion/renderer'
import invariant from 'tiny-invariant'
import { webpackOverride } from '~/remotion/webpack-override'
import type { Comment } from '~/types'
import { throttle } from '~/utils/timer'
import { getVideoComment, getVideoCommentOut } from '~/utils/video'

const bundleOnProgress = throttle(
	(progress: number) => {
		console.log(`Webpack bundling progress: ${progress}%`)
	},
	1000,
	{ trailing: true },
)

const renderOnProgress: RenderMediaOnProgress = ({ progress }) => {
	console.log(`Rendering is ${progress * 100}% complete`)
}
const throttleRenderOnProgress = throttle(renderOnProgress, 1000, {
	trailing: true,
})

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
	const videoUrl = formData.get('videoUrl')

	invariant(videoUrl, 'videoUrl is required')

	const { videoId } = params

	const { commentFile, titleFile } = getVideoCommentOut(videoId)
	const str = await fsp.readFile(commentFile, 'utf-8')
	const comments: Comment[] = JSON.parse(str)

	const titleStr = await fsp.readFile(titleFile, 'utf-8')
	const title = JSON.parse(titleStr).translatedTitle

	const { videoComments, totalDurationInFrames } = getVideoComment(comments)

	const bundled = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
	})

	const composition = await selectComposition({
		serveUrl: bundled,
		id: 'TranslateCommentVideo',
		inputProps: {
			comments: videoComments,
			title,
			videoSrc: videoUrl,
		},
	})

	composition.durationInFrames = totalDurationInFrames

	await renderMedia({
		codec: 'h264',
		composition,
		serveUrl: bundled,
		inputProps: {
			comments: videoComments,
			title,
			videoSrc: videoUrl,
		},
		outputLocation: `out/${videoId}/output.mp4`,
		onProgress: throttleRenderOnProgress,
	})

	return json({ success: true })
}
