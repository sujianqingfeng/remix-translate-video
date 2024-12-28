import { ThumbsUp } from 'lucide-react'
import { AbsoluteFill, Sequence, Video, useVideoConfig } from 'remotion'
import Cover from './Cover'
import { useTranslateComment } from './hooks'
import type { TranslateCommentProps } from './types'

export default function PortraitTranslateComment({ comments, title, playFile, viewCountText, coverDurationInSeconds, author, isRemoteRender = false }: TranslateCommentProps) {
	const { fps } = useVideoConfig()

	const { currentComment, fontSize, playSrc } = useTranslateComment({
		isRemoteRender,
		playFile,
		coverDurationInSeconds,
		comments,
		availableWidth: 1920 / 2 - 32,
		availableHeight: 800,
	})

	return (
		<AbsoluteFill className="bg-white">
			<Cover coverDurationInSeconds={coverDurationInSeconds} title={title} author={author} />

			<Sequence from={coverDurationInSeconds * fps}>
				<AbsoluteFill>
					<div className="flex justify-center items-center w-[40%] h-full p-4">
						<Video loop className="object-contain h-full" startFrom={0} crossOrigin="anonymous" src={playSrc} />
					</div>
				</AbsoluteFill>

				<AbsoluteFill>
					<div className="absolute top-0 left-[40%] w-[60%] flex flex-col p-4">
						<div className="text-[#ee3f4d] flex flex-col justify-center">
							<div>
								<div className="flex items-center gap-2 text-3xl">
									<span>播放量：{viewCountText}</span>
								</div>
								<p className="text-5xl mt-2 leading-[1.5]"> {title}</p>
							</div>
						</div>

						<div className="text-2xl leading-[20px] flex items-center gap-2 mt-2">
							<div>
								{currentComment?.author} ({currentComment?.publishedTime})
							</div>

							{currentComment?.likes && +currentComment.likes > 0 && (
								<div className="flex items-center gap-2">
									<ThumbsUp size={24} />
									<span>{currentComment?.likes}</span>
								</div>
							)}
						</div>

						<div className="flex flex-col">
							<p className="leading-1.6 text-3xl text-ellipsis line-clamp-4">{currentComment?.content}</p>

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
