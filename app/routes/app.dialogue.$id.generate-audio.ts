import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { PROXY } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir } from '~/utils/file'
import { generateTTS } from '~/utils/tts/edge'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.dialogues.id, id)
	const dialogue = await db.query.dialogues.findFirst({
		where,
	})
	invariant(dialogue, 'dialogue not found')

	const dialogues = dialogue.dialogues

	const notAudioDialogues = dialogues.filter((d) => !d.audioFilePath)
	const operationDir = await createOperationDir(id)

	await Promise.all(
		notAudioDialogues.map(async (dialogue, index) => {
			const fileName = `${id}-${index}.webm`
			const audioFilePath = path.join(operationDir, fileName)

			await generateTTS({
				text: dialogue.content,
				outPath: audioFilePath,
				proxy: PROXY,
				saveSubtitles: false,
				rate: '0%',
				voice: index % 2 === 0 ? 'en-US-EmmaNeural' : 'en-US-BrianNeural',
			})

			dialogue.audioFilePath = audioFilePath
			return dialogue
		}),
	)

	await db
		.update(schema.dialogues)
		.set({
			dialogues,
		})
		.where(where)

	return {}
}
