import fsp from 'node:fs/promises'
import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getShortTextOut } from '~/utils/short-text'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const shortTextStr = formData.get('shortText') as string
	const key = formData.get('key') as string

	invariant(shortTextStr, 'Missing shortText')
	invariant(key, 'Missing key')

	const { infoFile, outDir } = getShortTextOut(key)

	await fsp.mkdir(outDir, { recursive: true })

	await fsp.writeFile(infoFile, shortTextStr, 'utf-8')

	return redirect(`/short-text/${key}`)
}
