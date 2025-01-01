import { type ActionFunctionArgs, data } from '@remix-run/node'
import { z } from 'zod'
import type { FillInBlankSentence } from '~/types'
import { deepSeek } from '~/utils/ai'
const GenerateSchema = z.object({
	list: z.array(
		z.object({
			sentence: z.string(),
			word: z.string(),
			sentenceZh: z.string(),
			wordZh: z.string(),
			wordPronunciation: z.string(),
		}),
	),
})

export const action = async ({ request }: ActionFunctionArgs) => {
	const result = await deepSeek.generateObject({
		system: '',
		prompt:
			'你是一个英语老师，需要给学生出填空题，需要出10道题，每道题需要包含一个全量的英文句子，一个对应的中文翻译的句子， 一个对应在英文句子中的单词，一个对应的单词发音，一个对应中文翻译句子中的中文词。请确保每次生成的内容都不一样，可以从以下主题中随机选择：日常生活、工作场景、学习经历、旅游经验、科技发展、环境保护、文化艺术、体育运动等。句子的难度也要有变化，从简单到中等难度都要覆盖。',
		schema: GenerateSchema,
		temperature: 0.8,
	})

	return data<FillInBlankSentence[]>(result.list)
}
