import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { safeDeletePublicFile } from '~/utils/file'

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
