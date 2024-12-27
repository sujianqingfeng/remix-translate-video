import { readFile } from 'node:fs/promises'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const loader = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.shortTexts.id, id)
	const shortText = await db.query.shortTexts.findFirst({
		where,
	})
	invariant(shortText?.outputFilePath, 'shortText output file not found')

	const buffer = await readFile(shortText.outputFilePath)
	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Type': 'video/mp4',
			'Content-Disposition': `attachment; filename="short-text-${id}.mp4"`,
			'Content-Length': buffer.length.toString(),
		},
	})
}
