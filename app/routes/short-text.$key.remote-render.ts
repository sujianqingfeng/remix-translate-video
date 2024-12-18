import fsp from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import invariant from 'tiny-invariant'
import { webpackOverride } from '~/remotion/webpack-override'
import { updateFileJson } from '~/utils/file'
import { addRenderTask, uploadRenderZipFile } from '~/utils/remote-render'
import { bundleOnProgress, createRenderZipFile } from '~/utils/remotion'
import { buildRemotionRenderData, getShortTextOut } from '~/utils/short-text'

const entryPoint = path.join(process.cwd(), 'app', 'remotion', 'short-texts', 'index.ts')

async function shortTextBundleFiles({ bundledPath, coverFile, audioFile, bgFile }: { bundledPath: string; coverFile: string; audioFile: string; bgFile: string }) {
	const result: string[] = []

	const files = await fsp.readdir(bundledPath)
	for (const file of files) {
		const filePath = path.join(bundledPath, file)
		const fileStat = await fsp.stat(filePath)
		if (fileStat.isFile()) {
			result.push(file)
		}
	}

	const publicFiles = [coverFile, audioFile, bgFile]

	for (const file of publicFiles) {
		const filePath = path.join('public', file)
		result.push(filePath)
	}

	return result
}

export async function action({ request, params }: ActionFunctionArgs) {
	const { key } = params
	invariant(key, 'key is required')

	const requestFormData = await request.formData()
	const fps = requestFormData.get('fps')

	invariant(fps, 'fps is required')

	const { totalDurationInFrames, wordTranscripts, shortText, audioDuration, sentenceTranscript, shortTextBgFile, shortTextCoverFile, playAudioFile, infoFile } =
		await buildRemotionRenderData({
			key,
			fps: +fps,
		})

	const inputProps = {
		wordTranscripts,
		littleDifficultWords: shortText.words.map((word) => word.word),
		title: shortText.title,
		titleZh: shortText.titleZh,
		shortTextZh: shortText.shortTextZh,
		audioDuration,
		sentenceTranscript,
		direction: shortText.direction,
		isRemoteRender: false,
		shortTextBgFile,
		shortTextCoverFile,
		playAudioFile,
	}

	const bundled = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
		publicPath: './',
	})

	const { bundleDir, renderInfoFile } = getShortTextOut(key)

	const files = await shortTextBundleFiles({ bundledPath: bundled, coverFile: shortTextCoverFile, audioFile: playAudioFile, bgFile: shortTextBgFile })

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
			width: shortText.direction ? 1920 : 1080,
			height: shortText.direction ? 1080 : 1920,
		},
		compositionId: 'ShortTexts',
	}

	const zipPath = await createRenderZipFile(renderInfo, bundleDir, renderInfoFile)
	const { id: renderId } = await uploadRenderZipFile(zipPath)
	const { jobId } = await addRenderTask(renderId, 'render-short-texts')
	await updateFileJson(infoFile, { renderId, jobId })

	return { success: true }
}
