import type { Dispatcher, ProxyAgent } from 'undici'
import Innertube, { Platform } from 'youtubei.js'

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
