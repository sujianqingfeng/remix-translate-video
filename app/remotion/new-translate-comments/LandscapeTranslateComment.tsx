import { ThumbsUp } from 'lucide-react'
import { AbsoluteFill, Sequence, Video, useVideoConfig } from 'remotion'
import Cover from './Cover'
import { useTranslateComment } from './hooks'
import type { TranslateCommentProps } from './types'

export default function LandscapeTranslateComment({ comments, title, playFile, viewCountText, coverDurationInSeconds, author, isRemoteRender = false }: TranslateCommentProps) {
	const { fps } = useVideoConfig()

	const { currentComment, fontSize, playSrc } = useTranslateComment({
		isRemoteRender,
		playFile,
		coverDurationInSeconds,
		comments,
		availableWidth: 1920 - 32,
		availableHeight: 440,
	})

	return (
		<AbsoluteFill className="bg-white">
			<Cover coverDurationInSeconds={coverDurationInSeconds} title={title} author={author} />

			<Sequence from={coverDurationInSeconds * fps}>
				<AbsoluteFill>
					<div className="flex justify-center items-center gap-[100px] h-[64%] p-4">
						<div className="text-[#ee3f4d] w-[450px] flex-shrink-0 h-full flex flex-col items-center justify-center p-[20px]">
							<div>
								<div className="flex items-center gap-2 text-3xl">
									<span>播放量：{viewCountText}</span>
								</div>
								<p className="text-5xl mt-2 leading-[1.5]"> {title}</p>
							</div>
						</div>
						<Video loop className="object-contain h-full" startFrom={0} crossOrigin="anonymous" src={playSrc} />
					</div>
				</AbsoluteFill>

				<AbsoluteFill>
					<div className="absolute bottom-0 left-0 px-4 pb-2 h-[40%] w-full flex flex-col">
						<div className="text-xl leading-[20px] flex items-center gap-2 mb-2">
							<div>
								{currentComment?.author} ({currentComment?.publishedTime})
							</div>
							<ThumbsUp size={16} />
							<span>{currentComment?.likes}</span>
						</div>

						<div className="flex flex-col">
							<p className="leading-1.2 text-3xl text-ellipsis line-clamp-1">{currentComment?.content}</p>

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
