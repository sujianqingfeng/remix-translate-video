import type { ShortText } from './z-schema'

export type YoutubeComment = {
	content: string
	author: string
	translatedContent?: string
	likes: string
	authorThumbnail: string
	publishedTime: string
}

export type RemotionVideoComment = {
	author: string
	content: string
	translatedContent?: string
	likes: string
	authorThumbnail: string
	publishedTime: string
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

export type ShortTextInputItem = {
	start: number
	end: number
	text: string
	score: number
}

export type GenerateShortTextActionData = {
	success: boolean
	shortText: ShortText
	key: string
}
