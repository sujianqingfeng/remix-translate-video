import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params
	if (!id) throw new Error('Comment ID is required')

	const formData = await request.formData()
	const commentIndex = Number(formData.get('commentIndex'))
	const translatedContent = formData.get('translatedContent') as string

	if (Number.isNaN(commentIndex)) throw new Error('Comment index is required')
	if (!translatedContent) throw new Error('Translated content is required')

	const comment = await db.query.generalComments.findFirst({
		where: eq(schema.generalComments.id, id),
	})

	if (!comment) throw new Error('Comment not found')
	if (!comment.comments?.length) throw new Error('No comments to update')
	if (commentIndex >= comment.comments.length) throw new Error('Invalid comment index')

	const newComments = [...comment.comments]
	newComments[commentIndex] = {
		...newComments[commentIndex],
		translatedContent,
	}

	await db
		.update(schema.generalComments)
		.set({
			comments: newComments,
		})
		.where(eq(schema.generalComments.id, id))

	return json({ success: true })
}
