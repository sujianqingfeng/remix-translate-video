import { ThumbsUp } from 'lucide-react'
import { useMemo } from 'react'
import {
	AbsoluteFill,
	Sequence,
	Video,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion'
import type { RemotionVideoComment } from '~/types'
import Cover from './Cover'

interface CalculateFontSizeParams {
	text: string
	availableWidth: number
	availableHeight: number
	minFontSize?: number
	maxFontSize?: number
	lineHeightRatio?: number
	charWidthRatio?: number
}

function calculateOptimalFontSize({
	text,
	availableWidth,
	availableHeight,
	minFontSize = 10,
	maxFontSize = 75,
	lineHeightRatio = 1.2,
	charWidthRatio = 1.2,
}: CalculateFontSizeParams): number {
	let currentMin = minFontSize
	let currentMax = maxFontSize
	let fontSize = 50

	while (currentMax - currentMin > 1) {
		fontSize = Math.floor((currentMin + currentMax) / 2)

		const charsPerLine = Math.floor(
			availableWidth / (fontSize * charWidthRatio),
		)
		const estimatedLines = Math.ceil(text.length / charsPerLine)
		const totalHeight = estimatedLines * fontSize * lineHeightRatio

		if (totalHeight > availableHeight) {
			currentMax = fontSize
		} else {
			currentMin = fontSize
		}
	}

	return currentMin
}

// 添加帧率控制函数
const FRAME_SKIP = 10 // 每5帧更新一次
function useThrottledFrame(coverDuration: number) {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()

	const restFrame = frame - coverDuration * fps
	return Math.floor(restFrame / FRAME_SKIP) * FRAME_SKIP
}

export default function TranslateComment({
	comments,
	title,
	videoSrc,
	viewCount,
	coverDuration,
	author,
}: {
	comments: RemotionVideoComment[]
	title?: string
	videoSrc: string
	viewCount: number
	coverDuration: number
	author?: string
}) {
	const viewCountFormat = `${(viewCount / 1000).toFixed(1)}k`
	// 使用节流后的帧
	const throttledFrame = useThrottledFrame(coverDuration)

	const currentComment = useMemo(() => {
		return comments.find((item) => {
			return (
				throttledFrame >= item.form &&
				throttledFrame <= item.form + item.durationInFrames
			)
		})
	}, [comments, throttledFrame]) // 使用节流后的帧作为依赖

	const fontSize = useMemo(() => {
		if (!currentComment?.translatedContent) return 20

		return calculateOptimalFontSize({
			text: currentComment.translatedContent,
			availableWidth: 1920 - 32,
			availableHeight: 440,
		})
	}, [currentComment?.translatedContent])

	const { fps } = useVideoConfig()

	return (
		<AbsoluteFill className="bg-white">
			<Cover coverDuration={coverDuration} title={title} author={author} />

			<Sequence from={coverDuration * fps}>
				<AbsoluteFill>
					<div className="flex justify-center items-center gap-[100px] h-[60%] p-4">
						<div className="text-[#ee3f4d] w-[450px] flex-shrink-0 h-full flex flex-col items-center justify-center p-[20px]">
							<div>
								<div className="flex items-center gap-2 text-3xl">
									<span>播放量：{viewCountFormat}</span>
								</div>
								<p className="text-5xl mt-2 leading-[1.5]"> {title}</p>
							</div>
						</div>
						<Video
							loop
							className="object-contain h-full"
							startFrom={0}
							crossOrigin="anonymous"
							src={staticFile(videoSrc)}
						/>
					</div>
				</AbsoluteFill>

				<AbsoluteFill>
					<div className="absolute bottom-0 left-0 px-4 pb-2 h-[40%] w-full flex flex-col">
						<div className="text-[12px] leading-[20px] flex items-center gap-2 mb-2">
							<div>
								{currentComment?.author} ({currentComment?.publishedTime})
							</div>
							<ThumbsUp size={16} />
							<span>{currentComment?.likes}</span>
						</div>

						<div className="flex flex-col">
							<p className="leading-1.6 text-[20px] text-ellipsis line-clamp-1">
								{currentComment?.content}
							</p>

							<p
								className="text-[#ee3f4d] leading-[1.2] mt-1"
								style={{
									fontSize: `${fontSize}px`,
								}}
							>
								{currentComment?.translatedContent}
							</p>
						</div>
					</div>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	)
}
