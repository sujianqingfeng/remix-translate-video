import fsp from 'node:fs/promises'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { ShortText } from '~/types'
import { getShortTextOut } from '~/utils/short-text'

export async function action({ request, params }: ActionFunctionArgs) {
	const key = params.key
	invariant(key, 'key is required')
	const formData = await request.formData()
	const direction = formData.get('direction')
	invariant(direction, 'direction is required')

	const { infoFile } = getShortTextOut(key)
	const shortTextStr = await fsp.readFile(infoFile, 'utf-8')
	const shortText: ShortText = JSON.parse(shortTextStr)
	shortText.direction = direction === '1' ? 0 : 1

	await fsp.writeFile(infoFile, JSON.stringify(shortText, null, 2), 'utf-8')
	return json({ success: true })
}
