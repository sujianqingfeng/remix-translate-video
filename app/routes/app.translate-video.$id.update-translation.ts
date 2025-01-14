import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const index = formData.get('index')
	const field = formData.get('field')
	const text = formData.get('text')
	const textLiteralTranslation = formData.get('textLiteralTranslation')
	const textInterpretation = formData.get('textInterpretation')

	invariant(index, 'index is required')
	invariant(field, 'field is required')

	const indexNumber = Number(index)
	const where = eq(schema.translateVideos.id, id)

	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})

	invariant(translateVideo, 'translateVideo not found')
	invariant(translateVideo.transcripts, 'transcripts is required')
	invariant(translateVideo.transcripts[indexNumber], 'index is not correct')

	switch (field) {
		case 'text':
			invariant(text, 'text is required')
			translateVideo.transcripts[indexNumber].text = text.toString()
			break
		case 'literal':
			invariant(textLiteralTranslation, 'textLiteralTranslation is required')
			translateVideo.transcripts[indexNumber].textLiteralTranslation = textLiteralTranslation.toString()
			break
		case 'interpretation':
			invariant(textInterpretation, 'textInterpretation is required')
			translateVideo.transcripts[indexNumber].textInterpretation = textInterpretation.toString()
			break
		default:
			throw new Error('Invalid field')
	}

	await db
		.update(schema.translateVideos)
		.set({
			transcripts: translateVideo.transcripts,
		})
		.where(where)

	return { success: true }
}
