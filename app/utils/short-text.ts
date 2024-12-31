import path from 'node:path'
import { SHORT_TEXT_PUBLIC_BG_FILE } from '~/constants'
import type { schema } from '~/lib/drizzle'
import type { SentenceTranscript, WordTranscript } from '~/types'
import { translate } from './ai'

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

export async function parseSentencesByWords({
	wordTranscripts,
}: {
	wordTranscripts: WordTranscript[]
}) {
	const sentences = mergeSentences(wordTranscripts)

	const translateSentences = await Promise.all(
		sentences.map(async (sentence) => {
			const translated = await translate(sentence.part)
			sentence.partZh = translated
			return sentence
		}),
	)

	return translateSentences
}

export async function buildShortRenderData(shortText: typeof schema.shortTexts.$inferSelect) {
	const audioDuration = getAudioDurationInFrames(shortText.wordTranscripts || [], shortText.fps)

	const translateZhDuration = shortText.fps * 5
	const totalDurationInFrames = audioDuration + translateZhDuration

	let playAudioFile = ''
	if (shortText.audioFilePath) {
		playAudioFile = path.basename(shortText.audioFilePath)
	}

	let shortTextCoverFile = ''
	if (shortText.coverFilePath) {
		shortTextCoverFile = path.basename(shortText.coverFilePath)
	}

	const shortTextBgFile = SHORT_TEXT_PUBLIC_BG_FILE

	const compositionWidth = shortText.direction ? 1920 : 1080
	const compositionHeight = shortText.direction ? 1080 : 1920

	const playWidth = shortText.direction ? 1080 : 720
	const playHeight = shortText.direction ? 720 : 1080

	return {
		totalDurationInFrames,
		audioDuration,
		shortTextBgFile,
		shortTextCoverFile,
		playAudioFile,
		compositionWidth,
		compositionHeight,
		playWidth,
		playHeight,
	}
}
