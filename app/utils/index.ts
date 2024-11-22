import fsp from 'node:fs/promises'
import path from 'node:path'
import { PUBLIC_DIR, YOUTUBE_NAME_FILE } from '~/constants'
import { tryGetYoutubeDownloadFile } from './youtube'

/**
 * Generates a unique key with optional prefix
 * @param prefix - Optional prefix for the key
 * @returns A unique string key
 */
export function generateUniqueKey(prefix = ''): string {
	const timestamp = Date.now()
	const random = Math.random().toString(36).substring(2, 8)
	return `${prefix}${timestamp}-${random}`
}

export function publicPlayVideoFile(maybePlayVideoFile: string) {
	const suffixName = path.extname(maybePlayVideoFile)
	const playVideoFileName = `${YOUTUBE_NAME_FILE}${suffixName}`
	const destPath = path.join(PUBLIC_DIR, playVideoFileName)
	return { playVideoFileName, destPath }
}

export async function copyMaybeOriginalVideoToPublic({
	outDir,
}: {
	outDir: string
}) {
	const maybePlayVideoFile = await tryGetYoutubeDownloadFile(outDir)

	if (!maybePlayVideoFile) {
		return {
			maybePlayVideoFile: '',
			playVideoFileName: '',
		}
	}

	const { playVideoFileName, destPath } =
		publicPlayVideoFile(maybePlayVideoFile)

	await fsp.copyFile(maybePlayVideoFile, destPath)

	return {
		maybePlayVideoFile,
		playVideoFileName,
	}
}

export async function sleep(ms: number) {
	await new Promise((resolve) => setTimeout(resolve, ms))
}
