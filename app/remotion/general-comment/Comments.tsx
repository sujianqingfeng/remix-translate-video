import { ThumbsUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import type { Comment } from '~/types'
import { formatLikes } from '~/utils/format'

interface CommentsProps {
	comments: Comment[]
	totalDurationInFrames?: number
}

export const Comments: React.FC<CommentsProps> = ({ comments, totalDurationInFrames }) => {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()
	const containerRef = useRef<HTMLDivElement>(null)
	const [scrollHeight, setScrollHeight] = useState(0)

	useEffect(() => {
		if (containerRef.current) {
			setScrollHeight(containerRef.current.scrollHeight)
		}
	}, [comments])

	const opacity = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		durationInFrames: 30,
	})

	// 计算滚动位置
	const calculateScrollPosition = () => {
		const visibleHeight = 700 // 可视区域高度
		const scrollDistance = Math.max(0, scrollHeight - visibleHeight)

		// 使用 interpolate 计算滚动位置
		const duration = totalDurationInFrames || fps * 15 // 如果没有提供总时长，默认使用15秒
		const scrollProgress = interpolate(
			frame,
			[fps * 0.5, duration - fps * 0.5], // 从0.5秒开始，在结束前0.5秒完成
			[0, scrollDistance],
			{
				extrapolateLeft: 'clamp',
				extrapolateRight: 'clamp',
			},
		)

		return scrollProgress
	}

	return (
		<div className="h-full w-full overflow-hidden">
			<div
				className="w-full h-full"
				style={{
					opacity,
				}}
			>
				<div className="h-full px-6 py-4 overflow-hidden relative">
					<div
						ref={containerRef}
						className="comments-container space-y-4 absolute inset-x-0"
						style={{
							transform: `translateY(-${calculateScrollPosition()}px)`,
						}}
					>
						{comments.map((comment, index) => {
							const likes = typeof comment.likes === 'string' ? Number.parseInt(comment.likes, 10) : comment.likes

							return (
								<div key={`${comment.author}-${index}`} className="bg-gray-50/80 rounded-xl p-6 flex flex-col gap-4">
									{/* Author Info */}
									<div className="flex items-center gap-4">
										{comment.authorThumbnail && <img src={comment.authorThumbnail} alt={comment.author} className="w-10 h-10 rounded-full object-cover ring-1 ring-gray-200" />}
										<div className="min-w-0">
											<h3 className="text-lg font-medium text-gray-900 truncate">{comment.author}</h3>
											<div className="flex items-center gap-2 mt-1">
												<ThumbsUp className="w-4 h-4 text-gray-600" />
												<span className="text-base text-gray-600">{formatLikes(likes)}</span>
											</div>
										</div>
									</div>

									{/* Text Content */}
									<div className="flex flex-col gap-3">
										<div>
											<h4 className="text-xs font-medium text-blue-600 tracking-wide uppercase mb-1.5">Original</h4>
											<p className="text-base text-gray-600 leading-relaxed">{comment.content}</p>
										</div>
										{comment.translatedContent && (
											<div>
												<h4 className="text-xs font-medium text-emerald-600 tracking-wide uppercase mb-1.5">Translation</h4>
												<p className="text-xl text-gray-900 leading-normal font-medium">{comment.translatedContent}</p>
											</div>
										)}
									</div>

									{/* Media Content */}
									{comment.media && comment.media.length > 0 && (
										<div className="flex gap-3 overflow-x-auto">
											{comment.media.map((m, mediaIndex) => (
												<div
													key={`${m.url}-${mediaIndex}`}
													className={`${m.type === 'video' ? 'w-[240px] aspect-video' : 'w-[240px] aspect-[4/3]'} flex-shrink-0 bg-black rounded-lg overflow-hidden`}
												>
													{m.type === 'video' ? (
														<video src={m.url} controls={false} autoPlay loop muted className="w-full h-full object-cover">
															<track kind="captions" />
														</video>
													) : (
														<img src={m.url} alt="Comment media" className="w-full h-full object-cover" />
													)}
												</div>
											))}
										</div>
									)}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</div>
	)
}
