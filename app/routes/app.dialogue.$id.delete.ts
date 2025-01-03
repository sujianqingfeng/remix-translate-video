import { rm } from 'node:fs/promises'
import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir, safeDeletePublicFile } from '~/utils/file'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params

	invariant(id, 'id is required')

	const where = eq(schema.dialogues.id, id)

	const dialogue = await db.query.dialogues.findFirst({
		where,
	})

	invariant(dialogue, 'dialogue not found')

	const audioFilePaths = dialogue.dialogues.map((d) => d.audioFilePath).filter(Boolean) as string[]

	for (const filePath of audioFilePaths) {
		await safeDeletePublicFile(filePath)
	}

	const operationDir = await createOperationDir(id)
	await rm(operationDir, { recursive: true })

	await db.delete(schema.dialogues).where(where)

	return redirect('/app/dialogue')
}
