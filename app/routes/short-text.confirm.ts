import fsp from 'node:fs/promises'
import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { ShortText } from '~/types'
import { getShortTextOut } from '~/utils/short-text'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const shortTextStr = formData.get('shortText') as string
	const key = formData.get('key') as string

	invariant(shortTextStr, 'Missing shortText')
	invariant(key, 'Missing key')

	const { infoFile, outDir } = getShortTextOut(key)

	await fsp.mkdir(outDir, { recursive: true })

	const shortText = JSON.parse(shortTextStr) as ShortText
	shortText.direction = 0

	await fsp.writeFile(infoFile, JSON.stringify(shortText, null, 2), 'utf-8')
	return redirect(`/short-text/${key}`)
}
