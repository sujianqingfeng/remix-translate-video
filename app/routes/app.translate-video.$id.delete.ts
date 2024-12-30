import { rm } from 'node:fs/promises'
import { unlink } from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { PUBLIC_DIR } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir, fileExist } from '~/utils/file'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.translateVideos.id, id)

	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})
	invariant(translateVideo, 'translateVideo not found')

	const { source, downloadId } = translateVideo

	const operationDir = await createOperationDir(id)
	await rm(operationDir, { recursive: true })

	if (source === 'download' && downloadId) {
		const download = await db.query.downloads.findFirst({
			where: eq(schema.downloads.id, downloadId),
		})

		if (download) {
			const filePath = download.filePath || ''

			if (filePath) {
				const fileName = path.basename(filePath)
				const destPath = path.join(PUBLIC_DIR, fileName)
				if (await fileExist(destPath)) {
					await unlink(destPath)
				}
			}
		}
	}

	await db.delete(schema.translateVideos).where(where)

	return { success: true }
}
