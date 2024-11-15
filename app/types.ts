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
}

// translate video
export type YoutubeTranscript = {
	text: string
	duration: number
	offset: number
}

export type RemotionYoutubeTranscript = {
	textZh: string
	text: string
	duration: number
	offset: number
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
