import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { asyncPool } from '~/utils'
import { translate } from '~/utils/ai'

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

	const { title } = download

	let translatedTitle = ''
	if (title) {
		translatedTitle = await translate(title)
	}

	if (translateComment.comments?.length) {
		await asyncPool(30, translateComment.comments, async (item) => {
			const result = await translate(item.content)
			item.translatedContent = result
			return item
		})
	}

	const data = {
		comments: translateComment.comments,
		translatedTitle,
	}
	await db.update(schema.translateComments).set(data).where(eq(schema.translateComments.id, id))

	return {}
}
