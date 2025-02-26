import { format } from 'date-fns'
import { Clock, Eye, MessageCircle, ThumbsUp } from 'lucide-react'
import { spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { staticFile } from 'remotion'
import type { GeneralCommentProps } from './types'

export const Content: React.FC<Pick<GeneralCommentProps, 'content' | 'contentZh' | 'images' | 'fps' | 'createdAt' | 'likes' | 'views' | 'commentCount'>> = ({
	content,
	contentZh,
	images,
	fps,
	createdAt,
	likes = 0,
	views = 0,
	commentCount = 0,
}) => {
	const frame = useCurrentFrame()
	const { durationInFrames } = useVideoConfig()

	// 计算内容的滚动动画
	const scrollProgress = spring({
		frame: frame % (durationInFrames / 2),
		fps,
		from: 0,
		to: 1,
		durationInFrames: durationInFrames / 2,
		config: {
			damping: 100,
		},
	})

	const formatNumber = (num: number) => {
		if (num >= 1000000) {
			return `${(num / 1000000).toFixed(1)}M`
		}
		if (num >= 1000) {
			return `${(num / 1000).toFixed(1)}K`
		}
		return num.toString()
	}

	return (
		<div className="h-full overflow-hidden relative flex flex-col">
			{/* Header */}
			<div className="flex-none px-16 py-8 border-b border-gray-100">
				<div className="flex items-center gap-8 text-gray-500">
					{createdAt && (
						<div className="flex items-center gap-2">
							<Clock className="w-4 h-4" />
							<span className="text-base font-medium text-gray-700">{format(new Date(createdAt), 'MMM dd, yyyy HH:mm')}</span>
						</div>
					)}
					<div className="flex items-center gap-6">
						{likes > 0 && (
							<div className="flex items-center gap-2">
								<ThumbsUp className="w-4 h-4 text-blue-500" />
								<span className="text-base font-medium text-gray-800">{formatNumber(likes)}</span>
							</div>
						)}
						{views > 0 && (
							<div className="flex items-center gap-2">
								<Eye className="w-4 h-4 text-emerald-500" />
								<span className="text-base font-medium text-gray-800">{formatNumber(views)}</span>
							</div>
						)}
						{commentCount > 0 && (
							<div className="flex items-center gap-2">
								<MessageCircle className="w-4 h-4 text-purple-500" />
								<span className="text-base font-medium text-gray-800">{formatNumber(commentCount)}</span>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Scrollable Content */}
			<div className="flex-1 relative overflow-hidden">
				<div
					className="absolute inset-0 px-16"
					style={{
						transform: `translateY(calc(-50% * ${scrollProgress}))`,
					}}
				>
					<div className="space-y-16 py-12">
						{/* Original Content */}
						<div className="bg-gray-50/50 rounded-2xl p-8 shadow-sm">
							<div className="flex items-center gap-3 mb-8">
								<div className="h-6 w-1 bg-gradient-to-b from-blue-600 to-blue-400 rounded-full" />
								<h4 className="text-sm font-semibold text-blue-600 tracking-wider uppercase">Original</h4>
							</div>
							<p className="text-xl text-gray-800 leading-relaxed whitespace-pre-wrap font-medium">{content}</p>
						</div>

						{/* Translated Content */}
						{contentZh && (
							<div className="bg-emerald-50/50 rounded-2xl p-8 shadow-sm">
								<div className="flex items-center gap-3 mb-8">
									<div className="h-6 w-1 bg-gradient-to-b from-emerald-600 to-emerald-400 rounded-full" />
									<h4 className="text-sm font-semibold text-emerald-600 tracking-wider uppercase">Translation</h4>
								</div>
								<p className="text-[2rem] text-gray-900 leading-relaxed font-medium whitespace-pre-wrap">{contentZh}</p>
							</div>
						)}

						{/* Images */}
						{images && images.length > 0 && (
							<div className={`grid ${images.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-2'} gap-8`}>
								{images.map((image) => {
									const isRemoteUrl = image.startsWith('http')
									const imageSrc = isRemoteUrl ? image : staticFile(image.replace(/^\//, '').replace(/^public\//, ''))

									return (
										<div key={image} className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
											<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
											<img
												src={imageSrc}
												alt=""
												className="w-full h-full object-cover"
												style={{
													aspectRatio: '1',
												}}
											/>
										</div>
									)
								})}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
