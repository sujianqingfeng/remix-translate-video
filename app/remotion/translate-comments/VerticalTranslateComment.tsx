import { ThumbsUp } from 'lucide-react'
import { AbsoluteFill, Sequence, Video, useVideoConfig } from 'remotion'
import Cover from './Cover'
import { useTranslateComment } from './hooks'
import type { TranslateCommentProps } from './types'

export default function VerticalTranslateComment({ comments, title, playFile, viewCountText, coverDurationInSeconds, author, isRemoteRender = false }: TranslateCommentProps) {
	const { currentComment, fontSize, playSrc } = useTranslateComment({
		isRemoteRender,
		playFile,
		coverDurationInSeconds,
		comments,
		availableWidth: 1080 - 48,
		availableHeight: 1000,
	})

	const { fps } = useVideoConfig()

	return (
		<AbsoluteFill className="bg-white">
			<Cover coverDurationInSeconds={coverDurationInSeconds} title={title} author={author} isSplit={false} />

			<Sequence from={coverDurationInSeconds * fps}>
				<AbsoluteFill>
					<div className="flex justify-center items-center h-[26%] px-[6rem]">
						<Video loop className="object-contain h-full rounded-xl shadow-lg" startFrom={0} crossOrigin="anonymous" src={playSrc} />
					</div>
				</AbsoluteFill>

				<AbsoluteFill>
					<div className="absolute bottom-0 left-0 px-[6rem] h-[74%] w-full flex flex-col pb-8">
						<div className="space-y-0">
							<h1 className="mt-4 text-5xl font-bold leading-tight text-[#ee3f4d]">{title}</h1>
							<div className="flex items-center gap-3 text-3xl text-[#ee3f4d]/90">
								<span className="flex items-center">
									<span className="mr-2">播放量</span>
									<span className="font-semibold">{viewCountText}</span>
								</span>
							</div>
						</div>

						<div className="flex items-center gap-3 text-2xl text-gray-600">
							<div className="font-medium">
								{currentComment?.author}
								<span className="mx-2 opacity-60">•</span>
								<span className="text-gray-500">{currentComment?.publishedTime}</span>
							</div>
							{currentComment?.likes && +currentComment.likes > 0 && (
								<div className="flex items-center gap-1.5 bg-red-50 px-3 py-1 rounded-full">
									<ThumbsUp className="text-[#ee3f4d]" size={24} />
									<span className="text-[#ee3f4d]">{currentComment?.likes}</span>
								</div>
							)}
						</div>

						<div className="flex flex-col flex-grow">
							<p className="text-3xl leading-normal text-gray-800 line-clamp-3 mb-4">{currentComment?.content}</p>

							<p
								className="text-[#ee3f4d] leading-tight font-medium"
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
