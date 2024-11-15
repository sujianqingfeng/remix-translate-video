import fsp from 'node:fs/promises'
import path from 'node:path'
import type { Dispatcher, ProxyAgent } from 'undici'
import Innertube, { Platform } from 'youtubei.js'
import { YOUTUBE_MAYBE_ORIGINAL_DOWNLOAD_FILE_SUFFIXES } from '~/constants'

export async function tryGetYoutubeDownloadFile(outDir: string) {
	let originalVideoFile = ''
	for (const suffix of YOUTUBE_MAYBE_ORIGINAL_DOWNLOAD_FILE_SUFFIXES) {
		const files = await fsp.readdir(outDir)
		const matchedFile = files.find((file) => file.endsWith(suffix))
		if (matchedFile) {
			originalVideoFile = path.join(outDir, matchedFile)
			break
		}
	}
	return originalVideoFile
}

export function generateYoutubeUrlByVideoId(videoId: string) {
	return `https://www.youtube.com/watch?v=${videoId}`
}

export async function createProxyYoutubeInnertube(proxyAgent: ProxyAgent) {
	const innertube = await Innertube.create({
		fetch(input: RequestInfo | URL, init?: RequestInit) {
			const initWithDispatcher = {
				...init,
				dispatcher: proxyAgent,
			} as RequestInit & { dispatcher: Dispatcher }

			return Platform.shim.fetch(input, initWithDispatcher)
		},
	})
	return innertube
}
