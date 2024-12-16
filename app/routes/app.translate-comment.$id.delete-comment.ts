import type { ActionFunctionArgs } from '@remix-run/node'
import { formatDate } from 'date-fns'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { PROXY } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { type Comments, tiktokGetComments } from '~/utils/tiktok'

const mapComment = (comment: Comments) => {
	const { text, likeCount, user } = comment
	return {
		content: text,
		author: user.nickname,
		likes: likeCount,
		authorThumbnail: user.avatarThumb[0] || '',
		publishedTime: formatDate(comment.createTime, 'yyyy-MM-dd HH:mm:ss'),
		translatedContent: '',
	}
}

async function downloadTiktokComments({ link, id }: { link: string; id: string }) {
	const result = await tiktokGetComments({ url: link, proxy: PROXY })

	if (!result) {
		throw new Error('No comments found')
	}

	const comments = result.map(mapComment)

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
			break

		default:
			break
	}

	return {}
}
