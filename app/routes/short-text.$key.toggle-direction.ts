import fsp from 'node:fs/promises'
import type { ActionFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { ShortText } from '~/types'
import { readFileJson } from '~/utils/file'
import { getShortTextOut } from '~/utils/short-text'

export async function action({ params }: ActionFunctionArgs) {
	const key = params.key
	invariant(key, 'key is required')

	const { infoFile } = getShortTextOut(key)
	const shortText = await readFileJson<ShortText>(infoFile)
	shortText.direction = shortText.direction === 1 ? 0 : 1

	await fsp.writeFile(infoFile, JSON.stringify(shortText, null, 2), 'utf-8')
	return { success: true }
}
