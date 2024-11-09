import fetch, { type RequestInit } from 'node-fetch'
import { YOUTUBE_RE_XML_TRANSCRIPT } from '~/constants'

export function parseTranscriptCaptionUrl(html: string) {
	if (!html.includes('"captionTracks":')) {
		return null
	}

	// 查找包含 captionTracks 的部分
	const match = html.match(/"captionTracks":\[.*?\]/)
	if (!match) return null

	// 提取第一个 baseUrl
	const baseUrlMatch = match[0].match(/baseUrl":"(.*?)"/)
	if (!baseUrlMatch) return null

	// 解码 URL（YouTube 的 URL 是经过转义的）
	const url = baseUrlMatch[1].replace(/\\u0026/g, '&')
	return url
}

export async function getYoutubeTranscript({
	html,
	agent,
}: {
	html: string
	videoId: string
	agent?: RequestInit['agent']
}) {
	// 获取字幕 URL
	const captionUrl = parseTranscriptCaptionUrl(html)
	if (!captionUrl) {
		throw new Error('No caption URL found')
	}

	// 获取字幕内容
	const captionResponse = await fetch(captionUrl, {
		agent,
	})
	const captionXml = await captionResponse.text()

	const results = [...captionXml.matchAll(YOUTUBE_RE_XML_TRANSCRIPT)]

	return results.map((result) => ({
		text: result[3],
		duration: Number.parseFloat(result[2]),
		offset: Number.parseFloat(result[1]),
	}))
}
