import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { asyncPool } from '~/utils'
import { chatGPT, deepSeek } from '~/utils/ai'

const literalPrompt =
	'你是一个精通多语言的字幕翻译大师，给你两句话，一个是上一句，一个是当前需要翻译的句子，根据上一句的语境将当前句子的内容翻译成中文，不要带上一句的内容，保留原文特定的术语或名称（如有），只返回当前句的翻译，不要去解释内容，末尾不需要加任何标点符号。'
const interpretationPrompt =
	'你是一个精通中文的字幕大师，我会给你两句话，一句是上一句翻译过的内容，一句是当前需要意译的句子，根据上一句的语境将当前句重新意译，不要带上一句的内容，不要添加也不要遗漏内容，遵守原意的前提下让内容更加简练，符合中文表达习惯。保留原文特定的术语或者名称（如有），不要去解释内容和名词，末尾不需要加任何标点符号。'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const model = (formData.get('model') as string) || 'deepseek'

	const where = eq(schema.translateVideos.id, id)
	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})
	invariant(translateVideo, 'translateVideo not found')

	const { transcripts, title, titleZh } = translateVideo

	const generateText = async (prompt: string, system: string) => {
		if (model === 'deepseek') {
			return deepSeek.generateText({
				system,
				prompt,
				maxTokens: 300,
			})
		}
		return chatGPT.generateText({
			system,
			prompt,
			maxTokens: 300,
		})
	}

	await asyncPool(
		30,
		(transcripts ?? []).filter((item) => !item.textLiteralTranslation),
		async (item, index, array) => {
			const prevText = index > 0 ? array[index - 1].text : ''
			const result = await generateText(`上一句：${prevText}\n当前句：${item.text}`, literalPrompt)
			item.textLiteralTranslation = result
			return item
		},
	)

	await asyncPool(
		30,
		(transcripts ?? []).filter((item) => !item.textInterpretation),
		async (item, index, array) => {
			const prevText = index > 0 ? array[index - 1].textInterpretation : ''
			const result = await generateText(`上一句：${prevText}\n当前句：${item.textLiteralTranslation ?? ''}`, interpretationPrompt)
			item.textInterpretation = result
			return item
		},
	)

	if (title && !titleZh) {
		translateVideo.titleZh = await generateText(title, '将标题翻译成中文，保持简洁准确')
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
