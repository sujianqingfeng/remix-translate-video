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
	// 调整评论区域的布局参数
	const commentMaxWidth = 1920 - 340
	const commentContentMaxHeight = 45 // 稍微减小原始评论的高度
	const translatedContentMaxHeight = 85 // 增加翻译内容的最大高度

	return (
		<AbsoluteFill style={{ backgroundColor: 'white' }}>
			<AbsoluteFill>
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						height: 'calc(100% - 180px)', // 增加底部空间
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
								height: '180px', // 增加整体评论区域的高度
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
										1.6, // 减小行高
									)}px`,
									lineHeight: '1.6',
									marginBottom: '8px',
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
										28, // 稍微减小基础字号
										1.4, // 减小行高以容纳更多内容
									)}px`,
									lineHeight: '1.4',
									maxHeight: `${translatedContentMaxHeight}px`,
									overflow: 'hidden',
									display: '-webkit-box',
									WebkitLineClamp: 3, // 最多显示3行
									WebkitBoxOrient: 'vertical',
									textOverflow: 'ellipsis',
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
