import fsp from 'node:fs/promises'
import path from 'node:path'
import { OUT_DIR, SHORT_TEXT_DIR, SHORT_TEXT_INPUT_FILE } from '~/constants'
import type { ShortTextInputItem } from '~/types'

export function getShortTextOut() {
	const outDir = path.join(process.cwd(), OUT_DIR)
	const shortTextDir = path.join(outDir, SHORT_TEXT_DIR)
	const shortTextInputFile = path.join(shortTextDir, SHORT_TEXT_INPUT_FILE)
	return {
		outDir,
		shortTextDir,
		shortTextInputFile,
	}
}

export async function getShortTexts() {
	const { shortTextInputFile } = getShortTextOut()
	const textStr = await fsp.readFile(shortTextInputFile, 'utf-8')
	const texts = JSON.parse(textStr) as ShortTextInputItem[]
	return texts
}

export function getTotalDurationInFrames(
	texts: ShortTextInputItem[],
	fps = 60,
) {
	return Math.ceil(texts[texts.length - 1].end) * fps
}
