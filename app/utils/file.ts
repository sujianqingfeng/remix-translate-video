import { createWriteStream } from 'node:fs'
import fsp from 'node:fs/promises'
import archiver from 'archiver'
import { REMOTION_ZIP_BUNDLE_DIR_NAME, REMOTION_ZIP_RENDER_INFO_FILE } from '~/constants'

export async function fileExist(path: string) {
	return await fsp.access(path).then(
		() => true,
		() => false,
	)
}

export async function createFileCache<T extends string | Record<string, unknown> | Record<string, unknown>[] = string>({
	path,
	generator,
	isJsonTransform = false,
}: {
	path: string
	generator: () => Promise<T>
	isJsonTransform?: boolean
}): Promise<T> {
	const fileExists = await fileExist(path)

	if (fileExists) {
		const str = await fsp.readFile(path, 'utf-8')
		return isJsonTransform ? JSON.parse(str) : str
	}

	const str = await generator()
	const strToWrite = isJsonTransform ? JSON.stringify(str, null, 2) : str

	if (typeof strToWrite !== 'string') {
		throw new Error('strToWrite is not a string')
	}

	await fsp.writeFile(path, strToWrite)

	return str
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
