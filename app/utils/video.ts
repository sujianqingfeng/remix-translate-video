import fsp from 'node:fs/promises'
import path from 'node:path'
import {
	COMMENTS_FILE,
	HTML_FILE,
	ORIGINAL_VIDEO_FILES,
	OUT_DIR,
	TITLE_FILE,
	VIDEO_FILE,
} from '~/constants'
import type { Comment, VideoComment } from '~/types'

export function getVideoCommentOut(videoId: string) {
	const outDir = path.join(process.cwd(), OUT_DIR, videoId)
	const commentFile = path.join(outDir, COMMENTS_FILE)
	const videoFile = path.join(outDir, VIDEO_FILE)
	const titleFile = path.join(outDir, TITLE_FILE)
	const htmlFile = path.join(outDir, HTML_FILE)

	return {
		outDir,
		commentFile,
		videoFile,
		titleFile,
		htmlFile,
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

export function getYoutubeUrlByVideoId(videoId: string) {
	return `https://www.youtube.com/watch?v=${videoId}`
}

export async function getOriginalVideoFile(videoId: string) {
	let originalVideoFile = ''
	const { outDir } = getVideoCommentOut(videoId)

	for (const file of ORIGINAL_VIDEO_FILES) {
		const filePath = path.join(outDir, file)
		try {
			await fsp.access(filePath)
			originalVideoFile = filePath
		} catch (error) {}
	}

	return originalVideoFile
}
