import { ShortTextSchema } from '~/z-schema'
import createDeepSeek from './deep-seek'
const apiKey = process.env.DEEP_SEEK_API_KEY

if (!apiKey) {
	throw new Error('DEEP_SEEK_API_KEY is not set')
}

const deepSeek = createDeepSeek({ apiKey })

export function translate(text: string) {
	return deepSeek.generateText({
		system:
			'你是一个精通多语言的翻译大师，将文本翻译成中文。如果是中文，就返回原文。',
		prompt: text,
		maxTokens: 1000,
	})
}

export function generateShortText(theme: string) {
	return deepSeek.generateObject({
		system: `你是一个经受了中国高中应试教育的英语老师,我会给你一个标题
          - 需要中文和英文标题
          - 写一篇120字左右的连贯的符合中国人思维，适合中国初中水平的英语阅读理解短文，需要有创新性
          - 需要将英语短文翻译成口语化的中文
          - 列出英文短文中7-8个重点词汇作为核心词汇，中英文对照形式`,
		prompt: `标题：${theme}`,
		schema: ShortTextSchema,
	})
}

export { deepSeek }
