import { createWriteStream } from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import archiver from 'archiver'
import invariant from 'tiny-invariant'
import { fetch } from 'undici'
import { webpackOverride } from '~/remotion/webpack-override'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'
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

async function createZipArchive(bundleDir: string, renderInfoFile: string, outputZipPath: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const output = createWriteStream(outputZipPath)
		const archive = archiver('zip', {
			zlib: { level: 9 }, // Sets the compression level
		})

		output.on('close', () => resolve())
		archive.on('error', (err) => reject(err))

		archive.pipe(output)

		// Add the bundle directory
		archive.directory(bundleDir, 'bundle')

		// Add the render info file
		archive.file(renderInfoFile, { name: 'render-info.json' })

		archive.finalize()
	})
}

export async function action({ request, params }: ActionFunctionArgs) {
	const { key } = params
	invariant(key, 'key is required')

	const requestFormData = await request.formData()
	const fps = requestFormData.get('fps')

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

	const renderInfoStream = new Readable()
	renderInfoStream.push(JSON.stringify(renderInfo))
	renderInfoStream.push(null)

	await fsp.writeFile(renderInfoFile, renderInfoStream)

	// Add zip creation logic here
	const zipPath = path.join(path.dirname(renderInfoFile), 'render.zip')
	await createZipArchive(bundleDir, renderInfoFile, zipPath)

	// Read the zip file
	// const zipFile = await fsp.readFile(zipPath)

	// Create FormData and append the zip file
	// const uploadFormData = new FormData()
	// uploadFormData.append('file', new Blob([zipFile], { type: 'application/zip' }), 'render.zip')

	// Send the request with form-data
	// const data = await fetch('http://localhost:3000/api/upload', {
	// 	method: 'POST',
	// 	// @ts-ignore - FormData type mismatch between node and browser
	// 	body: uploadFormData,
	// }).then((res) => res.json())
	// console.log('🚀 ~ action ~ data:', data)

	return { success: true }
}
