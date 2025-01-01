import { readFile } from 'node:fs/promises'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const loader = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.fillInBlanks.id, id)
	const fillInBlank = await db.query.fillInBlanks.findFirst({
		where,
	})
	invariant(fillInBlank?.outputFilePath, 'fillInBlank output file not found')

	const buffer = await readFile(fillInBlank.outputFilePath)
	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Type': 'video/mp4',
			'Content-Disposition': `attachment; filename="fill-in-blank-${id}.mp4"`,
			'Content-Length': buffer.length.toString(),
		},
	})
}
