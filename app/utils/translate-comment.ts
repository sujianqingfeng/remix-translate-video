import fsp from 'node:fs/promises'
import path from 'node:path'
import { commentModeOptions } from '~/config'
import { BUNDLE_DIR, OUT_DIR, RENDER_INFO_FILE, YOUTUBE_COMMENTS_FILE, YOUTUBE_COMMENT_ID_PREFIX, YOUTUBE_INFO_FILE, YOUTUBE_ORIGINAL_HTML_FILE } from '~/constants'
import type { RemotionVideoComment, YoutubeComment, YoutubeInfo } from '~/types'
import { fileExist } from './file'

export function getYoutubeCommentFullId(id: string) {
	return `${YOUTUBE_COMMENT_ID_PREFIX}${id}`
}

export function getYoutubeCommentOut(videoId: string) {
	const outDir = path.join(process.cwd(), OUT_DIR, getYoutubeCommentFullId(videoId))
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
		get bundleDir() {
			return path.join(outDir, BUNDLE_DIR)
		},
		get renderInfoFile() {
			return path.join(outDir, RENDER_INFO_FILE)
		},
	}
}

export function generateRemotionVideoComment(comments: YoutubeComment[], fps = 60, defaultSeconds = 5) {
	let currentStartFrame = 0

	const remotionVideoComments: RemotionVideoComment[] = comments.map((comment, i) => {
		const textLength = comment.translatedContent?.length || 0
		const calculatedDuration = Math.max(3, Math.ceil((textLength / 30) * defaultSeconds))
		const durationInFrames = fps * calculatedDuration

		const result = {
			...comment,
			durationInFrames,
			form: currentStartFrame,
		}

		currentStartFrame += durationInFrames

		return result
	})

	return remotionVideoComments
}

export function findModeOption(mode: YoutubeInfo['mode']) {
	const currentModeOption = commentModeOptions.find((it) => it.value === mode)
	if (!currentModeOption) {
		throw new Error('currentModeOption is not found')
	}
	return currentModeOption
}

export async function buildRemotionRenderData({
	fps = 30,
	defaultSeconds = 5,
	coverDuration = 3,
	videoId,
	mode,
}: {
	videoId: string
	mode: YoutubeInfo['mode']
	fps?: number
	defaultSeconds?: number
	coverDuration?: number
}) {
	const { commentFile } = getYoutubeCommentOut(videoId)

	let comments: YoutubeComment[] = []
	if (await fileExist(commentFile)) {
		const commentsStr = await fsp.readFile(commentFile, 'utf-8')
		comments = JSON.parse(commentsStr) as YoutubeComment[]
	}

	const remotionVideoComments = generateRemotionVideoComment(comments, fps, defaultSeconds)

	const coverDurationInFrames = coverDuration * fps
	const lastComment = remotionVideoComments[remotionVideoComments.length - 1]
	const commentsEndFrame = lastComment ? lastComment.form + lastComment.durationInFrames : 0
	const totalDurationInFrames = coverDurationInFrames + commentsEndFrame

	const { playerHeight, playerWidth, compositionHeight, compositionWidth, compositionId } = findModeOption(mode)

	return {
		fps,
		remotionVideoComments,
		coverDuration,
		totalDurationInFrames,
		coverDurationInFrames,
		playerHeight,
		playerWidth,
		compositionHeight,
		compositionWidth,
		defaultSeconds,
		compositionId,
		commentsEndFrame,
	}
}
