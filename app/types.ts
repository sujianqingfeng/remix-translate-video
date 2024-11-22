import type { ShortText } from './z-schema'

export type YoutubeComment = {
	content: string
	author: string
	translatedContent?: string
	likes: string
	authorThumbnail: string
	publishedTime?: string
}

export type RemotionVideoComment = {
	author: string
	content: string
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
	mode: 'landscape' | 'portrait'
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
	shortText: ShortText
	key: string
}

export type { ShortText }
