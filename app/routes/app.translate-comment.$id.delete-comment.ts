import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const formData = await request.formData()
	const index = formData.get('index')
	if (!index) {
		throw new Error('index is required')
	}

	const indexNumber = Number(index)

	const where = eq(schema.translateComments.id, id)

	const translateComment = await db.query.translateComments.findFirst({
		where,
	})

	if (!translateComment) {
		throw new Error('id is not correct')
	}

	translateComment.comments?.splice(indexNumber, 1)

	await db
		.update(schema.translateComments)
		.set({
			comments: translateComment.comments,
		})
		.where(where)

	return {}
}
