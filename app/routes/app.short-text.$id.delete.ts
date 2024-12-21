import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params

	invariant(id, 'id is required')

	await db.delete(schema.shortTexts).where(eq(schema.shortTexts.id, id))

	return {}
}
