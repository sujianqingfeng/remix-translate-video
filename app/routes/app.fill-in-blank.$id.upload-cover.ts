import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir } from '~/utils/file'

export async function action({ request, params }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const formData = await request.formData()
	const index = formData.get('index')
	invariant(index, 'index is required')

	const where = eq(schema.fillInBlanks.id, id)

	const fillInBlank = await db.query.fillInBlanks.findFirst({
		where,
	})
	invariant(fillInBlank, 'fillInBlank not found')

	const sentences = fillInBlank.sentences

	const file = formData.get('file')
	invariant(file instanceof File, 'file is required')

	const operationDir = await createOperationDir(id)
	const coverFilePath = path.join(operationDir, `${id}-${index}.png`)
	const arrayBuffer = await file.arrayBuffer()
	await writeFile(coverFilePath, Buffer.from(arrayBuffer))

	const idx = +index

	sentences[idx] = {
		...sentences[idx],
		coverFilePath,
	}

	await db
		.update(schema.fillInBlanks)
		.set({
			sentences,
		})
		.where(where)

	return {}
}
