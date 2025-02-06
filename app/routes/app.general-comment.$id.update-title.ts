import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import { db, schema } from '~/lib/drizzle'
import type { GeneralCommentTypeTextInfo } from '~/types'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params

	if (!id) {
		throw new Error('Comment ID is required')
	}

	const formData = await request.formData()
	const title = formData.get('title')

	if (!title || typeof title !== 'string') {
		throw new Error('Title is required')
	}

	const comment = await db.query.generalComments.findFirst({
		where: eq(schema.generalComments.id, id),
	})

	if (!comment) {
		throw new Error('Comment not found')
	}

	const typeInfo = comment.typeInfo as GeneralCommentTypeTextInfo
	const newTypeInfo = {
		...typeInfo,
		title,
	}

	await db
		.update(schema.generalComments)
		.set({
			typeInfo: newTypeInfo,
		})
		.where(eq(schema.generalComments.id, id))

	return { title }
}
