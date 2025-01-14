import { ThumbsUp } from 'lucide-react'
import { AbsoluteFill, OffthreadVideo, Sequence, Video, useVideoConfig } from 'remotion'
import Cover from './Cover'
import { useTranslateComment } from './hooks'
import type { TranslateCommentProps } from './types'

export default function LandscapeTranslateComment({ comments, title, playFile, viewCountText, coverDurationInSeconds, author, isRemoteRender = false }: TranslateCommentProps) {
	const { fps } = useVideoConfig()

	const { currentComment, fontSize, playSrc, opacity, translateY } = useTranslateComment({
		isRemoteRender,
		playFile,
		coverDurationInSeconds,
		comments,
		availableWidth: 1920 - 48,
		availableHeight: 440,
	})

	return (
		<AbsoluteFill className="bg-gradient-to-b from-white to-gray-50">
			<Cover coverDurationInSeconds={coverDurationInSeconds} title={title} author={author} />

			<Sequence from={coverDurationInSeconds * fps}>
				<AbsoluteFill>
					<div className="flex justify-center items-center gap-[120px] h-[60%] pt-6 px-6">
						<div className="text-[#ee3f4d] w-[480px] flex-shrink-0 h-full flex flex-col items-start justify-center">
							<div className="flex items-center gap-3 text-3xl font-medium bg-red-50/80 px-5 py-2.5 rounded-xl">
								<span>播放量：{viewCountText}</span>
							</div>
							<p className="text-5xl mt-5 leading-[1.4] font-semibold">{title}</p>
						</div>
						<div className="bg-black/5 rounded-2xl p-1 h-full">
							<OffthreadVideo loop className="object-contain h-full rounded-xl" startFrom={0} crossOrigin="anonymous" src={playSrc} />
						</div>
					</div>
				</AbsoluteFill>

				<AbsoluteFill>
					<div className="absolute bottom-0 left-0 px-6 pb-6 h-[40%] w-full flex flex-col bg-gradient-to-t from-white/95 to-white/80 backdrop-blur-sm">
						<div
							style={{
								opacity,
								transform: `translateY(${translateY}px)`,
							}}
							className="text-xl leading-[20px] flex items-center gap-3 mb-3 text-gray-700"
						>
							<div className="font-medium">
								{currentComment?.author} ({currentComment?.publishedTime})
							</div>

							{currentComment?.likes.trim() && (
								<div className="flex items-center gap-1.5 bg-red-50 px-3 py-1 rounded-full">
									<ThumbsUp size={16} className="text-[#ee3f4d]" />
									<span className="text-[#ee3f4d]">{currentComment?.likes}</span>
								</div>
							)}
						</div>

						<div className="flex flex-col gap-4">
							<p
								style={{
									opacity,
									transform: `translateY(${translateY}px)`,
								}}
								className="leading-1.3 text-3xl text-ellipsis line-clamp-1 text-gray-800"
							>
								{currentComment?.content}
							</p>

							<p
								className="text-[#ee3f4d] leading-[1.1]"
								style={{
									fontSize: `${fontSize}px`,
									opacity,
									transform: `translateY(${translateY}px)`,
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
