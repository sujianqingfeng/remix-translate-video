import { ThumbsUp } from 'lucide-react'
import { AbsoluteFill, Sequence, Video, staticFile } from 'remotion'
import type { RemotionVideoComment } from '~/types'

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
	maxFontSize = 90,
	lineHeightRatio = 1.5,
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
				<div className="flex justify-center items-center h-[60%]">
					<div className="text-[#ee3f4d] w-[400px] flex-shrink-0 h-full flex flex-col items-center justify-center  p-[20px]">
						<div>
							<div className="flex items-center gap-2 text-3xl">
								<span>{date}</span>
								<span>播放量：{viewCountFormat}</span>
							</div>
							<p className="text-5xl mt-2"> {title}</p>
						</div>
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
					const fontSize = calculateOptimalFontSize({
						text: comment.translatedContent || '',
						availableWidth: 1920 - 32,
						availableHeight: 450,
					})

					return (
						<Sequence
							key={`${comment.author}-${index}`}
							from={comment.form}
							durationInFrames={comment.durationInFrames}
						>
							<div className="absolute bottom-0 left-0 px-4 pb-2 h-[40%] w-full flex flex-col">
								<div className="text-[12px] leading-[20px] flex items-center gap-2 mb-2">
									<div>
										{comment.author} ({comment.publishedTime})
									</div>
									<ThumbsUp size={16} />
									<span>{comment.likes}</span>
								</div>

								<div className="flex flex-col">
									<p className="leading-1.6 text-[20px] text-ellipsis line-clamp-1">
										{comment.content}
									</p>

									<p
										className="text-[#ee3f4d] leading-1.4 mt-1"
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
