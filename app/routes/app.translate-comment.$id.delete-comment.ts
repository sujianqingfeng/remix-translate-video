import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const formData = await request.formData()
	const index = formData.get('index')
	const where = eq(schema.translateComments.id, id)

	if (index) {
		const indexNumber = Number(index)

		const translateComment = await db.query.translateComments.findFirst({
			where,
		})

		invariant(translateComment, 'translateComment not found')

		translateComment.comments?.splice(indexNumber, 1)

		await db
			.update(schema.translateComments)
			.set({
				comments: translateComment.comments,
			})
			.where(where)

		return {}
	}

	// delete all comments

	await db
		.update(schema.translateComments)
		.set({
			comments: [],
		})
		.where(where)

	return {}
}
