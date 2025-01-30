import type { ActionFunctionArgs } from '@remix-run/node'
import { type SQL, eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { asyncPool } from '~/utils'
import { gptTranslate, translate } from '~/utils/ai'

type AIModel = 'deepseek' | 'openai'

async function translateText(text: string, aiModel: AIModel) {
	return aiModel === 'openai' ? await gptTranslate(text) : await translate(text)
}

async function startTranslatedTitle(title: string | null, aiModel: AIModel) {
	let translatedTitle = ''
	if (title) {
		translatedTitle = await translateText(title, aiModel)
	}
	return translatedTitle
}

async function translateSingleComment(translateComment: typeof schema.translateComments.$inferSelect, formData: FormData, translateCommentWhere: SQL) {
	const index = formData.get('index')
	const aiModel = (formData.get('aiModel') || 'deepseek') as AIModel

	invariant(index, 'index is required')
	const indexNumber = Number(index)

	const comment = translateComment.comments?.[indexNumber]
	console.log('🚀 ~ translateSingleComment ~ comment:', comment)
	invariant(comment, 'comment is not correct')

	const result = await translateText(comment.content, aiModel)
	console.log('🚀 ~ translateSingleComment ~ result:', result)
	comment.translatedContent = result

	await db
		.update(schema.translateComments)
		.set({
			comments: translateComment.comments,
		})
		.where(translateCommentWhere)
}

async function translateDefaultAction(translateComment: typeof schema.translateComments.$inferSelect, title: string | null, translateCommentWhere: SQL, aiModel: AIModel) {
	const translatedTitle = await startTranslatedTitle(title, aiModel)

	if (translateComment.comments?.length) {
		await asyncPool(30, translateComment.comments, async (item) => {
			const result = await translateText(item.content, aiModel)
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
	const aiModel = (formData.get('aiModel') || 'deepseek') as AIModel

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
