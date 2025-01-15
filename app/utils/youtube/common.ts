import fs from 'node:fs/promises'
import type { Dispatcher, ProxyAgent } from 'undici'
import Innertube, { Platform } from 'youtubei.js'

function parseCookieFile(content: string): string {
	const lines = content.split('\n')
	const cookiePairs: string[] = []

	for (const line of lines) {
		// Skip comments and empty lines
		if (line.startsWith('#') || line.trim() === '') {
			continue
		}

		const parts = line.split('\t')
		// Format: domain flag path secure expiration name value
		if (parts.length >= 7) {
			const name = parts[5]
			const value = parts[6]
			cookiePairs.push(`${name}=${value}`)
		}
	}

	return cookiePairs.join('; ')
}

export function generateYoutubeUrlByVideoId(videoId: string) {
	return `https://www.youtube.com/watch?v=${videoId}`
}

export async function createProxyYoutubeInnertube(proxyAgent: ProxyAgent) {
	let cookie = ''

	const cookieFilePath = process.env.YOUTUBE_COOKIE_FILE_PATH
	if (cookieFilePath) {
		try {
			const cookieContent = await fs.readFile(cookieFilePath, 'utf-8')
			cookie = parseCookieFile(cookieContent)
		} catch (error) {
			console.error('Failed to read cookie file:', error)
		}
	}

	const innertube = await Innertube.create({
		fetch(input: RequestInfo | URL, init?: RequestInit) {
			const initWithDispatcher = {
				...init,
				dispatcher: proxyAgent,
			} as RequestInit & { dispatcher: Dispatcher }

			return Platform.shim.fetch(input, initWithDispatcher)
		},
		cookie,
	})
	return innertube
}
