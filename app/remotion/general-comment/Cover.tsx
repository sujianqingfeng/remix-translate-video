import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'

interface CoverProps {
	title?: string
	author: string
	images?: string[]
}

export const Cover: React.FC<CoverProps> = ({ title, author, images }) => {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()

	const titleOpacity = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		durationInFrames: 30,
	})

	const titleTranslateY = interpolate(
		spring({
			frame,
			fps,
			from: 0,
			to: 1,
			durationInFrames: 30,
		}),
		[0, 1],
		[20, 0],
	)

	const authorOpacity = spring({
		frame: frame - 15,
		fps,
		from: 0,
		to: 1,
		durationInFrames: 30,
	})

	const authorTranslateY = interpolate(
		spring({
			frame: frame - 15,
			fps,
			from: 0,
			to: 1,
			durationInFrames: 30,
		}),
		[0, 1],
		[20, 0],
	)

	const backgroundScale = spring({
		frame,
		fps,
		from: 1.1,
		to: 1,
		durationInFrames: 60,
		config: {
			damping: 100,
		},
	})

	// Subtle floating animation for background elements
	const floatY = interpolate(frame % 120, [0, 60, 120], [0, 5, 0])

	return (
		<AbsoluteFill className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-20 relative overflow-hidden">
			{/* Animated background elements */}
			<div
				className="absolute inset-0 opacity-20"
				style={{
					transform: `scale(${backgroundScale})`,
				}}
			>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#6366f1_1px,transparent_0)] bg-[length:30px_30px]" />
			</div>

			{/* Decorative elements */}
			<div className="absolute top-0 left-0 w-full h-full" style={{ transform: `translateY(${floatY}px)` }}>
				<div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-blue-500/20 blur-3xl" />
				<div className="absolute bottom-40 right-20 w-80 h-80 rounded-full bg-purple-500/20 blur-3xl" />
			</div>

			{/* Content Container - No card, just clean layout */}
			<div className="relative z-10 max-w-5xl mx-auto text-center space-y-12">
				<h1
					className="text-8xl font-bold bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800 bg-clip-text text-transparent drop-shadow-sm"
					style={{
						opacity: titleOpacity,
						transform: `translateY(${titleTranslateY}px)`,
					}}
				>
					{title || 'Untitled'}
				</h1>
				<div
					className="flex items-center justify-center gap-6"
					style={{
						opacity: authorOpacity,
						transform: `translateY(${authorTranslateY}px)`,
					}}
				>
					<div className="h-px w-24 bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
					<p className="text-3xl text-indigo-700 font-light tracking-wider">
						By <span className="font-medium text-indigo-900">{author}</span>
					</p>
					<div className="h-px w-24 bg-gradient-to-r from-transparent via-indigo-300 to-transparent" />
				</div>

				{/* Optional image display */}
				{images && images.length > 0 && (
					<div
						className="mt-16 flex justify-center gap-4"
						style={{
							opacity: spring({
								frame: frame - 30,
								fps,
								from: 0,
								to: 1,
								durationInFrames: 30,
							}),
						}}
					>
						{images.slice(0, 3).map((image, i) => {
							const isRemoteUrl = image.startsWith('http')
							const imageSrc = isRemoteUrl ? image : staticFile(image.replace(/^\//, '').replace(/^public\//, ''))

							return (
								<div
									key={`image-${i}-${image.substring(0, 10)}`}
									className="w-24 h-24 rounded-full overflow-hidden border-2 border-indigo-200 shadow-lg"
									style={{
										transform: `translateY(${interpolate((frame + i * 10) % 120, [0, 60, 120], [0, 8, 0])}px)`,
									}}
								>
									<Img src={imageSrc} className="w-full h-full object-cover" />
								</div>
							)
						})}
					</div>
				)}
			</div>
		</AbsoluteFill>
	)
}
