import type { ActionFunctionArgs } from '@remix-run/node'
import { formatDate } from 'date-fns'
import { eq } from 'drizzle-orm'
import getVideoId from 'get-video-id'
import invariant from 'tiny-invariant'
import { ProxyAgent } from 'undici'
import { PROXY } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { sleep } from '~/utils'
import { type Comments, tiktokGetComments } from '~/utils/tiktok'
import { createProxyYoutubeInnertube } from '~/utils/youtube'

const mapTiktokComment = (comment: Comments) => {
	const { text, likeCount, user } = comment
	const links = likeCount || 0
	return {
		content: text,
		author: user.nickname,
		likes: `${links}`,
		authorThumbnail: user.avatarThumb[0] || '',
		publishedTime: formatDate(new Date(comment.createTime * 1000), 'yyyy-MM-dd HH:mm:ss'),
		translatedContent: '',
	}
}

async function downloadTiktokComments({ link, id }: { link: string; id: string }) {
	const result = await tiktokGetComments({ url: link, proxy: PROXY })

	if (!result) {
		throw new Error('No comments found')
	}

	const comments = result.map(mapTiktokComment)

	await db
		.update(schema.translateComments)
		.set({
			comments,
			commentPullAt: new Date(),
		})
		.where(eq(schema.translateComments.id, id))
}

const mapYoutubeComment = (item: any) => {
	return {
		content: item?.comment?.content?.text ?? '',
		author: item?.comment?.author?.name ?? '',
		likes: item?.comment?.like_count ?? '',
		authorThumbnail: item?.comment?.author?.thumbnails[0].url ?? '',
		publishedTime: item?.comment?.published_time ?? '',
		translatedContent: '',
	}
}

async function downloadYoutubeComments({ id, link }: { id: string; link: string }) {
	const proxyAgent = new ProxyAgent({
		uri: PROXY,
	})
	const innertube = await createProxyYoutubeInnertube(proxyAgent)

	const result = getVideoId(link)
	if (!result.id) {
		throw new Error('No video id found')
	}

	const youtubeComments = await innertube.getComments(result.id)

	let comments = youtubeComments.contents.map(mapYoutubeComment)

	if (youtubeComments.has_continuation) {
		await sleep(1000)
		const continuation = await youtubeComments.getContinuation()
		comments = comments.concat(continuation.contents.map(mapYoutubeComment))

		await sleep(1000)
		if (continuation.has_continuation) {
			const nextContinuation = await continuation.getContinuation()
			comments = comments.concat(nextContinuation.contents.map(mapYoutubeComment))
		}
	}

	await db
		.update(schema.translateComments)
		.set({
			comments,
			commentPullAt: new Date(),
		})
		.where(eq(schema.translateComments.id, id))
}

export const action = async ({ params }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const translateComment = await db.query.translateComments.findFirst({
		where: eq(schema.translateComments.id, id),
	})

	if (!translateComment) {
		throw new Error('id is not correct')
	}

	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, translateComment.downloadId),
	})

	if (!download) {
		throw new Error('download is not correct')
	}

	const { type, link } = download

	switch (type) {
		case 'tiktok':
			await downloadTiktokComments({ id, link })
			break

		case 'youtube':
			await downloadYoutubeComments({ id, link })
			break

		default:
			break
	}

	return {}
}
