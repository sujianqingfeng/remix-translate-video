import { rm } from 'node:fs/promises'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir } from '~/utils/file'

export async function action({ params }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const operationDir = await createOperationDir(id)
	await rm(operationDir, { recursive: true })

	await db.delete(schema.downloads).where(eq(schema.downloads.id, id))
	return { success: true }
}
