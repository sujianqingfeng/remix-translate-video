import ytdl from '@distube/ytdl-core'
import fetch, { type RequestInit } from 'node-fetch'
import { generateYoutubeUrlByVideoId } from './common'

export async function downloadYoutubeVideo({
	videoId,
	proxyUri,
}: { videoId: string; proxyUri: string }) {
	const agent = ytdl.createProxyAgent({ uri: proxyUri })

	const url = `http://www.youtube.com/watch?v=${videoId}`

	const result = await ytdl.getInfo(url, { agent })

	const filterFormats = result.formats

	return filterFormats
}

export async function downloadYoutubeHtml(
	videoId: string,
	{ agent, userAgent }: { agent?: RequestInit['agent']; userAgent: string },
) {
	const url = generateYoutubeUrlByVideoId(videoId)

	const response = await fetch(url, {
		agent,
		headers: {
			'User-Agent': userAgent,
		},
	})
	const html = await response.text()

	return html
}
