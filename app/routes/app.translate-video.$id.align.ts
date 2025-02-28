import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import type { Sentence } from '~/types'
import { splitSentence } from '~/utils/ai'
import { wordsToSentences } from '~/utils/align'
import { alignWords, processSentenceSegmentation, trimPunctuation } from '~/utils/transcript'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const type = (formData.get('type') as 'code' | 'ai') || 'ai'

	const where = eq(schema.translateVideos.id, id)
	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})
	invariant(translateVideo, 'translateVideo not found')

	const { asrWords } = translateVideo
	invariant(asrWords, 'asrWords is required')

	let transcripts: Sentence[] = []

	if (type === 'ai') {
		const texts = asrWords.reduce((acc: string, item: any) => {
			return acc + item.word
		}, '')
		const sentences = await splitSentence(texts)
		transcripts = alignWords(asrWords, sentences)
	} else if (type === 'code') {
		transcripts = processSentenceSegmentation({ words: asrWords })
		// transcripts = wordsToSentences({ words: asrWords })
	}

	transcripts = transcripts.map(({ text, start, end, words }) => {
		const textResult = trimPunctuation(text)
		return {
			text: textResult,
			start: start,
			end: end,
			words,
		}
	})

	await db
		.update(schema.translateVideos)
		.set({
			transcripts,
		})
		.where(where)

	return {
		success: true,
		message: `Sentences split and words aligned successfully using ${type} method`,
	}
}
