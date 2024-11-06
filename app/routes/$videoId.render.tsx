import fsp from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import type { RenderMediaOnProgress } from '@remotion/renderer'
import { renderMedia, selectComposition } from '@remotion/renderer'
import invariant from 'tiny-invariant'
import { ORIGINAL_VIDEO_FILE } from '~/constants'
import type { Comment } from '~/types'
import { throttle } from '~/utils/timer'
import { getOut, getVideoComment } from '~/utils/video'
import { webpackOverride } from '../../src-remotion/webpack-override'

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

export async function action({ params }: ActionFunctionArgs) {
	invariant(params.videoId, 'videoId is required')

	const { commentFile, titleFile } = getOut(params.videoId)
	const str = await fsp.readFile(commentFile, 'utf-8')
	const comments: Comment[] = JSON.parse(str)

	const titleStr = await fsp.readFile(titleFile, 'utf-8')
	const title = JSON.parse(titleStr).translatedTitle

	const { videoComments, totalDurationInFrames } = getVideoComment(comments)

	const p = path.join(process.cwd(), 'src-remotion', 'index.ts')

	const bundled = await bundle({
		entryPoint: p,
		webpackOverride,
		onProgress: bundleOnProgress,
	})

	const composition = await selectComposition({
		serveUrl: bundled,
		id: 'TranslateCommentVideo',
		inputProps: {
			comments: videoComments,
			title,
			videoSrc: ORIGINAL_VIDEO_FILE,
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
			videoSrc: ORIGINAL_VIDEO_FILE,
		},
		outputLocation: `out/${params.videoId}/output.mp4`,
		onProgress: throttleRenderOnProgress,
	})

	// import('@remotion/renderer').then(
	// 	async ({ renderMedia, selectComposition }) => {

	// 	},
	// )

	// import('@remotion/bundler').then(async ({ bundle }) => {

	// })

	return null // Add this line to return null
}
