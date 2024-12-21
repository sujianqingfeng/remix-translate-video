import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import { createUpdateSchema } from 'drizzle-zod'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

const translateCommentUpdateSchema = createUpdateSchema(schema.translateComments)

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const where = eq(schema.translateComments.id, id)

	const translateComment = await db.query.translateComments.findFirst({
		where,
	})

	if (!translateComment) {
		throw new Error('id is not correct')
	}

	const formData = await request.formData()
	const data = translateCommentUpdateSchema.parse({
		mode: formData.get('mode'),
		translatedTitle: formData.get('translatedTitle'),
	})

	await db
		.update(schema.translateComments)
		.set({
			mode: data.mode,
		})
		.where(where)

	return {}
}
