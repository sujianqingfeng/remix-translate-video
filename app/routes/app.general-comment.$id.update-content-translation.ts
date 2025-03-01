import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import type { GeneralCommentTypeTextInfo } from '~/types'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params

	invariant(id, 'Comment ID is required')

	const formData = await request.formData()
	const translatedContent = formData.get('translatedContent') as string

	const comment = await db.query.generalComments.findFirst({
		where: eq(schema.generalComments.id, id),
	})

	if (!comment) throw new Error('Comment not found')

	const typeInfo = comment.typeInfo as GeneralCommentTypeTextInfo
	if (!typeInfo.content) throw new Error('Content is required')

	await db
		.update(schema.generalComments)
		.set({
			typeInfo: {
				...typeInfo,
				contentZh: translatedContent,
			},
		})
		.where(eq(schema.generalComments.id, id))

	return { success: true }
}
