import { useMemo } from 'react'
import { staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
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
	coverDurationInSeconds,
	comments,
	availableWidth,
	availableHeight,
	isRemoteRender,
	playFile,
}: { coverDurationInSeconds: number; comments: RemotionVideoComment[]; availableWidth: number; availableHeight: number; isRemoteRender: boolean; playFile: string }) {
	// 使用节流后的帧
	const throttledFrame = useThrottledFrame(coverDurationInSeconds)

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

	const playSrc = isRemoteRender ? playFile : staticFile(playFile)

	return {
		currentComment,
		fontSize,
		playSrc,
	}
}
