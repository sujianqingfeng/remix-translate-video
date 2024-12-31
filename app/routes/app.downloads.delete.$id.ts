import { rm, unlink } from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { PUBLIC_DIR } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir, fileExist } from '~/utils/file'

export async function action({ params }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const operationDir = await createOperationDir(id)
	await rm(operationDir, { recursive: true })

	const where = eq(schema.downloads.id, id)

	const download = await db.query.downloads.findFirst({
		where,
	})

	invariant(download, 'download not found')

	const filePath = download.filePath || ''

	if (filePath) {
		const fileName = path.basename(filePath)
		const destPath = path.join(PUBLIC_DIR, fileName)
		if (await fileExist(destPath)) {
			await unlink(destPath)
		}
	}

	await db.delete(schema.downloads).where(where)
	return { success: true }
}
