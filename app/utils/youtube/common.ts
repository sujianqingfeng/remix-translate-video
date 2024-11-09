import fsp from 'node:fs/promises'
import path from 'node:path'
import {
	OUT_DIR,
	YOUTUBE_COMMENTS_FILE,
	YOUTUBE_INFO_FILE,
	YOUTUBE_MAYBE_ORIGINAL_DOWNLOAD_FILES,
	YOUTUBE_ORIGINAL_HTML_FILE,
} from '~/constants'
import type { RemotionVideoComment, YoutubeComment } from '~/types'
import { fileExist } from '../file'

export function getYoutubeCommentOut(videoId: string) {
	const outDir = path.join(process.cwd(), OUT_DIR, videoId)

	return {
		outDir,
		get commentFile() {
			return path.join(outDir, YOUTUBE_COMMENTS_FILE)
		},
		get infoFile() {
			return path.join(outDir, YOUTUBE_INFO_FILE)
		},
		get originalHtmlFile() {
			return path.join(outDir, YOUTUBE_ORIGINAL_HTML_FILE)
		},
	}
}

export function generateRemotionVideoComment(
	comments: YoutubeComment[],
	fps = 30,
) {
	const remotionVideoComments: RemotionVideoComment[] = comments.map(
		(comment, i) => {
			return {
				...comment,
				durationInFrames: fps * 10,
				form: fps * 10 * i,
			}
		},
	)
	return remotionVideoComments
}

export async function tryGetYoutubeDownloadFile(videoId: string) {
	let originalVideoFile = ''
	const { outDir } = getYoutubeCommentOut(videoId)

	for (const file of YOUTUBE_MAYBE_ORIGINAL_DOWNLOAD_FILES) {
		const filePath = path.join(outDir, file)
		if (await fileExist(filePath)) {
			originalVideoFile = filePath
			break
		}
	}

	return originalVideoFile
}

export function generateYoutubeUrlByVideoId(videoId: string) {
	return `https://www.youtube.com/watch?v=${videoId}`
}

export function parseYoutubeTitle(html: string) {
	const startIndex = html.indexOf('videoPrimaryInfoRenderer')
	const end = startIndex + 200
	const str = html.slice(startIndex, end)
	const titleMatch = str.match(/"text":"([^"]+)"/)
	const title = titleMatch ? titleMatch[1] : 'Unknown Title'
	return title
}
