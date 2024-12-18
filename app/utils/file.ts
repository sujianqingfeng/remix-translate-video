import { createWriteStream } from 'node:fs'
import fsp from 'node:fs/promises'
import path from 'node:path'
import archiver from 'archiver'
import { DOWNLOADS_DIR, PUBLIC_DIR, REMOTION_ZIP_BUNDLE_DIR_NAME, REMOTION_ZIP_RENDER_INFO_FILE, TRANSLATE_VIDEO_RENDER_INFO_FILE } from '~/constants'

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

export async function createDownloadDir(id: string) {
	const dir = path.join(DOWNLOADS_DIR, id)
	await fsp.mkdir(dir, { recursive: true })
	return dir
}

export async function copyFileToPublic({
	filePath,
	destFileName,
}: {
	filePath: string
	destFileName?: string
}) {
	const destPath = path.join(PUBLIC_DIR, destFileName || path.basename(filePath))
	await fsp.copyFile(filePath, destPath)
}

export async function remotionBundleFiles(bundledPath: string) {
	const result: string[] = []

	const files = await fsp.readdir(bundledPath)
	for (const file of files) {
		const filePath = path.join(bundledPath, file)
		const fileStat = await fsp.stat(filePath)
		if (fileStat.isFile()) {
			result.push(file)
		}
	}

	return result
}

export async function copyFiles(copyFileMaps: [string, string][]) {
	for (const [src, dest] of copyFileMaps) {
		const targetDir = path.dirname(dest)
		await fsp.mkdir(targetDir, { recursive: true })
		await fsp.copyFile(src, dest)
	}
}
