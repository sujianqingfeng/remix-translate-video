import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { processTranslatedLongTranscripts } from '~/utils/transcript'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.subtitleTranslations.id, id)

	const subtitleTranslation = await db.query.subtitleTranslations.findFirst({
		where,
	})
	invariant(subtitleTranslation, 'subtitleTranslation not found')

	const { sentences } = subtitleTranslation
	invariant(sentences, 'sentences not found')

	// console.log('🚀 ~ action ~ sentences:', sentences)
	const optimizedSentences = processTranslatedLongTranscripts(sentences)
	console.log('🚀 ~ action ~ optimizedSentences:', optimizedSentences)

	await db
		.update(schema.subtitleTranslations)
		.set({
			optimizedSentences: optimizedSentences,
		})
		.where(where)

	return { success: true }
}
