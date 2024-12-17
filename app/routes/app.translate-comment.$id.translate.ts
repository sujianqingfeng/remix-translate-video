import type { ActionFunctionArgs } from '@remix-run/node'
import { type SQL, eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { asyncPool } from '~/utils'
import { translate } from '~/utils/ai'

async function startTranslatedTitle(title: string | null) {
	let translatedTitle = ''
	if (title) {
		translatedTitle = await translate(title)
	}
	return translatedTitle
}

async function translateSingleComment(translateComment: typeof schema.translateComments.$inferSelect, formData: FormData, translateCommentWhere: SQL) {
	const index = formData.get('index')

	if (!index) {
		throw new Error('index is required')
	}

	const indexNumber = Number(index)

	const comment = translateComment.comments?.[indexNumber]

	if (!comment) {
		throw new Error('comment is not correct')
	}

	const result = await translate(comment.content)
	comment.translatedContent = result

	await db
		.update(schema.translateComments)
		.set({
			comments: translateComment.comments,
		})
		.where(translateCommentWhere)
}

async function translateDefaultAction(translateComment: typeof schema.translateComments.$inferSelect, title: string | null, translateCommentWhere: SQL) {
	const translatedTitle = await startTranslatedTitle(title)

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
	await db.update(schema.translateComments).set(data).where(translateCommentWhere)
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const translateCommentWhere = eq(schema.translateComments.id, id)

	const translateComment = await db.query.translateComments.findFirst({
		where: translateCommentWhere,
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

	const formData = await request.formData()

	const action = formData.get('action')

	const { title } = download

	switch (action) {
		case 'translate-single':
			await translateSingleComment(translateComment, formData, translateCommentWhere)
			break

		default:
			await translateDefaultAction(translateComment, title, translateCommentWhere)
			break
	}

	return {}
}
