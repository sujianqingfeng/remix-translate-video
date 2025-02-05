import { useMemo, useRef } from 'react'
import { staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import type { RemotionVideoComment } from '~/types'
import { calculateOptimalFontSize } from './utils'

export function useVideoFrame(coverDuration: number) {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()
	const coverFrames = coverDuration * fps

	return useMemo(() => {
		const frameSkip = 30
		const normalizedFrame = Math.floor(frame / frameSkip) * frameSkip
		return normalizedFrame - coverFrames
	}, [frame, coverFrames])
}

export function useTranslateComment({
	coverDurationInSeconds,
	comments,
	availableWidth,
	availableHeight,
	isRemoteRender,
	playFile,
}: {
	coverDurationInSeconds: number
	comments: RemotionVideoComment[]
	availableWidth: number
	availableHeight: number
	isRemoteRender: boolean
	playFile: string
}) {
	const videoFrame = useVideoFrame(coverDurationInSeconds)
	const fontSizeCache = useRef<Record<string, number>>({})
	const commentsMap = useRef<Map<number, RemotionVideoComment>>(new Map())

	// Build comments map for faster lookup
	useMemo(() => {
		commentsMap.current.clear()
		for (const comment of comments) {
			const startFrame = comment.form
			const endFrame = comment.form + comment.durationInFrames
			for (let frame = startFrame; frame <= endFrame; frame += 30) {
				commentsMap.current.set(frame, comment)
			}
		}
	}, [comments])

	const currentComment = useMemo(() => {
		const normalizedFrame = Math.floor(videoFrame / 30) * 30
		return commentsMap.current.get(normalizedFrame)
	}, [videoFrame])

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

	const playSrc = useMemo(() => {
		return isRemoteRender ? playFile : staticFile(playFile)
	}, [isRemoteRender, playFile])

	return {
		currentComment,
		fontSize,
		playSrc,
	}
}
