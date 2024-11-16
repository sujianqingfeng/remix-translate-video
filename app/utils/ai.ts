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
		system: `你是一个精通英文的文案写手，我会给你一个主题。
       - 生成一段关于这个主题120字左右的文案，初中生水平，简单句型。
       - 将英语文案需要翻译成中文
       - 需要一个英文标题
       - 英语标题需要翻译成中文
       - 列出英文短文中7-8个有一定难度的单词
       `,
		prompt: `主题：${theme}`,
		schema: ShortTextSchema,
	})
}
