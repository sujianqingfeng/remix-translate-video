import { ThumbsUp } from 'lucide-react'
import { AbsoluteFill, Sequence, Video, staticFile } from 'remotion'
import type { RemotionVideoComment } from '~/types'

export function TranslateCommentVideo({
	comments,
	title,
	videoSrc,
	dateTime,
	viewCount,
}: {
	comments: RemotionVideoComment[]
	title?: string
	videoSrc: string
	dateTime?: string
	viewCount: number
}) {
	const date = dateTime
		? new Date(dateTime)
				.toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'numeric',
					day: 'numeric',
				})
				.replace(/,/g, '')
		: ''

	const viewCountFormat = `${(viewCount / 1000).toFixed(1)}k`

	return (
		<AbsoluteFill className="bg-white">
			<AbsoluteFill>
				<div className="flex justify-center items-center h-[calc(100%-180px)]">
					<div className="text-[#F87171] w-[250px] flex-shrink-0 h-full flex flex-col  justify-center text-[30px] p-[20px]">
						<div className="flex items-center gap-2 text-[16px]">
							<span>{date}</span>
							<span>播放量：{viewCountFormat}</span>
						</div>
						<p> {title}</p>
					</div>
					<Video
						loop
						className="flex-grow object-contain h-full"
						startFrom={0}
						crossOrigin="anonymous"
						src={staticFile(videoSrc)}
					/>
				</div>
			</AbsoluteFill>

			<AbsoluteFill>
				{comments.map((comment, index) => {
					const translatedLength = comment.translatedContent?.length || 0
					const availableWidth = 1920 - 40 - 250
					const fontSize = Math.max(
						26,
						Math.min(32, availableWidth / (translatedLength * 1.2)),
					)

					return (
						<Sequence
							key={`${comment.author}-${index}`}
							from={comment.form}
							durationInFrames={comment.durationInFrames}
						>
							<div className="absolute bottom-0 left-0 px-4 pb-2 h-[200px] w-full flex flex-col">
								<div className="text-[12px] leading-[20px] flex items-center gap-2 mb-2">
									<div>
										{comment.author} ({comment.publishedTime})
									</div>
									<ThumbsUp size={16} />
									<span>{comment.likes}</span>
								</div>

								<div className="flex flex-col">
									<p className="leading-1.6 text-[14px] text-ellipsis line-clamp-1">
										{comment.content}
									</p>

									<p
										className="text-[#F87171] leading-1.4 mt-1 leading-[1.4]  max-h-[110px]"
										style={{
											fontSize: `${fontSize}px`,
										}}
									>
										{comment.translatedContent}
									</p>
								</div>
							</div>
						</Sequence>
					)
				})}
			</AbsoluteFill>
		</AbsoluteFill>
	)
}
