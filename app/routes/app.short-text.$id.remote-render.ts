import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { BUNDLE_DIR, PUBLIC_DIR, RENDER_INFO_FILE } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { webpackOverride } from '~/remotion/webpack-override'
import { copyFiles, createOperationDir, remotionBundleFiles } from '~/utils/file'
import { addRenderTask, uploadRenderZipFile } from '~/utils/remote-render'
import { bundleOnProgress, createRenderZipFile } from '~/utils/remotion'
import { buildShortRenderData } from '~/utils/short-text'

const entryPoint = path.join(process.cwd(), 'app', 'remotion', 'short-texts', 'index.ts')
export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.shortTexts.id, id)

	const shortText = await db.query.shortTexts.findFirst({
		where,
	})
	invariant(shortText, 'shortText not found')

	const { totalDurationInFrames, audioDuration, shortTextBgFile, shortTextCoverFile, playAudioFile, compositionWidth, compositionHeight } = await buildShortRenderData(shortText)

	const inputProps = {
		wordTranscripts: shortText.wordTranscripts || [],
		littleDifficultWords: shortText.littleDifficultWords?.map((item) => item.word) || [],
		title: shortText.title,
		titleZh: shortText.titleZh,
		audioDuration,
		shortTextZh: shortText.shortTextZh,
		sentenceTranscript: shortText.sentenceTranscripts || [],
		direction: shortText.direction,
		shortTextBgFile,
		shortTextCoverFile,
		playAudioFile,
		isRemoteRender: false,
	}

	const bundledPath = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
		publicPath: './',
	})

	const operationDir = await createOperationDir(id)
	const bundleFiles = await remotionBundleFiles(bundledPath)
	const destBundlePath = path.join(operationDir, BUNDLE_DIR)
	const renderInfoFilePath = path.join(operationDir, RENDER_INFO_FILE)

	const createPublicPrefixPath = path.join.bind(null, destBundlePath, 'public')

	const bgFilePath = path.join(PUBLIC_DIR, shortTextBgFile)

	const publicFileMaps = [
		[bgFilePath, createPublicPrefixPath(shortTextBgFile)],
		[shortText.coverFilePath, createPublicPrefixPath(shortTextCoverFile)],
		[shortText.audioFilePath, createPublicPrefixPath(playAudioFile)],
	]

	const bundleFileMaps = bundleFiles.map((file) => [path.join(bundledPath, file), path.join(destBundlePath, file)])

	const copyFileMaps = [...publicFileMaps, ...bundleFileMaps] as [string, string][]

	await copyFiles(copyFileMaps)

	const renderInfo = {
		serveUrl: 'bundle/index.html',
		inputProps,
		composition: {
			durationInFrames: totalDurationInFrames,
			fps: shortText.fps,
			width: compositionWidth,
			height: compositionHeight,
		},
		compositionId: 'ShortTexts',
	}

	const zipPath = await createRenderZipFile(renderInfo, destBundlePath, renderInfoFilePath)

	const { id: renderId } = await uploadRenderZipFile(zipPath)
	const { jobId } = await addRenderTask(renderId, 'render-short-texts')

	await db.insert(schema.tasks).values({
		type: 'render-short-texts',
		desc: `render short text for ${shortText.title}`,
		status: 'pending',
		jobId,
	})

	return {}
}
