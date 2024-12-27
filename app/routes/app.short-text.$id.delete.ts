import { unlink } from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { PUBLIC_DIR } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { fileExist } from '~/utils/file'

async function safeDeletePublicFile(filePath: string | null) {
	if (!filePath) return

	const fileName = path.basename(filePath)
	const publicPath = path.join(PUBLIC_DIR, fileName)

	if (await fileExist(publicPath)) {
		await unlink(publicPath)
	}
}

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.shortTexts.id, id)

	const shortText = await db.query.shortTexts.findFirst({
		where,
	})

	invariant(shortText, 'shortText not found')

	await safeDeletePublicFile(shortText.audioFilePath)
	await safeDeletePublicFile(shortText.coverFilePath)

	await db.delete(schema.shortTexts).where(where)

	return {}
}
