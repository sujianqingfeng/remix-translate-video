import { ProxyAgent, fetch } from 'undici'
import { generateYoutubeUrlByVideoId } from './common'

export async function downloadYoutubeHtml(
	videoId: string,
	{ userAgent, proxyUrl }: { proxyUrl: string; userAgent: string },
) {
	const url = generateYoutubeUrlByVideoId(videoId)

	const response = await fetch(url, {
		dispatcher: new ProxyAgent({
			uri: proxyUrl,
		}),
		headers: {
			'User-Agent': userAgent,
		},
	})
	const html = await response.text()
	return html
}
