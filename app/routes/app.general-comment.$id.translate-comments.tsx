import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import { db, schema } from '~/lib/drizzle'
import type { AiModel } from '~/utils/ai'
import { translate } from '~/utils/translate'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params
	if (!id) throw new Error('Comment ID is required')

	const formData = await request.formData()
	const model = ((formData.get('model') as string) || 'deepseek') as AiModel

	const comment = await db.query.generalComments.findFirst({
		where: eq(schema.generalComments.id, id),
	})

	if (!comment) throw new Error('Comment not found')
	if (!comment.comments?.length) throw new Error('No comments to translate')

	// Translate all comments in parallel
	const translatedComments = await Promise.all(
		comment.comments.map(async (c) => ({
			...c,
			translatedContent: await translate(c.content, model),
		})),
	)

	await db
		.update(schema.generalComments)
		.set({
			comments: translatedComments,
		})
		.where(eq(schema.generalComments.id, id))

	return { success: true }
}
