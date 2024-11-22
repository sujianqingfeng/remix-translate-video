import path from 'node:path'
import {
	OUT_DIR,
	YOUTUBE_COMMENTS_FILE,
	YOUTUBE_COMMENT_ID_PREFIX,
	YOUTUBE_INFO_FILE,
	YOUTUBE_ORIGINAL_HTML_FILE,
} from '~/constants'
import {
	PortraitTranslateComment,
	TranslateComment,
	VerticalTranslateComment,
} from '~/remotion'

import type { RemotionVideoComment, YoutubeComment, YoutubeInfo } from '~/types'

export const commentModeOptions = [
	{
		label: 'Landscape',
		value: 'landscape',
		playerWidth: 1280,
		playerHeight: 720,
		compositionWidth: 1920,
		compositionHeight: 1080,
		compositionId: 'TranslateComment',
	},
	{
		label: 'Portrait',
		value: 'portrait',
		playerWidth: 1280,
		playerHeight: 720,
		compositionWidth: 1920,
		compositionHeight: 1080,
		compositionId: 'PortraitTranslateComment',
	},
	{
		label: 'Vertical',
		value: 'vertical',
		playerWidth: 720,
		playerHeight: 1280,
		compositionWidth: 1080,
		compositionHeight: 1920,
		compositionId: 'VerticalTranslateComment',
	},
] as const

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

export function getRemotionTemplateComponent(mode: YoutubeInfo['mode']) {
	const componentMap = {
		landscape: TranslateComment,
		portrait: PortraitTranslateComment,
		vertical: VerticalTranslateComment,
	}
	return componentMap[mode]
}

export function findModeOption(mode: YoutubeInfo['mode']) {
	const currentModeOption = commentModeOptions.find((it) => it.value === mode)
	if (!currentModeOption) {
		throw new Error('currentModeOption is not found')
	}
	return currentModeOption
}
