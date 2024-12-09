import { createWriteStream } from 'node:fs'
import fsp from 'node:fs/promises'
import archiver from 'archiver'
import { REMOTION_ZIP_BUNDLE_DIR_NAME, REMOTION_ZIP_RENDER_INFO_FILE, TRANSLATE_VIDEO_RENDER_INFO_FILE } from '~/constants'

export async function fileExist(path: string) {
	return await fsp.access(path).then(
		() => true,
		() => false,
	)
}

export async function createRemotionZipArchive(bundleDir: string, renderInfoFile: string, outputZipPath: string): Promise<void> {
	return new Promise((resolve, reject) => {
		const output = createWriteStream(outputZipPath)
		const archive = archiver('zip', {
			zlib: { level: 9 }, // Sets the compression level
		})

		output.on('close', () => resolve())
		archive.on('error', (err) => reject(err))

		archive.pipe(output)

		// Add the bundle directory
		archive.directory(bundleDir, REMOTION_ZIP_BUNDLE_DIR_NAME)

		// Add the render info file
		archive.file(renderInfoFile, { name: REMOTION_ZIP_RENDER_INFO_FILE })

		archive.finalize()
	})
}

export async function createFfmpegZipArchive({
	renderInfoFile,
	outputZipPath,
	sourceFile,
	subtitlesFile,
	sourceFileName,
	subtitlesFileName,
}: {
	renderInfoFile: string
	outputZipPath: string
	sourceFile: string
	subtitlesFile: string
	sourceFileName: string
	subtitlesFileName: string
}): Promise<void> {
	return new Promise((resolve, reject) => {
		const output = createWriteStream(outputZipPath)
		const archive = archiver('zip', {
			zlib: { level: 9 }, // Sets the compression level
		})

		output.on('close', () => resolve())
		archive.on('error', (err) => reject(err))

		archive.pipe(output)

		// Add the render info file
		archive.file(renderInfoFile, { name: TRANSLATE_VIDEO_RENDER_INFO_FILE })
		archive.file(sourceFile, { name: sourceFileName })
		archive.file(subtitlesFile, { name: subtitlesFileName })

		archive.finalize()
	})
}

export async function updateFileJson<T>(path: string, update: Partial<T>) {
	const json = await fsp.readFile(path, 'utf-8')
	const data = JSON.parse(json) as T
	const newData = { ...data, ...update }
	const str = JSON.stringify(newData, null, 2)
	await fsp.writeFile(path, str)
}

export async function readFileJson<T>(path: string): Promise<T> {
	const json = await fsp.readFile(path, 'utf-8')
	return JSON.parse(json) as T
}
