import { useMemo, useRef } from 'react'
import { staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import type { RemotionVideoComment } from '~/types'
import { calculateOptimalFontSize } from './utils'

export function useVideoFrame(coverDuration: number) {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()
	const coverFrames = coverDuration * fps

	return useMemo(() => {
		const frameSkip = 10
		const normalizedFrame = Math.floor(frame / frameSkip) * frameSkip
		const restFrame = normalizedFrame - coverFrames
		return restFrame
	}, [frame, coverFrames])
}

export function useTranslateComment({
	coverDurationInSeconds,
	comments,
	availableWidth,
	availableHeight,
	isRemoteRender,
	playFile,
}: { coverDurationInSeconds: number; comments: RemotionVideoComment[]; availableWidth: number; availableHeight: number; isRemoteRender: boolean; playFile: string }) {
	const videoFrame = useVideoFrame(coverDurationInSeconds)
	const fontSizeCache = useRef<Record<string, number>>({})

	const currentComment = useMemo(() => {
		return comments.find((item) => {
			const startFrame = item.form
			const endFrame = item.form + item.durationInFrames
			return videoFrame >= startFrame && videoFrame <= endFrame
		})
	}, [comments, videoFrame])

	const fontSize = useMemo(() => {
		if (!currentComment?.translatedContent) return 20

		const cacheKey = `${currentComment.translatedContent}-${availableWidth}-${availableHeight}`
		if (fontSizeCache.current[cacheKey]) {
			return fontSizeCache.current[cacheKey]
		}

		const size = calculateOptimalFontSize({
			text: currentComment.translatedContent,
			availableWidth,
			availableHeight,
		})

		fontSizeCache.current[cacheKey] = size
		return size
	}, [currentComment?.translatedContent, availableWidth, availableHeight])

	const playSrc = isRemoteRender ? playFile : staticFile(playFile)

	return {
		currentComment,
		fontSize,
		playSrc,
	}
}
