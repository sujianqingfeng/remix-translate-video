import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import { createUpdateSchema } from 'drizzle-zod'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

const shortTextUpdateSchema = createUpdateSchema(schema.shortTexts)

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params

	invariant(id, 'id is required')

	const where = eq(schema.shortTexts.id, id)

	const shortText = await db.query.shortTexts.findFirst({
		where,
	})

	invariant(shortText, 'shortText not found')

	const formData = await request.formData()
	const data = shortTextUpdateSchema.parse({
		direction: formData.get('direction'),
	})

	await db
		.update(schema.shortTexts)
		.set({
			direction: data.direction,
		})
		.where(where)

	return {}
}
