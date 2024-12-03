import fsp from 'node:fs/promises'
import path from 'node:path'
import {
	BUNDLE_DIR,
	OUT_DIR,
	RENDER_INFO_FILE,
	SHORT_TEXT_AUDIO_FILE,
	SHORT_TEXT_AUDIO_TRANSCRIPTS_FILE,
	SHORT_TEXT_COVER_FILE,
	SHORT_TEXT_INFO_FILE,
	SHORT_TEXT_PUBLIC_BG_FILE,
	SHORT_TEXT_PUBLIC_COVER_FILE,
	SHORT_TEXT_SENTENCES_FILE,
} from '~/constants'
import type { SentenceTranscript, ShortText, WordTranscript } from '~/types'
import { translate } from './ai'
import { fileExist } from './file'

export function getShortTextOut(key: string) {
	const outDir = path.join(process.cwd(), OUT_DIR, key)

	return {
		outDir,
		get infoFile() {
			return path.join(outDir, SHORT_TEXT_INFO_FILE)
		},
		get transcriptsFile() {
			return path.join(outDir, SHORT_TEXT_AUDIO_TRANSCRIPTS_FILE)
		},
		get audioFile() {
			return path.join(outDir, SHORT_TEXT_AUDIO_FILE)
		},
		get sentencesFile() {
			return path.join(outDir, SHORT_TEXT_SENTENCES_FILE)
		},
		get coverFile() {
			return path.join(outDir, SHORT_TEXT_COVER_FILE)
		},
		get bundleDir() {
			return path.join(outDir, BUNDLE_DIR)
		},
		get renderInfoFile() {
			return path.join(outDir, RENDER_INFO_FILE)
		},
	}
}

export function getAudioDurationInFrames(texts: WordTranscript[], fps = 60) {
	if (texts.length === 0) return 0
	return Math.ceil(texts[texts.length - 1].end / 1000) * fps
}

function mergeSentences(texts: WordTranscript[]): SentenceTranscript[] {
	const sentences: WordTranscript[] = []
	let currentSentence: WordTranscript | null = null

	for (const text of texts) {
		if (!currentSentence) {
			currentSentence = { ...text }
			continue
		}

		const lastChar = text.part.trim().slice(-1)
		const isEndOfSentence = ['.', '!', '?'].includes(lastChar)

		currentSentence.part += text.part
		currentSentence.end = text.end

		if (isEndOfSentence) {
			sentences.push(currentSentence)
			currentSentence = null
		}
	}

	if (currentSentence) {
		sentences.push(currentSentence)
	}

	return sentences
}

async function parseSentences({
	sentencesFile,
	wordTranscripts,
}: {
	sentencesFile: string
	wordTranscripts: WordTranscript[]
}) {
	if (await fileExist(sentencesFile)) {
		const sentencesStr = await fsp.readFile(sentencesFile, 'utf-8')
		return JSON.parse(sentencesStr) as SentenceTranscript[]
	}

	const sentences = mergeSentences(wordTranscripts)

	const translateSentences = await Promise.all(
		sentences.map(async (sentence) => {
			const translated = await translate(sentence.part)
			sentence.partZh = translated
			return sentence
		}),
	)

	await fsp.writeFile(sentencesFile, JSON.stringify(translateSentences, null, 2), 'utf-8')

	return translateSentences
}

export async function buildRemotionRenderData({ key, fps }: { key: string; fps: number }) {
	const { infoFile, audioFile, transcriptsFile, sentencesFile } = getShortTextOut(key)
	const shortTextStr = await fsp.readFile(infoFile, 'utf-8')
	const shortText = JSON.parse(shortTextStr) as ShortText

	const audioExist = await fileExist(audioFile)

	let wordTranscripts: WordTranscript[] = []
	let sentenceTranscript: SentenceTranscript[] = []
	if (audioExist) {
		const transcriptsStr = await fsp.readFile(transcriptsFile, 'utf-8')
		wordTranscripts = JSON.parse(transcriptsStr)

		sentenceTranscript = await parseSentences({
			wordTranscripts,
			sentencesFile,
		})
	}

	const audioDuration = getAudioDurationInFrames(wordTranscripts, fps)
	const translateZhDuration = fps * 5
	const totalDurationInFrames = audioDuration + translateZhDuration

	const shortTextBgFile = SHORT_TEXT_PUBLIC_BG_FILE
	const shortTextCoverFile = SHORT_TEXT_PUBLIC_COVER_FILE
	const playAudioFile = SHORT_TEXT_AUDIO_FILE

	return {
		totalDurationInFrames,
		wordTranscripts,
		shortText,
		audioExist,
		audioFile,
		audioDuration,
		sentenceTranscript,
		shortTextBgFile,
		shortTextCoverFile,
		playAudioFile,
	}
}
