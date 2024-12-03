import fsp from 'node:fs/promises'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { ProxyAgent } from 'undici'
import { PROXY } from '~/constants'
import type { YoutubeComment } from '~/types'
import { getYoutubeCommentOut } from '~/utils/translate-comment'
import { createProxyYoutubeInnertube } from '~/utils/youtube'

const mapComment = (item: any) => {
	return {
		content: item?.comment?.content?.text ?? '',
		author: item?.comment?.author?.name ?? '',
		likes: item?.comment?.like_count ?? '',
		authorThumbnail: item?.comment?.author?.thumbnails[0].url ?? '',
		publishedTime: item?.comment?.published_time ?? '',
	}
}

export async function action({ params }: ActionFunctionArgs) {
	const videoId = params.videoId
	invariant(videoId, 'videoId is required')
	let comments: YoutubeComment[] = []

	const { commentFile } = getYoutubeCommentOut(videoId)

	const proxyAgent = new ProxyAgent({
		uri: PROXY,
	})
	const innertube = await createProxyYoutubeInnertube(proxyAgent)
	const youtubeComments = await innertube.getComments(videoId)

	comments = youtubeComments.contents.map(mapComment)

	if (youtubeComments.has_continuation) {
		const continuation = await youtubeComments.getContinuation()
		comments = comments.concat(continuation.contents.map(mapComment))

		// await new Promise((resolve) => setTimeout(resolve, 1000))
		// if (continuation.has_continuation) {
		// 	const nextContinuation = await continuation.getContinuation()
		// 	comments = comments.concat(nextContinuation.contents.map(mapComment))
		// }
	}

	await fsp.writeFile(commentFile, JSON.stringify(comments, null, 2))

	return { success: true }
}
