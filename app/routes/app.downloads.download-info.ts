import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { tiktokDownloadInfo } from '~/utils/tiktok'

async function downloadTiktokInfo({ url, id }: { url: string; id: string }) {
	const { status, result, message } = await tiktokDownloadInfo(url)

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
			await downloadTiktokInfo({ url: link, id })
			break

		case 'youtube':
			break

		default:
			break
	}

	return {}
}
