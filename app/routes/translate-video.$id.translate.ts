import fsp from 'node:fs/promises'
import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { Transcript } from '~/types'
import { deepSeek } from '~/utils/ai'
import { getTranslateVideoOut } from '~/utils/translate-video'

export async function action({ params }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const { transcriptsFile } = getTranslateVideoOut(id)
	const transcripts = await fsp.readFile(transcriptsFile, 'utf-8')
	const data: Transcript[] = JSON.parse(transcripts)

	const literalPrompt =
		'你是一个精通多语言的翻译大师，根据内容直译成中文，不要遗漏任何信息，末尾不需要加任何标点符号。'
	const interpretationPrompt =
		'你是一个精通中文的翻译大师，根据内容重新意译，遵守原意的前提下让内容更通俗易懂，符合中文表达习惯，内容更加精简，末尾不需要加任何标点符号。'

	await Promise.all(
		data
			.filter((item) => !item.textLiteralTranslation)
			.map(async (item) => {
				const result = await deepSeek.generateText({
					system: literalPrompt,
					prompt: item.text,
					maxTokens: 200,
				})
				item.textLiteralTranslation = result
				return item
			}),
	)

	await fsp.writeFile(transcriptsFile, JSON.stringify(data, null, 2))

	await Promise.all(
		data
			.filter((item) => !item.textInterpretation)
			.filter((item) => item.textLiteralTranslation)
			.map(async (item) => {
				const result = await deepSeek.generateText({
					system: interpretationPrompt,
					// biome-ignore lint/style/noNonNullAssertion: <explanation>
					prompt: item.textLiteralTranslation!,
					maxTokens: 200,
				})
				item.textInterpretation = result
				return item
			}),
	)

	await fsp.writeFile(transcriptsFile, JSON.stringify(data, null, 2))
	return json({ success: true })
}
