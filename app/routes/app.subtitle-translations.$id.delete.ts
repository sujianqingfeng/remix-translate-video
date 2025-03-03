import { rm } from 'node:fs/promises'
import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir } from '~/utils/file'

export const action = async ({ params }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const where = eq(schema.subtitleTranslations.id, id)

	const subtitleTranslation = await db.query.subtitleTranslations.findFirst({
		where,
	})
	invariant(subtitleTranslation, 'subtitleTranslation not found')

	const operationDir = await createOperationDir(subtitleTranslation.id)
	await rm(operationDir, { recursive: true })

	await db.delete(schema.subtitleTranslations).where(where)
	return {}
}
