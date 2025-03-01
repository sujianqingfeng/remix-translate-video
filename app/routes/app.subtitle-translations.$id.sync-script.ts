import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.subtitleTranslations.id, id)
	const subtitleTranslation = await db.query.subtitleTranslations.findFirst({
		where,
	})
	invariant(subtitleTranslation, 'subtitleTranslation not found')
	const { optimizedSentences, translateVideoId } = subtitleTranslation

	invariant(translateVideoId, 'translateVideoId is required')

	await db
		.update(schema.translateVideos)
		.set({
			transcripts: optimizedSentences,
		})
		.where(eq(schema.translateVideos.id, translateVideoId))

	return {
		success: true,
	}
}
