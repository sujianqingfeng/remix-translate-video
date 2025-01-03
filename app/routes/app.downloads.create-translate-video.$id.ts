import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, id),
	})

	if (!download) {
		throw new Error('Download not found')
	}

	const translateVideo = await db.query.translateVideos.findFirst({
		where: eq(schema.translateVideos.downloadId, id),
	})

	let tId = translateVideo?.id

	if (!translateVideo) {
		const result = await db
			.insert(schema.translateVideos)
			.values({
				downloadId: id,
				source: 'download',
				title: download.title,
			})
			.returning({
				id: schema.translateVideos.id,
			})

		tId = result[0].id
	}

	return redirect(`/app/translate-video/${tId}`)
}
