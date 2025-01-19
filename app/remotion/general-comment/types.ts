import type { Comment } from '~/types'

export interface GeneralCommentProps {
	title: string
	content?: string
	contentZh?: string
	author: string
	images?: string[]
	comments: Comment[]
	fps: number
	coverDurationInSeconds: number
	contentDurationInSeconds: number
	commentDurations: number[]
}
