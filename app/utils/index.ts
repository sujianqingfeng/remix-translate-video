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

	const { playVideoFileName, destPath } = publicPlayVideoFile(maybePlayVideoFile)

	await fsp.copyFile(maybePlayVideoFile, destPath)

	return {
		maybePlayVideoFile,
		playVideoFileName,
	}
}

export async function sleep(ms: number) {
	await new Promise((resolve) => setTimeout(resolve, ms))
}

// 添加并发控制函数
export async function asyncPool<T, U>(poolLimit: number, items: T[], iteratorFn: (item: T, index: number, array: T[]) => Promise<U>): Promise<U[]> {
	const ret: Promise<U>[] = []
	const executing = new Set<Promise<U>>()

	for (let i = 0; i < items.length; i++) {
		const p = Promise.resolve().then(() => iteratorFn(items[i], i, items))
		ret.push(p)
		executing.add(p)

		const clean = () => executing.delete(p)
		p.then(clean).catch(clean)

		if (executing.size >= poolLimit) {
			await Promise.race(executing)
		}
	}
	return Promise.all(ret)
}
