import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import invariant from 'tiny-invariant'
import { BUNDLE_DIR, RENDER_INFO_FILE } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { webpackOverride } from '~/remotion/webpack-override'
import { copyFiles, createDownloadDir, remotionBundleFiles } from '~/utils/file'
import { addRenderTask, uploadRenderZipFile } from '~/utils/remote-render'
import { bundleOnProgress, createRenderZipFile } from '~/utils/remotion'
import { buildTranslateCommentRemotionRenderData } from '~/utils/translate-comment'
import { getTranslateCommentAndDownloadInfo } from '~/utils/translate-comment.server'

const entryPoint = path.join(process.cwd(), 'app', 'remotion', 'new-translate-comments', 'index.ts')

export const action = async ({ params }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const { translateComment, download } = await getTranslateCommentAndDownloadInfo(id)

	if (!download.filePath) {
		throw new Error('download filePath is required')
	}

	const render = await buildTranslateCommentRemotionRenderData({
		mode: translateComment.mode,
		fps: translateComment.fps,
		secondsForEvery30Words: translateComment.secondsForEvery30Words,
		coverDurationInSeconds: translateComment.coverDurationInSeconds,
		comments: translateComment.comments ?? [],
	})

	const playFile = path.basename(download.filePath)

	const inputProps = {
		comments: render.remotionVideoComments,
		title: translateComment.translatedTitle || '',
		playFile,
		viewCountText: download.viewCountText || '',
		coverDurationInSeconds: translateComment.coverDurationInSeconds,
		author: download.author || '',
	}

	const bundledPath = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
		publicPath: './',
	})

	const downloadPath = await createDownloadDir(download.id)
	const bundleFiles = await remotionBundleFiles(bundledPath)
	const destBundlePath = path.join(downloadPath, BUNDLE_DIR)
	const renderInfoFilePath = path.join(downloadPath, RENDER_INFO_FILE)

	const createPublicPrefixPath = path.join.bind(null, destBundlePath, 'public')

	const copyFileMaps = [[download.filePath, createPublicPrefixPath(playFile)], ...bundleFiles.map((file) => [path.join(bundledPath, file), path.join(destBundlePath, file)])] as [
		string,
		string,
	][]

	await copyFiles(copyFileMaps)

	const renderInfo = {
		serveUrl: 'bundle/index.html',
		inputProps,
		composition: {
			durationInFrames: render.totalDurationInFrames,
			fps: translateComment.fps,
			width: render.compositionWidth,
			height: render.compositionHeight,
		},
		compositionId: render.compositionId,
	}

	const zipPath = await createRenderZipFile(renderInfo, destBundlePath, renderInfoFilePath)

	const { id: renderId } = await uploadRenderZipFile(zipPath)
	const { jobId } = await addRenderTask(renderId, 'new-render-comments')

	await db.insert(schema.tasks).values({
		type: 'render-comments',
		desc: `render comments for ${translateComment.translatedTitle}`,
		status: 'pending',
		jobId,
	})

	return {}
}
