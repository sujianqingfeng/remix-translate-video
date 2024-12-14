import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { tiktokGetComments } from '~/utils/tiktok'

async function downloadTiktokComments({ link, id }: { link: string; id: string }) {
	console.log('🚀 ~ downloadTiktokComments ~ link:', link)
	const { status, result, message } = await tiktokGetComments(link)
	console.log('🚀 ~ downloadTiktokComments ~ result:', result)

	if (status === 'error') {
		throw new Error(message)
	}

	if (!result) {
		throw new Error('No comments found')
	}

	result.map((comment) => {
		const { text, likeCount, user } = comment

		return {
			content: text,
			author: user.nickname,
			likes: likeCount,
			authorThumbnail: user.avatarThumb,
			publishedTime: comment.createTime,
			translatedContent: '',
		}
	})

	// await db
	// 	.update(schema.downloads)
	// 	.set({
	// 		filePath,
	// 	})
	// 	.where(eq(schema.downloads.id, id))
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
			await downloadTiktokComments({ id, link })
			break

		case 'youtube':
			break

		default:
			break
	}

	return {}
}
