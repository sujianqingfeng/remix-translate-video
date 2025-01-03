import { rm, unlink } from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { PUBLIC_DIR } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir, fileExist, safeDeletePublicFile } from '~/utils/file'

export const action = async ({ params }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const where = eq(schema.translateComments.id, id)

	const translateComment = await db.query.translateComments.findFirst({
		where,
	})

	invariant(translateComment, 'translateComment not found')

	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, translateComment.downloadId),
	})

	const operationDir = await createOperationDir(id)
	await rm(operationDir, { recursive: true })

	const playFilePath = translateComment.sourceFilePath || download?.filePath

	if (playFilePath) {
		const fileName = path.basename(playFilePath)
		await safeDeletePublicFile(playFilePath)

		const newDestPath = path.join(PUBLIC_DIR, `new-${fileName}`)
		await safeDeletePublicFile(newDestPath)
	}

	await db.delete(schema.translateComments).where(where)

	return {}
}
