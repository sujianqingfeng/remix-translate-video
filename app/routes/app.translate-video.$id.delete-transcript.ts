import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const index = formData.get('index')
	invariant(typeof index === 'string', 'index is required')

	const indexNum = Number.parseInt(index, 10)
	invariant(!Number.isNaN(indexNum), 'index must be a number')

	const where = eq(schema.translateVideos.id, id)

	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})
	invariant(translateVideo, 'translateVideo not found')

	const { transcripts } = translateVideo

	const newTranscripts = (transcripts ?? []).filter((_, i) => i !== indexNum)

	await db
		.update(schema.translateVideos)
		.set({
			transcripts: newTranscripts,
		})
		.where(where)

	return { success: true }
}
