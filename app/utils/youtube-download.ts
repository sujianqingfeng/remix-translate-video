import ytdl from '@distube/ytdl-core'

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
