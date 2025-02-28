import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const translateVideoWhere = eq(schema.translateVideos.id, id)
	const translateVideo = await db.query.translateVideos.findFirst({
		where: translateVideoWhere,
	})

	invariant(translateVideo, 'translateVideo is null')

	const { audioFilePath, title } = translateVideo

	invariant(audioFilePath, 'audioFilePath is null')

	const subtitleTranslation = await db.query.subtitleTranslations.findFirst({
		where: eq(schema.subtitleTranslations.translateVideoId, id),
	})

	if (subtitleTranslation) {
		return redirect(`/app/subtitle-translations/${subtitleTranslation.id}`)
	}

	const [{ id: subtitleTranslationId }] = await db
		.insert(schema.subtitleTranslations)
		.values({
			translateVideoId: id,
			title,
			audioFilePath: audioFilePath,
		})
		.returning({
			id: schema.subtitleTranslations.id,
		})

	return redirect(`/app/subtitle-translations/${subtitleTranslationId}`)
}
