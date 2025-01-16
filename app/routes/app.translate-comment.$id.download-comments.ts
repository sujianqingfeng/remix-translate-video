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

async function downloadTiktokComments({ link, id, pageCount }: { link: string; id: string; pageCount: number }) {
	const allComments: Comments[] = []
	for (let i = 0; i < pageCount; i++) {
		const result = await tiktokGetComments({ url: link, proxy: PROXY, cursor: i * 20 })
		if (!result || result.length === 0) break
		allComments.push(...result)
		if (i < pageCount - 1) await sleep(1000)
	}

	if (!allComments.length) {
		throw new Error('No comments found')
	}

	const comments = allComments.map(mapTiktokComment)

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

async function downloadYoutubeComments({ id, link, pageCount }: { id: string; link: string; pageCount: number }) {
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
	let currentPage = 1

	if (youtubeComments.has_continuation && currentPage < pageCount) {
		await sleep(1000)
		let continuation = await youtubeComments.getContinuation()
		comments = comments.concat(continuation.contents.map(mapYoutubeComment))
		currentPage++

		while (continuation.has_continuation && currentPage < pageCount) {
			await sleep(1000)
			continuation = await continuation.getContinuation()
			comments = comments.concat(continuation.contents.map(mapYoutubeComment))
			currentPage++
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

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const formData = await request.formData()
	const pageCount = Number(formData.get('pageCount')) || 3

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
			await downloadTiktokComments({ id, link, pageCount })
			break

		case 'youtube':
			await downloadYoutubeComments({ id, link, pageCount })
			break

		default:
			break
	}

	return {}
}
