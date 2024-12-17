import type { RemotionVideoComment } from '~/types'

export type TranslateCommentProps = {
	comments: RemotionVideoComment[]
	title?: string
	playFile: string
	viewCount: number
	coverDuration: number
	author?: string
	isRemoteRender?: boolean
}
