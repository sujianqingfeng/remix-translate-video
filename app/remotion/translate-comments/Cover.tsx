import { AbsoluteFill, Sequence, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

type CoverProps = {
	coverDurationInSeconds: number
	title?: string
	author?: string
	isSplit?: boolean
	coverOnly?: boolean
}

export default function Cover({ coverDurationInSeconds, title, author, isSplit = true, coverOnly = false }: CoverProps) {
	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()
	const processedTitle = title?.endsWith('。') ? title.slice(0, -1) : title

	const CoverContent = () => {
		const subtitleOpacity = interpolate(frame, [0, 20], [0, 1], {
			extrapolateRight: 'clamp',
		})
		const subtitleY = interpolate(frame, [0, 20], [20, 0], {
			extrapolateRight: 'clamp',
		})

		const titleScale = spring({
			frame,
			from: 0.8,
			to: 1,
			fps,
			config: {
				damping: 100,
				stiffness: 200,
				mass: 0.5,
			},
		})

		const titleOpacity = interpolate(frame, [0, 15], [0, 1], {
			extrapolateRight: 'clamp',
		})

		const decorationScale = spring({
			frame: frame - 5,
			from: 0,
			to: 1,
			fps,
			config: {
				damping: 80,
				stiffness: 150,
				mass: 0.8,
			},
		})

		// Additional animations for enhanced visual appeal
		const backgroundShift = interpolate(
			frame,
			[0, 120],
			[0, 10],
			{ extrapolateRight: 'clamp' }
		)

		const accentOpacity = spring({
			frame: frame - 10,
			from: 0,
			to: 0.85,
			fps,
			config: {
				damping: 100,
				stiffness: 140,
				mass: 0.6,
			},
		})

		return (
			<AbsoluteFill className="bg-gradient-to-br from-[#f8f9fa] via-[#f1f3f5] to-[#e9ecef] overflow-hidden">
				{/* Modern background with subtle animation */}
				<div 
					className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.6)_20%,rgba(255,255,255,0)_80%)]"
					style={{
						transform: `translateX(${backgroundShift}px)`,
					}}
				/>
				
				{/* Decorative elements */}
				<div
					className="absolute top-10 right-10 w-40 h-40 rounded-full bg-gradient-to-br from-[#ff8a8a] to-[#ff5757] blur-xl opacity-20"
					style={{
						transform: `scale(${decorationScale})`,
					}}
				/>
				<div
					className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-gradient-to-br from-[#6e6e6e] to-[#3d3d3d] blur-xl opacity-10"
					style={{
						transform: `scale(${decorationScale})`,
					}}
				/>
				<div
					className="absolute top-1/2 -right-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#ffcece] to-[#ff9e9e] blur-xl opacity-20"
					style={{
						transform: `scale(${decorationScale * 0.8}) translateY(-30%)`,
					}}
				/>

				{/* Subtle grid pattern for depth */}
				<div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(130,130,130,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(130,130,130,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />

				<div className="w-full h-full flex justify-center items-center p-20">
					<div className="relative w-[85%] max-w-6xl">
						{/* Accent line */}
						<div 
							className="absolute -left-6 top-0 w-1 h-32 bg-gradient-to-b from-[#ff5757] to-transparent rounded-full"
							style={{
								opacity: accentOpacity,
							}}
						/>

						<div className="relative">
							<div
								style={{
									opacity: titleOpacity,
									transform: `scale(${titleScale})`,
								}}
								className="text-7xl font-bold tracking-tight"
							>
								<span className="bg-gradient-to-r from-[#1a1a1a] to-[#4a4a4a] bg-clip-text text-transparent drop-shadow-sm">外网真实评论</span>
								<div className="absolute -left-3 -bottom-2 w-16 h-1 bg-gradient-to-r from-[#ff5757] to-transparent rounded-full" 
									style={{ opacity: accentOpacity }}
								/>
							</div>
						</div>

						<div
							style={{
								opacity: subtitleOpacity,
								transform: `translateY(${subtitleY}px)`,
							}}
							className="text-4xl mt-8 font-medium text-gray-500 flex items-center"
						>
							<span className="text-sm mr-3 text-gray-400">by</span>
							<span className="bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">@{author}</span>
						</div>

						<div
							className="mt-24"
							style={{
								opacity: interpolate(frame, [15, 35], [0, 1], {
									extrapolateRight: 'clamp',
								}),
								transform: `translateY(${interpolate(frame, [15, 35], [30, 0], {
									extrapolateRight: 'clamp',
								})}px)`,
							}}
						>
							<div className="relative">
								<div className="text-[6.5rem] font-bold leading-[1.1] bg-gradient-to-r from-[#ff3a3a] via-[#ff5757] to-[#ff7676] bg-clip-text text-transparent drop-shadow-lg">
									{processedTitle}
								</div>
								
								{/* Decorative elements around the title */}
								<div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-gradient-to-br from-[#ffcece] to-[#ff9e9e] opacity-30 -z-10 blur-sm" />
								<div className="absolute -left-6 bottom-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#ff8a8a] to-[#ff5757] opacity-20 -z-10 blur-sm" />
								
								{/* Subtle underline effect */}
								<div 
									className="absolute -bottom-4 left-0 h-1 bg-gradient-to-r from-[#ff5757] to-transparent rounded-full" 
									style={{ 
										width: '40%',
										opacity: accentOpacity,
									}}
								/>
							</div>
						</div>
					</div>
				</div>
			</AbsoluteFill>
		)
	}

	if (coverOnly) {
		return <CoverContent />
	}

	return (
		<Sequence from={0} durationInFrames={coverDurationInSeconds * fps}>
			<CoverContent />
		</Sequence>
	)
}
