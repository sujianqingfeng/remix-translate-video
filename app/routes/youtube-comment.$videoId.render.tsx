import fsp from 'node:fs/promises'
import path from 'node:path'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import invariant from 'tiny-invariant'
import { webpackOverride } from '~/remotion/webpack-override'
import type { YoutubeComment } from '~/types'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'
import {
	generateRemotionVideoComment,
	getYoutubeCommentOut,
} from '~/utils/youtube'

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
	const title = formData.get('title')
	const durationInSeconds = formData.get('durationInSeconds')
	const dateTime = formData.get('dateTime')
	const viewCount = formData.get('viewCount')

	invariant(videoSrc, 'videoSrc is required')
	invariant(title, 'title is required')
	invariant(totalDurationInFrames, 'totalDurationInFrames is required')
	invariant(fps, 'fps is required')
	invariant(durationInSeconds, 'durationInSeconds is required')
	invariant(dateTime, 'dateTime is required')
	invariant(viewCount, 'viewCount is required')

	const { videoId } = params

	const { commentFile } = getYoutubeCommentOut(videoId)
	const str = await fsp.readFile(commentFile, 'utf-8')
	const comments: YoutubeComment[] = JSON.parse(str)

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
		title,
		videoSrc: videoSrc,
		dateTime,
		viewCount,
	}

	const composition = await selectComposition({
		serveUrl: bundled,
		id: 'TranslateCommentVideo',
		inputProps,
	})

	composition.durationInFrames = +totalDurationInFrames
	composition.fps = +fps

	await renderMedia({
		codec: 'h264',
		composition,
		serveUrl: bundled,
		inputProps,
		outputLocation: `out/${videoId}/output.mp4`,
		onProgress: throttleRenderOnProgress,
	})

	return json({ success: true })
}
