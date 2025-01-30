import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'
import { staticFile } from 'remotion'
import type { GeneralCommentProps } from './types'

export const Content: React.FC<Pick<GeneralCommentProps, 'content' | 'contentZh' | 'images' | 'fps'>> = ({ content, contentZh, images, fps }) => {
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

	return (
		<div className="h-full overflow-hidden relative">
			<div
				className="absolute inset-0 px-16"
				style={{
					transform: `translateY(calc(-50% * ${scrollProgress}))`,
				}}
			>
				<div className="space-y-12 py-12">
					{/* Original Content */}
					<div>
						<div className="flex items-center gap-2 mb-6">
							<div className="h-5 w-0.5 bg-blue-600 rounded-full" />
							<h4 className="text-xs font-medium text-blue-600 tracking-wider uppercase">Original</h4>
						</div>
						<p className="text-xl text-gray-800 leading-relaxed whitespace-pre-wrap pl-3">{content}</p>
					</div>

					{/* Translated Content */}
					{contentZh && (
						<div>
							<div className="flex items-center gap-2 mb-6">
								<div className="h-5 w-0.5 bg-emerald-600 rounded-full" />
								<h4 className="text-xs font-medium text-emerald-600 tracking-wider uppercase">Translation</h4>
							</div>
							<p className="text-[2rem] text-gray-900 leading-relaxed font-medium whitespace-pre-wrap pl-3">{contentZh}</p>
						</div>
					)}

					{/* Images */}
					{images && images.length > 0 && (
						<div className={`grid ${images.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' : 'grid-cols-2'} gap-8 mt-8`}>
							{images.map((image) => {
								const isRemoteUrl = image.startsWith('http')
								const imageSrc = isRemoteUrl ? image : staticFile(image.replace(/^\//, '').replace(/^public\//, ''))

								return (
									<div key={image} className="relative overflow-hidden rounded-2xl">
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
	)
}
