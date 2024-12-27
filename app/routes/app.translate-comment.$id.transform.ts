import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

const conversions = [['毛主席', '教员']]

// 转换函数
function convert(text?: string): string {
	if (!text) return ''

	let result = text
	for (const [from, to] of conversions) {
		result = result.replace(new RegExp(from, 'g'), to)
	}
	return result
}

export const action = async ({ params }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const translateCommentWhere = eq(schema.translateComments.id, id)

	const translateComment = await db.query.translateComments.findFirst({
		where: translateCommentWhere,
	})

	translateComment?.comments?.map((item) => {
		item.translatedContent = convert(item.translatedContent)
		return item
	})

	await db
		.update(schema.translateComments)
		.set({
			comments: translateComment?.comments,
		})
		.where(translateCommentWhere)

	return {}
}
