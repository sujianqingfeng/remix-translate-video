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
	const file = formData.get('file') as File
	invariant(file instanceof File, 'file is required')

	const operationDir = await createOperationDir(id)
	const coverFilePath = path.join(operationDir, `${id}-cover.png`)

	const arrayBuffer = await file.arrayBuffer()
	await writeFile(coverFilePath, Buffer.from(arrayBuffer))

	await db
		.update(schema.shortTexts)
		.set({
			coverFilePath,
		})
		.where(eq(schema.shortTexts.id, id))

	return {}
}
