import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const index = formData.get('index')
	const textLiteralTranslation = formData.get('textLiteralTranslation')

	invariant(index, 'index is required')
	invariant(textLiteralTranslation, 'textLiteralTranslation is required')

	const indexNumber = Number(index)
	const where = eq(schema.translateVideos.id, id)

	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})

	invariant(translateVideo, 'translateVideo not found')
	invariant(translateVideo.transcripts, 'transcripts is required')
	invariant(translateVideo.transcripts[indexNumber], 'index is not correct')

	translateVideo.transcripts[indexNumber].textLiteralTranslation = textLiteralTranslation.toString()

	await db
		.update(schema.translateVideos)
		.set({
			transcripts: translateVideo.transcripts,
		})
		.where(where)

	return { success: true }
}
