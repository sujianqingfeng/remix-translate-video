import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import type { Transcript } from '~/types'
import { asyncPool } from '~/utils'
import { chatGPT, deepSeek, r1 } from '~/utils/ai'

// 提取常量到顶层
const CONCURRENT_TASKS = 30
const MAX_TOKENS = {
	deepseek: 300,
	r1: 1000,
	chatgpt: 300,
} as const

const PROMPTS = {
	literal:
		'你是一个精通多语言的字幕翻译大师，给你两句话，一个是上一句，一个是当前需要翻译的句子，根据上一句的语境将当前句子的内容翻译成中文，不要带上一句的内容，保留原文特定的术语或名称（如有），只返回当前句的翻译，不要去解释内容，末尾不需要加任何标点符号',
	literalR1:
		'你是一个精通多语言的字幕翻译大师，给你两句话，一个是上一句，一个是当前需要翻译的句子，根据上一句的语境将当前句子的内容翻译成中文，不要带上一句的内容，保留原文特定的术语或名称（如有），只返回当前句的翻译，不要去解释内容，末尾不需要加任何标点符号。尽量简练一些，因为视频字幕翻译的句子不会太长。',
	interpretation:
		'你是一个精通中文的字幕大师，我会给你两句话，一句是上一句翻译过的内容，一句是当前需要意译的句子，根据上一句的语境将当前句重新意译，不要带上一句的内容，不要添加也不要遗漏内容，遵守原意的前提下让内容更加简练，符合中文表达习惯。保留原文特定的术语或者名称（如有），不要去解释内容和名词，末尾不需要加任何标点符号',
	title: '将标题翻译成中文，保持简洁准确',
} as const

type AIModel = 'deepseek' | 'r1' | 'chatgpt'

// 提取AI文本生成逻辑
async function generateAIText(model: AIModel, system: string, prompt: string) {
	const maxTokens = MAX_TOKENS[model]

	switch (model) {
		case 'deepseek':
			return deepSeek.generateText({ system, prompt, maxTokens })
		case 'r1':
			return r1.generateText({ system, prompt, maxTokens })
		case 'chatgpt':
			return chatGPT.generateText({ system, prompt, maxTokens })
	}
}

// 处理单个字幕的翻译
async function translateTranscript(transcript: Transcript, prevText: string, model: AIModel, isR1Mode = false) {
	const prompt = `上一句：${prevText}\n当前句：${transcript.text}`
	const system = isR1Mode ? PROMPTS.literalR1 : PROMPTS.literal

	const result = await generateAIText(model, system, prompt)
	return result
}

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const model = (formData.get('model') as AIModel) || 'deepseek'

	// 获取视频数据
	const where = eq(schema.translateVideos.id, id)
	const translateVideo = await db.query.translateVideos.findFirst({ where })
	invariant(translateVideo, 'translateVideo not found')

	let transcripts = translateVideo.transcripts ?? []

	// R1模式的特殊处理
	if (model === 'r1') {
		const updatedTranscripts = await asyncPool(
			CONCURRENT_TASKS,
			transcripts.filter((item) => !item.textLiteralTranslation),
			async (item, index, array) => {
				const prevText = index > 0 ? array[index - 1].text : ''
				const result = await translateTranscript(item, prevText, model, true)
				return { ...item, textInterpretation: result }
			},
		)

		transcripts = transcripts.map((item) => {
			const updated = updatedTranscripts.find((u) => u.start === item.start && u.end === item.end)
			return updated || item
		})
	} else {
		// 其他模型的处理流程
		// 1. 字面翻译
		const literalTranslations = await asyncPool(
			CONCURRENT_TASKS,
			transcripts.filter((item) => !item.textLiteralTranslation),
			async (item, index, array) => {
				const prevText = index > 0 ? array[index - 1].text : ''
				const result = await translateTranscript(item, prevText, model)
				return { ...item, textLiteralTranslation: result }
			},
		)

		transcripts = transcripts.map((item) => {
			const updated = literalTranslations.find((u) => u.start === item.start && u.end === item.end)
			return updated || item
		})

		// 2. 意译处理
		const interpretations = await asyncPool(
			CONCURRENT_TASKS,
			transcripts.filter((item) => !item.textInterpretation),
			async (item, index, array) => {
				const prevText = index > 0 ? array[index - 1].textInterpretation : ''
				const prompt = `上一句：${prevText}\n当前句：${item.textLiteralTranslation ?? ''}`
				const result = await generateAIText(model, PROMPTS.interpretation, prompt)
				return { ...item, textInterpretation: result }
			},
		)

		transcripts = transcripts.map((item) => {
			const updated = interpretations.find((u) => u.start === item.start && u.end === item.end)
			return updated || item
		})
	}

	// 处理标题翻译
	let titleZh = translateVideo.titleZh
	if (translateVideo.title && !titleZh) {
		titleZh = await generateAIText(model, PROMPTS.title, translateVideo.title)
	}

	// 更新数据库
	await db
		.update(schema.translateVideos)
		.set({
			transcripts,
			titleZh,
		})
		.where(where)

	return { success: true }
}
