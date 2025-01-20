import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const where = eq(schema.translateComments.id, id)

	const translateComment = await db.query.translateComments.findFirst({
		where,
	})

	if (!translateComment) {
		throw new Error('id is not correct')
	}

	await db
		.update(schema.translateComments)
		.set({
			comments: [],
		})
		.where(where)

	return {}
}
