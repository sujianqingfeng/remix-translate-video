import type { z } from 'zod'
import type { GenerateDialogueSchema, GenerateShortTextSchema } from './z-schema'

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

export type GenerateShortText = z.infer<typeof GenerateShortTextSchema>

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

export type LittleDifficultWord = {
	word: string
	translation: string
}

export interface CommentMedia {
	type: 'video' | 'photo'
	url: string
	localUrl?: string
}

export interface Comment {
	id: string
	author: string
	authorThumbnail?: string
	content: string
	translatedContent?: string
	likes: number | string
	media?: CommentMedia[]
}

export interface CommentData {
	comments: Comment[]
	nextPageToken?: string
}

export type CompositionInfo = {
	fps: number
	durationInFrames: number
	width: number
	height: number
}

export type AsrWord = {
	word: string
	start: number
	end: number
}

export type Transcript = {
	text: string
	start: number
	end: number
	words: AsrWord[]
	textLiteralTranslation?: string
	textInterpretation?: string
}

// fill in blank
export type FillInBlankSentence = {
	sentence: string
	word: string
	sentenceZh: string
	wordZh: string
	wordPronunciation: string

	audioFilePath?: string
	coverFilePath?: string
}

export type RemotionFillInBlankSentence = FillInBlankSentence & {
	durationInFrames: number
	form: number
	publicCoverPath?: string
	publicAudioPath?: string
}

export type GenerateDialogue = z.infer<typeof GenerateDialogueSchema>
export type Dialogue = GenerateDialogue['list'][number] & {
	audioFilePath?: string
}

export type RemotionDialogue = Dialogue & {
	durationInFrames: number
	form: number
	publicAudioPath?: string
	roleLabel: number
	content: string
	contentZh: string
}

// general comment
export type GeneralCommentTypeTextInfo = {
	title?: string
	content?: string
	contentZh?: string
	images?: string[]
	localImages?: string[]
	video?: {
		type: string
		url: string
		localUrl?: string
	}
}

export interface GeneralComment {
	id: string
	type: 'text'
	author: string
	typeInfo: GeneralCommentTypeTextInfo
	comments: Comment[]
	fps: number
	coverDurationInSeconds: number
	secondsForEvery30Words: number
	source: 'twitter' | 'youtube' | 'manual'
	audioPath?: string
	publicAudioPath?: string
}
