import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	await db.delete(schema.translateComments).where(eq(schema.translateComments.id, id))

	return {}
}
