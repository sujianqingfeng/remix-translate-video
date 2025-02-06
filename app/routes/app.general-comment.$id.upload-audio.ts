import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir } from '~/utils/file'

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const audioFile = formData.get('audio') as File
	invariant(audioFile, 'audio file is required')

	const dir = await createOperationDir(id)
	const audioPath = path.join(dir, `${id}-audio.mp3`)

	const arrayBuffer = await audioFile.arrayBuffer()
	await writeFile(audioPath, Buffer.from(arrayBuffer))

	// Update the comment with the audio path
	await db
		.update(schema.generalComments)
		.set({
			audioPath,
		})
		.where(eq(schema.generalComments.id, id))

	return { success: true }
}
