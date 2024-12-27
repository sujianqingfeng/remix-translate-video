import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { PROXY } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import type { WordTranscript } from '~/types'
import { createOperationDir, readFileJson } from '~/utils/file'
import { parseSentencesByWords } from '~/utils/short-text'
import { generateTTS } from '~/utils/tts/edge'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.shortTexts.id, id)

	const shortText = await db.query.shortTexts.findFirst({
		where,
	})

	invariant(shortText, 'shortText not found')

	const operationDir = await createOperationDir(id)
	const fileName = `${id}.webm`
	const audioFilePath = path.join(operationDir, fileName)

	await generateTTS({
		text: shortText.shortText,
		outPath: audioFilePath,
		proxy: PROXY,
	})

	const transcriptFileName = `${fileName}.json`
	const transcriptFilePath = path.join(operationDir, transcriptFileName)

	const wordTranscripts = await readFileJson<WordTranscript[]>(transcriptFilePath)

	const sentenceTranscripts = await parseSentencesByWords({
		wordTranscripts,
	})

	await db
		.update(schema.shortTexts)
		.set({
			audioFilePath,
			wordTranscripts,
			sentenceTranscripts,
		})
		.where(where)

	return {}
}
