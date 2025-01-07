import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { asyncPool } from '~/utils'
import { chatGPT, deepSeek, gptTranslate } from '~/utils/ai'

const literalPrompt =
	'你是一个精通多语言的字幕翻译大师，给你两句话，一个是上一句，一个是当前需要翻译的句子，根据上一句的语境将当前句子的内容翻译成中文，符合中文表达习惯，保留原文特定的术语或媒体名称（如有），只返回当前句的翻译，不要去解释内容，末尾不需要加任何标点符号。'
const interpretationPrompt = '你是一个精通中文的字幕大师，根据内容重新意译，遵守原意的前提下让内容更通俗易懂，符合中文表达习惯。不要去解释内容，末尾不需要加任何标点符号。'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.translateVideos.id, id)
	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})
	invariant(translateVideo, 'translateVideo not found')

	const { transcripts, title, titleZh } = translateVideo

	await asyncPool(
		30,
		(transcripts ?? []).filter((item) => !item.textLiteralTranslation),
		async (item, index, array) => {
			const prevText = index > 0 ? array[index - 1].text : ''
			const result = await deepSeek.generateText({
				system: literalPrompt,
				prompt: `上一句：${prevText}\n当前句：${item.text}`,
				maxTokens: 300,
			})
			item.textLiteralTranslation = result
			return item
		},
	)

	if (title && !titleZh) {
		translateVideo.titleZh = await gptTranslate(title)
	}

	await db
		.update(schema.translateVideos)
		.set({
			transcripts,
			titleZh: translateVideo.titleZh,
		})
		.where(where)

	return { success: true }
}
