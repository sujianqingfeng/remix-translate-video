import fsp from 'node:fs/promises'
import path from 'node:path'
import {
	OUT_DIR,
	SHORT_TEXT_AUDIO_FILE,
	SHORT_TEXT_INFO_FILE,
	SHORT_TEXT_TRANSCRIPTS_FILE,
} from '~/constants'
import type { ShortText, WordTranscript } from '~/types'
import { fileExist } from './file'

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

export function getTotalDurationInFrames(texts: WordTranscript[], fps = 60) {
	if (texts.length === 0) return 0
	return Math.ceil(texts[texts.length - 1].end / 1000) * fps
}

export async function buildRemotionRenderData({
	key,
	fps,
}: { key: string; fps: number }) {
	const { infoFile, audioFile, transcriptsFile } = getShortTextOut(key)
	const shortTextStr = await fsp.readFile(infoFile, 'utf-8')
	const shortText = JSON.parse(shortTextStr) as ShortText

	const audioExist = await fileExist(audioFile)

	let wordTranscripts: WordTranscript[] = []
	if (audioExist) {
		const transcriptsStr = await fsp.readFile(transcriptsFile, 'utf-8')
		wordTranscripts = JSON.parse(transcriptsStr)
	}

	const totalDurationInFrames = getTotalDurationInFrames(wordTranscripts, fps)

	return {
		totalDurationInFrames,
		wordTranscripts,
		shortText,
		audioExist,
		audioFile,
	}
}
