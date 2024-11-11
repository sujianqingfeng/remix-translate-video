import fsp from 'node:fs/promises'
import path from 'node:path'
import {
	OUT_DIR,
	SHORT_TEXT_AUDIO_FILE,
	SHORT_TEXT_INFO_FILE,
	SHORT_TEXT_TRANSCRIPTS_FILE,
} from '~/constants'
import type { ShortTextInputItem } from '~/types'

export function getShortTextOut(key: string) {
	const outDir = path.join(process.cwd(), OUT_DIR, key)

	return {
		outDir,
		get infoFile() {
			return path.join(outDir, SHORT_TEXT_INFO_FILE)
		},
		get transcriptsFile() {
			return path.join(outDir, SHORT_TEXT_TRANSCRIPTS_FILE)
		},
		get audioFile() {
			return path.join(outDir, SHORT_TEXT_AUDIO_FILE)
		},
	}
}

export async function getShortTexts(key: string) {
	const { transcriptsFile } = getShortTextOut(key)
	const textStr = await fsp.readFile(transcriptsFile, 'utf-8')
	const texts = JSON.parse(textStr) as ShortTextInputItem[]
	return texts
}

export function getTotalDurationInFrames(
	texts: ShortTextInputItem[],
	fps = 60,
) {
	return Math.ceil(texts[texts.length - 1].end) * fps
}
