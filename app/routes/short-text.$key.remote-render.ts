import fsp from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import invariant from 'tiny-invariant'
import { webpackOverride } from '~/remotion/webpack-override'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'
import { buildRemotionRenderData } from '~/utils/short-text'

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

	const formData = await request.formData()
	const fps = formData.get('fps')

	invariant(fps, 'fps is required')

	const { totalDurationInFrames, wordTranscripts, shortText, audioDuration, sentenceTranscript, shortTextBgFile, shortTextCoverFile, playAudioFile } =
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
		isRemoteRender: true,
		shortTextBgFile: `/public/${shortTextBgFile}`,
		shortTextCoverFile: `/public/${shortTextCoverFile}`,
		playAudioFile: `/public/${playAudioFile}`,
	}

	const bundled = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
		publicPath: './',
	})

	const files = await shortTextBundleFiles({ bundledPath: bundled, coverFile: shortTextCoverFile, audioFile: playAudioFile, bgFile: shortTextBgFile })

	for (const file of files) {
		const filePath = path.join(bundled, file)
		const prefixFile = path.join(key, file)
		// await client.put(prefixFile, filePath)
	}

	const renderInfo = {
		serveUrl: `${process.env.OSS_BUCKET_URL}/${key}/index.html`,
		inputProps,
		composition: {
			durationInFrames: totalDurationInFrames,
			fps: +fps,
			width: shortText.direction ? 1920 : 1080,
			height: shortText.direction ? 1080 : 1920,
		},
		compositionId: 'ShortTexts',
	}

	const renderInfoStream = new Readable()
	renderInfoStream.push(JSON.stringify(renderInfo))
	renderInfoStream.push(null)
	// await client.putStream(`${key}/short-text-render.json`, renderInfoStream)

	// const composition = await selectComposition({
	// 	serveUrl: `${process.env.OSS_BUCKET_URL}/${key}/index.html`,
	// 	id: 'ShortTexts',
	// 	inputProps,
	// })

	// const width = shortText.direction ? 1920 : 1080
	// const height = shortText.direction ? 1080 : 1920

	// composition.durationInFrames = totalDurationInFrames
	// composition.fps = +fps
	// composition.width = width
	// composition.height = height

	// await renderMedia({
	// 	codec: 'h264',
	// 	composition,
	// 	serveUrl: bundled,
	// 	inputProps,
	// 	outputLocation: `out/${key}/output.mp4`,
	// 	onProgress: throttleRenderOnProgress,
	// })

	return { success: true }
}