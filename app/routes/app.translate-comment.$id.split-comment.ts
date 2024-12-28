import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const formData = await request.formData()
	const index = formData.get('index')

	invariant(index, 'index is required')

	const indexNumber = Number(index)
	const where = eq(schema.translateComments.id, id)

	const translateComment = await db.query.translateComments.findFirst({
		where,
	})

	invariant(translateComment, 'id is not correct')

	const currentComment = translateComment.comments?.[indexNumber]
	invariant(currentComment, 'index is not correct')

	invariant(currentComment.translatedContent, 'translatedContent is required')
	const halfLength = Math.ceil(currentComment.translatedContent.length / 2)
	const content = currentComment.translatedContent
	currentComment.translatedContent = content.slice(0, halfLength)

	const nextComment = {
		...currentComment,
		translatedContent: content.slice(halfLength),
	}

	translateComment.comments?.splice(indexNumber + 1, 0, nextComment)

	await db
		.update(schema.translateComments)
		.set({
			comments: translateComment.comments,
		})
		.where(where)

	return {}
}
