import type { ShortText } from '~/types'
import createChatGPT from './chatgpt'
import createDeepSeek from './deep-seek'
import createDouBao from './doubao'
import createR1 from './r1'

const chatGPT = createChatGPT({ apiKey: process.env.OPEN_AI_API_KEY || '' })
const deepSeek = createDeepSeek({ apiKey: process.env.DEEP_SEEK_API_KEY || '' })
const r1 = createR1({ apiKey: process.env.R1_API_KEY || '' })

const translatePrompt = '你是一个精通多语言的翻译大师，将文本翻译成中文。如果是中文，就返回原文。保留原文特定的术语(如有)，不要去解释内容和名词。'

export type TranslationModel = 'deepseek' | 'openai' | 'r1'

const MAX_TOKENS = 2000
const MIN_TEXT_LENGTH = 1
const MAX_TEXT_LENGTH = 5000

export async function translate(text: string, model: TranslationModel = 'deepseek'): Promise<string> {
	// Input validation
	if (!text || text.length < MIN_TEXT_LENGTH) {
		throw new Error('Text is too short')
	}
	if (text.length > MAX_TEXT_LENGTH) {
		throw new Error('Text is too long')
	}

	// API key validation
	switch (model) {
		case 'openai': {
			return chatGPT.generateText({
				system: translatePrompt,
				prompt: text,
				maxTokens: MAX_TOKENS,
			})
		}
		case 'r1': {
			return r1.generateText({
				system: translatePrompt,
				prompt: text,
				maxTokens: MAX_TOKENS,
			})
		}
		case 'deepseek': {
			return deepSeek.generateText({
				system: translatePrompt,
				prompt: text,
				maxTokens: MAX_TOKENS,
			})
		}
		default: {
			throw new Error(`Unsupported model: ${model}`)
		}
	}
}

export async function generateShortText(theme: string) {
	const apiKey = process.env.DOU_BAO_API_KEY
	if (!apiKey) {
		throw new Error('DOU_BAO_API_KEY is not set')
	}
	const douBao = createDouBao({ apiKey })

	const PREFILL_PREFIX = '{'

	const system = `你是一个经受了中国高中应试教育的英语老师,我会给你一个标题
          - 需要中文标题和英文标题
          - 写一篇120字左右的连贯的符合中国人思维，适合中国初中水平的英语阅读理解短文，需要有创新性
          - 需要将英语短文翻译成口语化的中文
          - 列出英文短文中7-8个重点词汇作为核心词汇，中英文对照形式，中文意思可以多列几个，用逗号分割
          
          返回json格式
          z.object({
            title: z.string(),
            titleZh: z.string(),
            shortText: z.string(),
            shortTextZh: z.string(),
            words: z.array(
              z.object({
                word: z.string(),
                translation: z.string(),
              }),
            ),
          })
          `

	const result = await douBao.generateText({
		messages: [
			{
				role: 'system',
				content: system,
			},
			{
				role: 'user',
				content: `标题：${theme}`,
			},
			{
				role: 'assistant',
				content: PREFILL_PREFIX,
			},
		],
	})

	return JSON.parse(`${PREFILL_PREFIX}${result}`) as ShortText
}

export { deepSeek, chatGPT, r1 }
