import { ThumbsUp } from 'lucide-react'
import { AbsoluteFill, Sequence, Video, staticFile } from 'remotion'
import type { VideoComment } from '~/types'

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
	comments: VideoComment[]
	title: string
	videoSrc: string
}) {
	// 计算评论区域的最大宽度和高度（考虑padding）
	const commentMaxWidth = 1920 - 340 // 1920px 减去左侧标题宽度和padding
	const commentContentMaxHeight = 50 // 原始评论的最大高度
	const translatedContentMaxHeight = 70 // 翻译评论的最大高度

	return (
		<AbsoluteFill style={{ backgroundColor: 'white' }}>
			<AbsoluteFill>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: 'calc(100% - 160px)',
					}}
				>
					<div
						style={{
							width: '250px',
							flexShrink: 0,
							height: '100%',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							color: '#F87171',
							fontSize: '30px',
							padding: '20px',
						}}
					>
						{title}
					</div>
					<Video
						loop
						style={{ flexGrow: 1, objectFit: 'contain', height: '100%' }}
						startFrom={0}
						crossOrigin="anonymous"
						src={staticFile(videoSrc)}
					/>
				</div>
			</AbsoluteFill>

			<AbsoluteFill>
				{comments.map((comment) => (
					<Sequence
						key={comment.author}
						from={comment.form}
						durationInFrames={comment.durationInFrames}
					>
						<div
							style={{
								position: 'absolute',
								bottom: 0,
								left: 0,
								padding: '20px',
								height: '160px',
								width: '100%',
							}}
						>
							<div
								style={{
									fontSize: '12px',
									lineHeight: '20px',
									display: 'flex',
									alignItems: 'center',
									gap: '10px',
								}}
							>
								<div>{comment.author}</div>
								<ThumbsUp size={16} />
								<span>{comment.likes}</span>
							</div>
							<p
								style={{
									fontSize: `${calculateFontSize(
										comment.content,
										commentMaxWidth,
										commentContentMaxHeight,
										16,
										1.8,
									)}px`,
									lineHeight: '1.8',
									marginBottom: '4px',
									maxHeight: `${commentContentMaxHeight}px`,
									overflow: 'hidden',
								}}
							>
								{comment.content}
							</p>
							<p
								style={{
									color: '#F87171',
									fontSize: `${calculateFontSize(
										comment.translatedContent ?? '',
										commentMaxWidth,
										translatedContentMaxHeight,
										30,
										1.5,
									)}px`,
									lineHeight: '1.5',
									maxHeight: `${translatedContentMaxHeight}px`,
									overflow: 'hidden',
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
