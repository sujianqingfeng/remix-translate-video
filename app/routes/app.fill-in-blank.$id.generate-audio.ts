import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { PROXY } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir } from '~/utils/file'
import { generateTTS } from '~/utils/tts/edge'

export async function action({ params }: ActionFunctionArgs) {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.fillInBlanks.id, id)

	const fillInBlank = await db.query.fillInBlanks.findFirst({
		where,
	})

	invariant(fillInBlank, 'fillInBlank not found')

	const sentences = fillInBlank.sentences

	const notAudioSentences = sentences.filter((s) => !s.audioFilePath)
	const operationDir = await createOperationDir(id)

	await Promise.all(
		notAudioSentences.map(async (sentence, index) => {
			const fileName = `${id}-${index}.webm`
			const audioFilePath = path.join(operationDir, fileName)

			await generateTTS({
				text: sentence.sentence,
				outPath: audioFilePath,
				proxy: PROXY,
				saveSubtitles: false,
				rate: '0%',
			})

			sentence.audioFilePath = audioFilePath
			return sentence
		}),
	)

	await db
		.update(schema.fillInBlanks)
		.set({
			sentences,
		})
		.where(where)

	return {}
}
