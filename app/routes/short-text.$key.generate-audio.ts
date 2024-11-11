import fsp from 'node:fs/promises'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { ShortText } from '~/types'
import { getShortTextOut } from '~/utils/short-text'
import { generateTTS } from '~/utils/tts/edge'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const key = formData.get('key') as string
	invariant(key, 'key is required')

	const { audioFile, infoFile } = getShortTextOut(key)
	const shortTextStr = await fsp.readFile(infoFile, 'utf-8')
	const shortText = JSON.parse(shortTextStr) as ShortText

	const audio = await generateTTS({
		text: shortText.shortText,
		outPath: audioFile,
	})

	return json({ success: true })
}
