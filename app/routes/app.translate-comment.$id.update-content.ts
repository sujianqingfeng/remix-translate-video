import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const formData = await request.formData()
	const index = formData.get('index')
	const translatedContent = formData.get('translatedContent')

	invariant(index, 'index is required')
	invariant(translatedContent, 'translatedContent is required')

	const indexNumber = Number(index)
	const where = eq(schema.translateComments.id, id)

	const translateComment = await db.query.translateComments.findFirst({
		where,
	})

	invariant(translateComment, 'id is not correct')
	invariant(translateComment.comments, 'comments is required')
	invariant(translateComment.comments[indexNumber], 'index is not correct')

	translateComment.comments[indexNumber].translatedContent = translatedContent.toString()

	await db
		.update(schema.translateComments)
		.set({
			comments: translateComment.comments,
		})
		.where(where)

	return {}
}
