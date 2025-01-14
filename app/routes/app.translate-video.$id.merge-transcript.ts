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

	const { transcripts = [] } = translateVideo

	const nextTranscript = transcripts?.[indexNum + 1]
	invariant(nextTranscript, 'nextTranscript is required')

	transcripts[indexNum].text = transcripts[indexNum].text + nextTranscript.text
	transcripts[indexNum].textLiteralTranslation = `${transcripts[indexNum].textLiteralTranslation} ${nextTranscript.textLiteralTranslation}`
	transcripts[indexNum].textInterpretation = `${transcripts[indexNum].textInterpretation} ${nextTranscript.textInterpretation}`

	transcripts[indexNum].words = [...transcripts[indexNum].words, ...nextTranscript.words]
	transcripts[indexNum].end = nextTranscript.end

	transcripts.splice(indexNum + 1, 1)

	await db
		.update(schema.translateVideos)
		.set({
			transcripts,
		})
		.where(where)

	return { success: true }
}
