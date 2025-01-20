import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import { db, schema } from '~/lib/drizzle'
import type { GeneralCommentTypeTextInfo } from '~/types'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params
	if (!id) throw new Error('Comment ID is required')

	const formData = await request.formData()
	const commentIndex = Number(formData.get('commentIndex'))
	if (isNaN(commentIndex)) throw new Error('Comment index is required')

	const comment = await db.query.generalComments.findFirst({
		where: eq(schema.generalComments.id, id),
	})

	if (!comment) throw new Error('Comment not found')
	if (!comment.comments?.length) throw new Error('No comments to delete')

	const newComments = [...comment.comments]
	newComments.splice(commentIndex, 1)

	await db
		.update(schema.generalComments)
		.set({
			comments: newComments,
		})
		.where(eq(schema.generalComments.id, id))

	return json({ success: true })
}
