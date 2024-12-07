import { ThumbsUp } from 'lucide-react'
import { AbsoluteFill, Sequence, Video, staticFile, useVideoConfig } from 'remotion'
import type { RemotionVideoComment } from '~/types'
import Cover from './Cover'
import { useTranslateComment } from './hooks'

export default function VerticalTranslateComment({
	comments,
	title,
	videoSrc,
	viewCount,
	coverDuration,
	author,
	isRemoteRender = false,
}: {
	comments: RemotionVideoComment[]
	title?: string
	videoSrc: string
	viewCount: number
	coverDuration: number
	author?: string
	isRemoteRender?: boolean
}) {
	const { currentComment, fontSize, viewCountFormat } = useTranslateComment({
		viewCount,
		coverDuration,
		comments,
		availableWidth: 1080 - 32,
		availableHeight: 1000,
	})

	const { fps } = useVideoConfig()

	const playSrc = isRemoteRender ? videoSrc : staticFile(videoSrc)

	return (
		<AbsoluteFill className="bg-white">
			<Cover coverDuration={coverDuration} title={title} author={author} isSplit={false} />

			<Sequence from={coverDuration * fps}>
				<AbsoluteFill>
					<div className="flex justify-center items-center h-[30%] px-[6rem]">
						<Video loop className="object-contain h-full" startFrom={0} crossOrigin="anonymous" src={playSrc} />
					</div>
				</AbsoluteFill>

				<AbsoluteFill>
					<div className="absolute bottom-0 left-0 px-[6rem] h-[70%] w-full flex flex-col gap-1">
						<div className="text-5xl leading-[1.2] text-[#ee3f4d]">{title}</div>
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
							<p className="leading-1.6 text-3xl text-ellipsis line-clamp-3">{currentComment?.content}</p>

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
