import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import { db, schema } from '~/lib/drizzle'
import type { GeneralCommentTypeTextInfo } from '~/types'
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

	const typeInfo = comment.typeInfo as GeneralCommentTypeTextInfo
	if (!typeInfo.content) throw new Error('Content is required')

	const translatedContent = await translate(typeInfo.content, model)

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
