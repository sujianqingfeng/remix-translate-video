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

		return (
			<AbsoluteFill className="bg-gradient-to-br from-[#fdfbfb] via-[#fcf5f5] to-[#fff1f1]">
				<div
					className="absolute top-12 right-12 w-32 h-32 rounded-full bg-gradient-to-br from-red-100 to-red-200 opacity-60"
					style={{
						transform: `scale(${decorationScale})`,
					}}
				/>
				<div
					className="absolute bottom-16 left-16 w-48 h-48 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 opacity-40"
					style={{
						transform: `scale(${decorationScale})`,
					}}
				/>

				<div className="w-full h-full flex justify-center items-center p-20">
					<div className="relative w-[80%] max-w-6xl">
						<div className="relative">
							<div
								style={{
									opacity: titleOpacity,
									transform: `scale(${titleScale})`,
								}}
								className="text-7xl font-bold tracking-tight"
							>
								<span className="bg-gradient-to-r from-[#2c2c2c] to-[#4a4a4a] bg-clip-text text-transparent drop-shadow-sm">外网评论</span>
							</div>
						</div>

						<div
							style={{
								opacity: subtitleOpacity,
								transform: `translateY(${subtitleY}px)`,
							}}
							className="text-4xl mt-8 font-medium text-gray-500 flex items-center"
						>
							<span className="text-sm mr-3">by</span>
							<span className="bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">@{author}</span>
						</div>

						<div
							className="mt-20"
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
								<div className="text-[6rem] font-bold leading-[1.2] bg-gradient-to-r from-[#ee3f4d] to-[#ff6b6b] bg-clip-text text-transparent drop-shadow-lg">
									{processedTitle}
								</div>
								<div className="absolute -right-6 -top-6 w-20 h-20 rounded-full bg-gradient-to-br from-red-100 to-red-200 opacity-40 -z-10" />
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
