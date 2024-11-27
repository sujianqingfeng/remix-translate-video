import fsp from 'node:fs/promises'
import type { ActionFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { Transcript } from '~/types'
import { getTranslateVideoOut } from '~/utils/translate-video'

export async function action({ params, request }: ActionFunctionArgs) {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const index = formData.get('index')
	invariant(typeof index === 'string', 'index is required')

	const indexNum = Number.parseInt(index, 10)
	invariant(!Number.isNaN(indexNum), 'index must be a number')

	const { transcriptsFile } = getTranslateVideoOut(id)
	const transcriptsStr = await fsp.readFile(transcriptsFile, 'utf-8')
	const transcripts: Transcript[] = JSON.parse(transcriptsStr)

	const newTranscripts = transcripts.filter((_, i) => i !== indexNum)
	await fsp.writeFile(transcriptsFile, JSON.stringify(newTranscripts, null, 2))

	return { success: true }
}
