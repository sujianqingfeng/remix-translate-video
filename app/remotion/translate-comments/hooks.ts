import { useMemo, useRef } from 'react'
import { interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import type { RemotionVideoComment } from '~/types'
import { calculateOptimalFontSize } from './utils'

export function useVideoFrame(coverDuration: number) {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()
	const coverFrames = coverDuration * fps

	return useMemo(() => {
		const frameSkip = 2
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
	const lastCommentRef = useRef<RemotionVideoComment | null>(null)
	const lastFrameRef = useRef<number>(0)

	const currentComment = useMemo(() => {
		const comment = comments.find((item) => {
			const startFrame = item.form
			const endFrame = item.form + item.durationInFrames
			return videoFrame >= startFrame && videoFrame <= endFrame
		})

		// 检测评论变化
		if (comment?.content !== lastCommentRef.current?.content) {
			lastCommentRef.current = comment || null
			lastFrameRef.current = videoFrame
		}

		return comment
	}, [comments, videoFrame])

	// 计算相对于评论切换时的帧数差
	const relativeFrame = videoFrame - lastFrameRef.current

	// 简化动画逻辑，使用淡入淡出效果
	const animationDuration = 6 // 约0.2秒@30fps
	const progress = Math.min(relativeFrame / animationDuration, 1)

	// 使用余弦函数创建平滑的过渡效果
	const opacity = currentComment
		? interpolate(progress, [0, 1], [0.3, 1], {
				extrapolateRight: 'clamp',
				extrapolateLeft: 'clamp',
			})
		: 0

	// 添加轻微的位移效果
	const translateY = currentComment
		? interpolate(
				progress,
				[0, 1],
				[5, 0], // 只移动5个像素，保持轻微
				{
					extrapolateRight: 'clamp',
					extrapolateLeft: 'clamp',
				},
			)
		: 0

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
		opacity,
		translateY,
	}
}
