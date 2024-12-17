import type { RemotionVideoComment } from '~/types'

export type TranslateCommentProps = {
	comments: RemotionVideoComment[]
	title?: string
	playFile: string
	viewCountText: string
	coverDurationInSeconds: number
	author?: string
	isRemoteRender?: boolean
}
