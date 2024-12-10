import fsp from 'node:fs/promises'
import type { ActionFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { fileExist } from '~/utils/file'
import { processSentenceSegmentation, trimPunctuation } from '~/utils/transcript'
import { getTranslateVideoOut } from '~/utils/translate-video'

export async function action({ params }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const { asrResultFile, transcriptsFile } = getTranslateVideoOut(id)

	if (!(await fileExist(asrResultFile))) {
		return { success: false, message: 'asr result file not found' }
	}

	const asrResult = await fsp.readFile(asrResultFile, 'utf-8')
	const data = JSON.parse(asrResult)

	// 将 chunks 转换为 segments
	// hugging face model
	// const words = data.chunks.map((chunk: any) => ({
	// 	word: chunk.text.trim(),
	// 	start: chunk.timestamp[0],
	// 	end: chunk.timestamp[1],
	// }))

	// const words = data.segments.flatMap((segment: any) =>
	// 	segment.words.map((word: any) => {
	// 		word.word = word.word.trim()
	// 		return word
	// 	}),
	// )

	// whisper cpp
	const words = data.transcription.map((item: any) => ({
		word: item.text,
		start: item.offsets.from / 1000,
		end: item.offsets.to / 1000,
	}))

	const segments = processSentenceSegmentation({ words })

	// 去除句子两边的符号 和 words
	const transcripts = segments.map(({ text, start, end, words }) => {
		const textResult = trimPunctuation(text)
		return {
			text: textResult,
			start: start,
			end: end,
			words,
		}
	})

	await fsp.writeFile(transcriptsFile, JSON.stringify(transcripts, null, 2))
	return { success: true }
}
