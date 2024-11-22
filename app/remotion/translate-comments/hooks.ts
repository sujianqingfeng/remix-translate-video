import { useCurrentFrame, useVideoConfig } from 'remotion'

// 添加帧率控制函数
const FRAME_SKIP = 10 // 每5帧更新一次
export function useThrottledFrame(coverDuration: number) {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()

	const restFrame = frame - coverDuration * fps
	return Math.floor(restFrame / FRAME_SKIP) * FRAME_SKIP
}
