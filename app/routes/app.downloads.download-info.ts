import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import getVideoId from 'get-video-id'
import invariant from 'tiny-invariant'
import { ProxyAgent } from 'undici'
import { PROXY } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { getAmountText } from '~/utils'
import { tiktokDownloadInfo } from '~/utils/tiktok'
import { createProxyYoutubeInnertube } from '~/utils/youtube'

async function downloadTiktokInfo({ link, id }: { link: string; id: string }) {
	const { status, result, message } = await tiktokDownloadInfo(link)

	if (status === 'error' || !result) {
		throw new Error(`Tiktok download error: ${message}`)
	}
	const {
		author: { nickname },
		statistics: { likeCount, commentCount },
		video,
		desc,
	} = result

	await db
		.update(schema.downloads)
		.set({
			title: desc,
			downloadUrl: video,
			author: nickname,
			likeCountText: likeCount,
			commentCountText: commentCount,
		})
		.where(eq(schema.downloads.id, id))
}

async function downloadYoutubeInfo({ id, link }: { id: string; link: string }) {
	const result = getVideoId(link)
	if (!result.id) {
		throw new Error('No video id found')
	}

	const videoId = result.id

	const innertube = await createProxyYoutubeInnertube(
		new ProxyAgent({
			uri: PROXY,
		}),
	)
	const youtubeInfo = await innertube.getBasicInfo(videoId)

	await db
		.update(schema.downloads)
		.set({
			title: youtubeInfo.basic_info.title,
			author: youtubeInfo.basic_info.author,
			likeCountText: getAmountText(youtubeInfo.basic_info?.like_count),
			viewCountText: getAmountText(youtubeInfo.basic_info?.view_count),
		})
		.where(eq(schema.downloads.id, id))
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()

	const id = formData.get('id')?.toString() ?? null

	invariant(id, 'id is required')

	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, id),
	})

	if (!download) {
		throw new Error('id is not correct')
	}

	const { type, link } = download

	switch (type) {
		case 'tiktok':
			await downloadTiktokInfo({ link, id })
			break

		case 'youtube':
			await downloadYoutubeInfo({ id, link })
			break

		default:
			break
	}

	return {}
}
