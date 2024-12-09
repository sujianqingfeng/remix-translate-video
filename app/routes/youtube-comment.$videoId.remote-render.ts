import fsp from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import invariant from 'tiny-invariant'
import { webpackOverride } from '~/remotion/webpack-override'
import type { YoutubeInfo } from '~/types'
import { updateFileJson } from '~/utils/file'
import { addRenderTask, uploadRenderZipFile } from '~/utils/remote-render'
import { bundleOnProgress, createRenderZipFile } from '~/utils/remotion'
import { buildRemotionRenderData, getYoutubeCommentOut } from '~/utils/translate-comment'

const entryPoint = path.join(process.cwd(), 'app', 'remotion', 'translate-comments', 'index.ts')

async function youtubeCommentBundleFiles({ bundledPath, playVideoFileName }: { bundledPath: string; playVideoFileName: string }) {
	const result: string[] = []

	const files = await fsp.readdir(bundledPath)
	for (const file of files) {
		const filePath = path.join(bundledPath, file)
		const fileStat = await fsp.stat(filePath)
		if (fileStat.isFile()) {
			result.push(file)
		}
	}

	const publicFiles = [playVideoFileName]

	for (const file of publicFiles) {
		const filePath = path.join('public', file)
		result.push(filePath)
	}

	return result
}

export async function action({ request, params }: ActionFunctionArgs) {
	invariant(params.videoId, 'videoId is required')
	const { videoId } = params

	const formData = await request.formData()
	const playVideoFileName: string | null = formData.get('playVideoFileName') as string | null
	invariant(playVideoFileName, 'playVideoFileName is required')

	const { infoFile, outDir, bundleDir, renderInfoFile } = getYoutubeCommentOut(videoId)

	const infoStr = await fsp.readFile(infoFile, 'utf-8')
	const info: YoutubeInfo = JSON.parse(infoStr)

	const { fps, compositionHeight, compositionWidth, totalDurationInFrames, coverDuration, remotionVideoComments, compositionId, commentsEndFrame } = await buildRemotionRenderData({
		videoId,
		mode: info.mode,
	})

	const bundled = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
		publicPath: './',
	})

	const inputProps = {
		comments: remotionVideoComments,
		title: info.translatedTitle,
		videoSrc: playVideoFileName,
		viewCount: info.viewCount,
		coverDuration: +coverDuration,
		author: info.author,
		isRemoteRender: false,
	}

	const files = await youtubeCommentBundleFiles({ bundledPath: bundled, playVideoFileName })

	for (const file of files) {
		const filePath = path.join(bundled, file)
		const targetDir = path.join(bundleDir, path.dirname(file))
		await fsp.mkdir(targetDir, { recursive: true })
		await fsp.copyFile(filePath, path.join(bundleDir, file))
	}

	const renderInfo = {
		serveUrl: 'bundle/index.html',
		inputProps,
		composition: {
			durationInFrames: totalDurationInFrames,
			fps: +fps,
			width: compositionWidth,
			height: compositionHeight,
		},
		compositionId,
	}

	const zipPath = await createRenderZipFile(renderInfo, bundleDir, renderInfoFile)

	const { id: renderId } = await uploadRenderZipFile(zipPath)
	const { jobId } = await addRenderTask(renderId, 'render-comments')
	await updateFileJson(infoFile, { renderId, jobId })

	return { success: true }
}
