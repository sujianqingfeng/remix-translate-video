import { ThumbsUp } from 'lucide-react'
import { AbsoluteFill, Sequence, Video, staticFile } from 'remotion'
import type { RemotionVideoComment } from '~/types'

// 添加计算字体大小的辅助函数，同时考虑宽度和高度限制
const calculateFontSize = (
	text: string,
	maxWidth: number,
	maxHeight: number,
	baseSize: number,
	lineHeight: number,
) => {
	// 估算单行文本宽度和总高度
	const estimatedWidth = text.length * (baseSize * 0.6)
	const estimatedLines = Math.ceil(estimatedWidth / maxWidth)
	const estimatedHeight = estimatedLines * (baseSize * lineHeight)

	// 如果宽度和高度都满足，返回原始大小
	if (estimatedWidth <= maxWidth && estimatedHeight <= maxHeight) {
		return baseSize
	}

	// 分别计算基于宽度和高度的缩放比例
	const widthRatio = maxWidth / estimatedWidth
	const heightRatio = maxHeight / estimatedHeight

	// 使用较小的缩放比例来确保同时满足宽度和高度限制
	const ratio = Math.min(widthRatio, heightRatio)

	// 返回计算后的字体大小，设置最小值为12px
	return Math.max(12, Math.floor(baseSize * ratio))
}

export function TranslateCommentVideo({
	comments,
	title,
	videoSrc,
}: {
	comments: RemotionVideoComment[]
	title?: string
	videoSrc: string
}) {
	// 调整评论区域的布局参数
	const commentMaxWidth = 1920 - 340
	const commentContentMaxHeight = 45 // 稍微减小原始评论的高度
	const translatedContentMaxHeight = 85 // 增加翻译内容的最大高度

	return (
		<AbsoluteFill className="bg-white">
			<AbsoluteFill>
				<div className="flex justify-center items-center h-[calc(100%-180px)]">
					<div className="text-[#F87171] w-[250px] flex-shrink-0 h-full flex items-center justify-center text-[30px] p-[20px]">
						{title}
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
				{comments.map((comment, index) => (
					<Sequence
						key={`${comment.author}-${index}`}
						from={comment.form}
						durationInFrames={comment.durationInFrames}
					>
						<div className="absolute bottom-0 left-0 p-[20px] h-[180px] w-full">
							<div className="text-[12px] leading-[20px] flex items-center gap-2">
								<div>{comment.author}</div>
								<ThumbsUp size={16} />
								<span>{comment.likes}</span>
							</div>
							<p
								className={`leading-1.6 mb-[8px] overflow-hidden max-h-[${commentContentMaxHeight}px]`}
								style={{
									fontSize: `${calculateFontSize(
										comment.content,
										commentMaxWidth,
										commentContentMaxHeight,
										16,
										1.6,
									)}px`,
								}}
							>
								{comment.content}
							</p>
							<p
								className={`text-[#F87171] leading-1.4 line-clamp-3 overflow-hidden mb-[${translatedContentMaxHeight}px]`}
								style={{
									fontSize: `${calculateFontSize(
										comment.translatedContent ?? '',
										commentMaxWidth,
										translatedContentMaxHeight,
										28,
										1.4,
									)}px`,
								}}
							>
								{comment.translatedContent}
							</p>
						</div>
					</Sequence>
				))}
			</AbsoluteFill>
		</AbsoluteFill>
	)
}
