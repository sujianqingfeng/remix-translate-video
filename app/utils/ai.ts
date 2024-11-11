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
			'You are a helpful assistant that translates text from English to Chinese.',
		prompt: text,
	})
}

export function generateShortText(theme: string) {
	return deepSeek.generateObject({
		system: `你是一个精通英文的文案写手，我会给你一个主题。
       - 生成一段关于这个主题100字左右的文案，用词简单，语句通顺，不要有错别字。
       - 将英语文案需要翻译成中文
       - 需要一个英文标题
       - 英语标题需要翻译成中文
       - 列出英文短文中7-8个有一定难度的单词
       `,
		prompt: theme,
		schema: ShortTextSchema,
	})
}
