import { useMemo } from 'react'
import { useCurrentFrame, useVideoConfig } from 'remotion'
import type { RemotionVideoComment } from '~/types'
import { calculateOptimalFontSize } from './utils'

// 添加帧率控制函数
const FRAME_SKIP = 10 // 每5帧更新一次
export function useThrottledFrame(coverDuration: number) {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()

	const restFrame = frame - coverDuration * fps
	return Math.floor(restFrame / FRAME_SKIP) * FRAME_SKIP
}

export function useTranslateComment({
	viewCount,
	coverDuration,
	comments,
	availableWidth,
	availableHeight,
}: { viewCount: number; coverDuration: number; comments: RemotionVideoComment[]; availableWidth: number; availableHeight: number }) {
	const viewCountFormat = `${(viewCount / 1000).toFixed(1)}k`
	// 使用节流后的帧
	const throttledFrame = useThrottledFrame(coverDuration)

	const currentComment = useMemo(() => {
		return comments.find((item) => {
			return throttledFrame >= item.form && throttledFrame <= item.form + item.durationInFrames
		})
	}, [comments, throttledFrame]) // 使用节流后的帧作为依赖

	const fontSize = useMemo(() => {
		if (!currentComment?.translatedContent) return 20

		return calculateOptimalFontSize({
			text: currentComment.translatedContent,
			availableWidth,
			availableHeight,
		})
	}, [currentComment?.translatedContent, availableWidth, availableHeight])

	return {
		currentComment,
		fontSize,
		viewCountFormat,
	}
}
