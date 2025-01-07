import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { processTranslatedLongTranscripts } from '~/utils/transcript'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.translateVideos.id, id)
	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})
	invariant(translateVideo, 'translateVideo not found')

	const { transcripts } = translateVideo

	const processedTranscripts = processTranslatedLongTranscripts(transcripts ?? [])

	await db
		.update(schema.translateVideos)
		.set({
			transcripts: processedTranscripts,
		})
		.where(where)

	return { success: true }
}
