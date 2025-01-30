import { type ActionFunctionArgs, json } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import { db, schema } from '~/lib/drizzle'
import type { GeneralCommentTypeTextInfo } from '~/types'
import { deepSeek } from '~/utils/ai'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params

	if (!id) {
		throw new Error('Comment ID is required')
	}

	const comment = await db.query.generalComments.findFirst({
		where: eq(schema.generalComments.id, id),
	})

	if (!comment) {
		throw new Error('Comment not found')
	}

	const typeInfo = comment.typeInfo as GeneralCommentTypeTextInfo

	if (!typeInfo.content) {
		throw new Error('Content is required')
	}

	const system = `你是一个标题生成专家。请根据给定的内容生成一个吸引人的标题。标题应该：
- 简洁明了，不超过 20 个字
- 抓住内容的核心主题
- 有吸引力，能引起读者兴趣
- 不要使用标点符号
- 不要使用感叹号或问号
- 不要使用数字编号
- 不要使用引号或其他特殊符号`

	const generatedTitle = await deepSeek.generateText({
		system,
		prompt: typeInfo.content,
		maxTokens: 100,
	})

	const newTypeInfo = {
		...typeInfo,
		title: generatedTitle,
	}

	await db
		.update(schema.generalComments)
		.set({
			typeInfo: newTypeInfo,
		})
		.where(eq(schema.generalComments.id, id))

	return json({ title: generatedTitle })
}
