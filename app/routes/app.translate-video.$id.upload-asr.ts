import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { trimPunctuation } from '~/utils/transcript'
import { processSentenceSegmentation } from '~/utils/transcript'

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const file = formData.get('file') as File
	invariant(file instanceof File, 'file is required')

	const where = eq(schema.translateVideos.id, id)

	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})
	invariant(translateVideo, 'translateVideo not found')

	const text = await file.text()

	const data = JSON.parse(text)

	const words = data.transcription.map((item: any) => ({
		word: item.text,
		start: item.offsets.from / 1000,
		end: item.offsets.to / 1000,
	}))

	console.log('🚀 ~ words ~ words:', words)

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

	await db
		.update(schema.translateVideos)
		.set({
			asrWords: words,
			transcripts,
		})
		.where(where)

	return { success: true }
}
