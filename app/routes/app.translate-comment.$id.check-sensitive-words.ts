import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { checkSensitiveWords } from '~/utils/check-sensitive-words'

export const loader = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.translateComments.id, id)

	const translateComment = await db.query.translateComments.findFirst({
		where,
	})

	for (const comment of translateComment?.comments ?? []) {
		if (comment?.translatedContent && checkSensitiveWords(comment.translatedContent)) {
			throw new Error('Sensitive words found in translated content')
		}

		if (comment?.author && checkSensitiveWords(comment.author)) {
			throw new Error('Sensitive words found in author')
		}
	}

	return {}
}
