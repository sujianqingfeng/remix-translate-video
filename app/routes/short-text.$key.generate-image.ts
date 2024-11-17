import fsp from 'node:fs/promises'
import path from 'node:path'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { PUBLIC_DIR, SHORT_TEXT_PUBLIC_COVER_FILE } from '~/constants'
import type { ShortText } from '~/types'
import { downloadFile } from '~/utils/download'
import { generateImage } from '~/utils/generate-image'
import { getShortTextOut } from '~/utils/short-text'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const key = formData.get('key') as string
	invariant(key, 'key is required')

	const { infoFile, coverFile } = getShortTextOut(key)
	const shortTextStr = await fsp.readFile(infoFile, 'utf-8')
	const shortText = JSON.parse(shortTextStr) as ShortText

	const prompt = `Please help me generate a cover image in anime style with the content of:：${shortText.shortText}`

	const { images } = await generateImage({
		model: 'stabilityai/stable-diffusion-3-5-large',
		width: 540,
		height: 960,
		prompt,
	})

	const url = images[0].url

	await downloadFile(url, coverFile)

	await fsp.copyFile(
		coverFile,
		path.join(PUBLIC_DIR, SHORT_TEXT_PUBLIC_COVER_FILE),
	)

	return json({ success: true })
}
