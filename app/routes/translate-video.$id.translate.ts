import fsp from 'node:fs/promises'
import type { ActionFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { Transcript } from '~/types'
import { asyncPool } from '~/utils'
import { deepSeek } from '~/utils/ai'
import { processTranslatedLongTranscripts } from '~/utils/transcript'
import { getTranslateVideoOut } from '~/utils/translate-video'

export async function action({ params }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const { transcriptsFile } = getTranslateVideoOut(id)
	const transcripts = await fsp.readFile(transcriptsFile, 'utf-8')
	const data: Transcript[] = JSON.parse(transcripts)

	const literalPrompt =
		'你是一个精通多语言的字幕翻译大师，给你两句话，一个是上一句，一个是当前需要翻译的句子，根据上一句的语境将当前句子的内容直译成中文，保留原文特定的术语或媒体名称（如有），只返回当前句的翻译，不要去解释内容，末尾不需要加任何标点符号。'
	const interpretationPrompt = '你是一个精通中文的字幕大师，根据内容重新意译，遵守原意的前提下让内容更通俗易懂，符合中文表达习惯。不要去解释内容，末尾不需要加任何标点符号。'

	// 使用 asyncPool 替代 Promise.all，限制并发数为 50
	await asyncPool(
		30,
		data.filter((item) => !item.textLiteralTranslation),
		async (item, index, array) => {
			const prevText = index > 0 ? array[index - 1].text : ''
			const result = await deepSeek.generateText({
				system: literalPrompt,
				prompt: `上一句：${prevText}\n当前句：${item.text}`,
				maxTokens: 200,
			})
			item.textLiteralTranslation = result
			return item
		},
	)

	await fsp.writeFile(transcriptsFile, JSON.stringify(data, null, 2))

	// // 同样使用 asyncPool 处理意译
	// await asyncPool(
	// 	50,
	// 	data.filter((item) => !item.textInterpretation).filter((item) => item.textLiteralTranslation),
	// 	async (item) => {
	// 		const result = await deepSeek.generateText({
	// 			system: interpretationPrompt,
	// 			prompt: `${item.textLiteralTranslation}`,
	// 			maxTokens: 200,
	// 		})
	// 		item.textInterpretation = result
	// 		return item
	// 	},
	// )

	const processedTranscripts = processTranslatedLongTranscripts(data)

	await fsp.writeFile(transcriptsFile, JSON.stringify(processedTranscripts, null, 2))
	return { success: true }
}
