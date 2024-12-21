import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export async function action({ params }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')
	await db.delete(schema.downloads).where(eq(schema.downloads.id, id))
	return { success: true }
}
