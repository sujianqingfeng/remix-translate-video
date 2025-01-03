import path from 'node:path'
import type { FillInBlankSentence } from '~/types'

type BuildFillInBlankRenderDataOptions = {
	sentences: FillInBlankSentence[]
	fps: number
}

export function buildFillInBlankRenderData({ sentences, fps }: BuildFillInBlankRenderDataOptions) {
	const sentenceDurationInFrames = fps * 6

	const remotionFillInBlankSentences = sentences.map((sentence, index) => {
		return {
			...sentence,
			publicCoverPath: sentence.coverFilePath ? `/${path.basename(sentence.coverFilePath)}` : undefined,
			publicAudioPath: sentence.audioFilePath ? `/${path.basename(sentence.audioFilePath)}` : undefined,
			durationInFrames: sentenceDurationInFrames,
			form: index * sentenceDurationInFrames,
		}
	})

	const totalDurationInFrames = remotionFillInBlankSentences.length * sentenceDurationInFrames

	return {
		remotionFillInBlankSentences,
		totalDurationInFrames,
		compositionWidth: 1920,
		compositionHeight: 1080,
		playWidth: 1080,
		playHeight: 720,
	}
}
