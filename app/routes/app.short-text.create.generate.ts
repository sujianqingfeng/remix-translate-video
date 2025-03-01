import { type ActionFunctionArgs, data } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { GenerateShortTextActionData, ShortText } from '~/types'
import { doubao } from '~/utils/ai'

export async function generateShortText(theme: string) {
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

	const result = await doubao.generateText({
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

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const theme = formData.get('theme')
	invariant(theme, 'theme is required')

	const shortText = await generateShortText(theme as string)

	return data<GenerateShortTextActionData>(
		{ success: true, shortText },
		{
			headers: {
				'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
				Pragma: 'no-cache',
				Expires: '0',
			},
		},
	)
}
