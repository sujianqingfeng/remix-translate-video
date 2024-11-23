import { ThumbsUp } from 'lucide-react'
import { useMemo } from 'react'
import { AbsoluteFill, Sequence, Video, staticFile, useVideoConfig } from 'remotion'
import type { RemotionVideoComment } from '~/types'
import Cover from './Cover'
import { useThrottledFrame } from './hooks'
import { calculateOptimalFontSize } from './utils'

export default function VerticalTranslateComment({
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
	const a = 1
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
			availableWidth: 1080 - 32,
			availableHeight: 1200,
		})
	}, [currentComment?.translatedContent])

	const { fps } = useVideoConfig()

	return (
		<AbsoluteFill className="bg-white">
			<Cover coverDuration={coverDuration} title={title} author={author} />

			<Sequence from={coverDuration * fps}>
				<AbsoluteFill>
					<div className="flex justify-center items-center h-[30%]">
						<Video loop className="object-contain h-full" startFrom={0} crossOrigin="anonymous" src={staticFile(videoSrc)} />
					</div>
				</AbsoluteFill>

				<AbsoluteFill>
					<div className="absolute bottom-0 left-0 px-4 h-[70%] w-full flex flex-col">
						<div className="text-5xl mt-2 leading-[1.5] text-[#ee3f4d]">{title}</div>
						<div className="flex items-center gap-2 text-3xl text-[#ee3f4d]">
							<span>播放量：{viewCountFormat}</span>
						</div>
						<div className="text-2xl leading-[20px] flex items-center gap-2 my-4">
							<div>
								{currentComment?.author} ({currentComment?.publishedTime})
							</div>
							<ThumbsUp size={20} />
							<span>{currentComment?.likes}</span>
						</div>

						<div className="flex flex-col">
							<p className="leading-1.6 text-2xl text-ellipsis line-clamp-2">{currentComment?.content}</p>

							<p
								className="text-[#ee3f4d] leading-[1.2] mt-1 border border-red-500"
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
