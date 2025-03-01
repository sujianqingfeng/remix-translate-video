import type { ActionFunctionArgs } from '@remix-run/node'
import { type SQL, eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { asyncPool } from '~/utils'
import type { AiModel } from '~/utils/ai'
import { translate } from '~/utils/translate'

async function startTranslatedTitle(title: string | null, aiModel: AiModel) {
	let translatedTitle = ''
	if (title) {
		translatedTitle = await translate(title, aiModel)
	}
	return translatedTitle
}

async function translateSingleComment(translateComment: typeof schema.translateComments.$inferSelect, formData: FormData, translateCommentWhere: SQL) {
	const index = formData.get('index')
	const aiModel = (formData.get('aiModel') || 'deepseek') as AiModel

	invariant(index, 'index is required')
	const indexNumber = Number(index)

	const comment = translateComment.comments?.[indexNumber]
	invariant(comment, 'comment is not correct')

	const result = await translate(comment.content, aiModel)
	comment.translatedContent = result

	await db
		.update(schema.translateComments)
		.set({
			comments: translateComment.comments,
		})
		.where(translateCommentWhere)
}

async function translateDefaultAction(translateComment: typeof schema.translateComments.$inferSelect, title: string | null, translateCommentWhere: SQL, aiModel: AiModel) {
	const translatedTitle = await startTranslatedTitle(title, aiModel)

	if (translateComment.comments?.length) {
		await asyncPool(30, translateComment.comments, async (item) => {
			const result = await translate(item.content, aiModel)
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
	invariant(translateComment, 'id is not correct')

	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, translateComment.downloadId),
	})
	invariant(download, 'download is not correct')

	const formData = await request.formData()
	const aiModel = (formData.get('aiModel') || 'deepseek') as AiModel

	const action = formData.get('action')
	const { title } = download

	switch (action) {
		case 'translate-single':
			await translateSingleComment(translateComment, formData, translateCommentWhere)
			break

		default:
			await translateDefaultAction(translateComment, title, translateCommentWhere, aiModel)
			break
	}

	return {}
}
