import type { Comment } from '~/types'

export interface GeneralCommentProps {
	title?: string
	content?: string
	contentZh?: string
	author: string
	images?: string[]
	comments: any[]
	fps: number
	coverDurationInSeconds: number
	contentDurationInSeconds: number
	commentDurations: number[]
	audioPath?: string
	publicAudioPath?: string
	createdAt?: string
	likes?: number
	views?: number
	commentCount?: number
}
