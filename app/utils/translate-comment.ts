import path from 'node:path'
import {
	OUT_DIR,
	YOUTUBE_COMMENTS_FILE,
	YOUTUBE_COMMENT_ID_PREFIX,
	YOUTUBE_INFO_FILE,
	YOUTUBE_ORIGINAL_HTML_FILE,
} from '~/constants'
import type { RemotionVideoComment, YoutubeComment } from '~/types'

export function getYoutubeCommentFullId(id: string) {
	return `${YOUTUBE_COMMENT_ID_PREFIX}${id}`
}

export function getYoutubeCommentOut(videoId: string) {
	const outDir = path.join(
		process.cwd(),
		OUT_DIR,
		getYoutubeCommentFullId(videoId),
	)
	const join = path.join.bind(null, outDir)

	return {
		outDir,
		get commentFile() {
			return join(YOUTUBE_COMMENTS_FILE)
		},
		get infoFile() {
			return join(YOUTUBE_INFO_FILE)
		},
		get originalHtmlFile() {
			return join(YOUTUBE_ORIGINAL_HTML_FILE)
		},
	}
}

export function generateRemotionVideoComment(
	comments: YoutubeComment[],
	fps = 60,
	durationInSeconds = 5,
) {
	const remotionVideoComments: RemotionVideoComment[] = comments.map(
		(comment, i) => {
			return {
				...comment,
				durationInFrames: fps * durationInSeconds,
				form: fps * durationInSeconds * i,
			}
		},
	)
	return remotionVideoComments
}
