import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

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
			})
			.returning({
				id: schema.translateComments.id,
			})

		tId = result[0].id
	}

	return redirect(`/app/translate-comment/${tId}`)
}
