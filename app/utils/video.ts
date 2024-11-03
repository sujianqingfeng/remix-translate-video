import path from 'node:path'
import {
	COMMENTS_FILE,
	HTML_FILE,
	ORIGINAL_VIDEO_FILE,
	OUT_DIR,
	TITLE_FILE,
	VIDEO_FILE,
} from '~/constants'
import type { Comment, VideoComment } from '~/types'

export function getOut(videoId: string) {
	const outDir = path.join(process.cwd(), OUT_DIR, videoId)
	const commentFile = path.join(outDir, COMMENTS_FILE)
	const videoFile = path.join(outDir, VIDEO_FILE)
	const titleFile = path.join(outDir, TITLE_FILE)
	const htmlFile = path.join(outDir, HTML_FILE)
	const originalVideoFile = path.join(outDir, ORIGINAL_VIDEO_FILE)

	return {
		outDir,
		commentFile,
		videoFile,
		titleFile,
		htmlFile,
		originalVideoFile,
	}
}

export function getVideoComment(comments: Comment[]) {
	const videoComments: VideoComment[] = comments.map((comment, i) => {
		return {
			...comment,
			durationInFrames: 30 * 10,
			form: 30 * 10 * i,
		}
	})

	const totalDurationInFrames = 30 * 10 * comments.length

	return {
		videoComments,
		totalDurationInFrames,
	}
}
