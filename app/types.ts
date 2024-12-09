import type { GenerateShortText } from './z-schema'

export type YoutubeComment = {
	content: string
	author: string
	translatedContent?: string
	convertedContent?: string
	likes: string
	authorThumbnail: string
	publishedTime?: string
}

export type RemotionVideoComment = {
	author: string
	content: string
	convertedContent?: string
	translatedContent?: string
	likes: string
	authorThumbnail: string
	publishedTime?: string
	durationInFrames: number
	form: number
}

export type YoutubeInfo = {
	title: string
	translatedTitle?: string
	publishTitle?: string
	youtubeUrl: string
	viewCount: number
	dateTime?: string
	author: string
	mode: 'landscape' | 'portrait' | 'vertical'
	renderId?: string
	jobId?: string
}

// translate video

export type SentenceWord = {
	start: number
	end: number
	word: string
}
export type Sentence = {
	words: SentenceWord[]
	text: string
	start: number // 句子开始时间
	end: number // 句子结束时间
}

export type Transcript = {
	words: SentenceWord[]
	text: string
	start: number
	end: number
	textLiteralTranslation?: string
	textInterpretation?: string
}

// short text
export type WordTranscript = {
	start: number
	end: number
	part: string
}

export type SentenceTranscript = {
	start: number
	end: number
	part: string
	partZh?: string
}

export type GenerateShortTextActionData = {
	success: boolean
	shortText: GenerateShortText
}

export type ShortText = GenerateShortText & {
	renderId?: string
	jobId?: string
	// 0: portrait, 1: landscape
	direction: 0 | 1
}
