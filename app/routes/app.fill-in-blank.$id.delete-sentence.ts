import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const index = formData.get('index')
	invariant(index, 'index is required')

	const where = eq(schema.fillInBlanks.id, id)

	const fillInBlank = await db.query.fillInBlanks.findFirst({
		where,
	})
	invariant(fillInBlank, 'fillInBlank not found')

	const sentences = fillInBlank.sentences
	const indexNumber = Number(index)

	// Remove the sentence at the specified index
	sentences.splice(indexNumber, 1)

	// Update the database with the modified sentences array
	await db
		.update(schema.fillInBlanks)
		.set({
			sentences,
		})
		.where(where)

	return {}
}
