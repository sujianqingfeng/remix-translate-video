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

	const translateComment = await db.query.translateComments.findFirst({
		where: eq(schema.translateComments.downloadId, id),
	})

	let tId = translateComment?.id

	if (!translateComment) {
		const result = await db
			.insert(schema.translateComments)
			.values({
				downloadId: id,
				comments: [],
				mode: download.type === 'tiktok' ? 'vertical' : 'landscape',
			})
			.returning({
				id: schema.translateComments.id,
			})

		tId = result[0].id
	}

	return redirect(`/app/translate-comment/${tId}`)
}
