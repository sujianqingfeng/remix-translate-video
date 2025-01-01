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
		prompt: '你是一个英语老师，需要给学生出填空题，需要出10道题，每道题需要包含一个单词，一个句子，句子是全量的句子,一个句子翻译，一个单词翻译，一个单词发音',
		schema: GenerateSchema,
	})

	return data<FillInBlankSentence[]>(result.list)
}
