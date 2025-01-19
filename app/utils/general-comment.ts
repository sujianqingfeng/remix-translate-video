import type { GeneralCommentTypeTextInfo } from '~/types'

export type VideoMode = 'landscape' | 'portrait' | 'vertical'

// Video configuration based on mode
export const getVideoConfig = (mode: VideoMode) => {
	const config = {
		fps: 30,
		...(mode === 'portrait' ? { width: 1080, height: 1920 } : mode === 'vertical' ? { width: 1080, height: 1350 } : { width: 1920, height: 1080 }),
	}
	return config
}

// Calculate video durations
export const calculateDurations = (comment: any) => {
	const typeInfo = comment.typeInfo as GeneralCommentTypeTextInfo
	const fps = 30
	const coverDurationInSeconds = 3
	const secondsForEvery30Words = 5

	// Content duration
	const contentWords = typeInfo.content?.split(/\s+/).length || 0
	const contentZhWords = typeInfo.contentZh?.length ? Math.ceil(typeInfo.contentZh.length / 2) : 0
	const totalWords = contentWords + contentZhWords
	const contentDurationInSeconds = Math.max(Math.ceil(totalWords / 30) * secondsForEvery30Words, 5)

	// Comment durations
	const getCommentDuration = (comment: any) => {
		const baseSeconds = 5
		const wordCount = (comment.content?.length || 0) + (comment.translatedContent?.length || 0)
		const extraSeconds = Math.ceil(wordCount / 100) * 2
		return baseSeconds + extraSeconds
	}

	const commentsDurationInSeconds = (comment.comments || []).reduce((acc: number, comment: any) => acc + getCommentDuration(comment), 0)

	return {
		fps,
		coverDurationInSeconds,
		secondsForEvery30Words,
		contentDurationInSeconds,
		commentsDurationInSeconds,
		totalDurationInSeconds: coverDurationInSeconds + contentDurationInSeconds + commentsDurationInSeconds,
		commentDurations: (comment.comments || []).map(getCommentDuration),
	}
}

// Get composition ID based on mode
export const getCompositionId = (mode: VideoMode) => {
	return mode === 'portrait' ? 'PortraitGeneralComment' : mode === 'vertical' ? 'VerticalGeneralComment' : 'LandscapeGeneralComment'
}

// Prepare input props for the video
export const prepareVideoProps = (comment: any, durations: ReturnType<typeof calculateDurations>) => {
	const typeInfo = comment.typeInfo as GeneralCommentTypeTextInfo
	return {
		title: typeInfo.title || '',
		content: typeInfo.content || '',
		contentZh: typeInfo.contentZh || '',
		author: comment.author,
		images: typeInfo.images || [],
		comments: comment.comments || [],
		fps: durations.fps,
		coverDurationInSeconds: durations.coverDurationInSeconds,
		contentDurationInSeconds: durations.contentDurationInSeconds,
		commentDurations: durations.commentDurations,
	}
}
