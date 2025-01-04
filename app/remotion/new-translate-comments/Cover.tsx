import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion'

function removeTrailingDot(title?: string) {
	if (!title) return ''
	return title.endsWith('。') ? title.slice(0, -1) : title
}

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

	const splitTitle = (title?: string) => {
		if (!title) return []
		const processedTitle = title.endsWith('.') ? title.slice(0, -1) : title
		if (!isSplit) return [processedTitle]

		const segments: string[] = []
		let currentSegment = ''

		for (const char of processedTitle) {
			currentSegment += char
			if (currentSegment.length >= 10) {
				segments.push(currentSegment)
				currentSegment = ''
			}
		}

		if (currentSegment) {
			segments.push(currentSegment)
		}

		return segments
	}

	const titleLines = splitTitle(removeTrailingDot(title))
	const authorAnimation = spring({
		frame: frame - 15,
		fps,
		config: {
			damping: 12,
		},
	})

	const CoverContent = () => (
		<AbsoluteFill className="bg-gradient-to-br from-[#fdfbfb] to-[#fff1f1]">
			<div className="w-full h-full flex justify-center items-center p-16">
				<div className="relative w-[75%]">
					<div
						className="text-7xl font-bold tracking-tight"
						style={{
							background: 'linear-gradient(135deg, #2c2c2c, #4a4a4a)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							textShadow: '1px 1px 2px rgba(0,0,0,0.05)',
						}}
					>
						外网评论
					</div>
					<div
						className="text-4xl mt-6 font-medium text-gray-500"
						style={{
							transform: `translateY(${(1 - authorAnimation) * 20}px)`,
							opacity: authorAnimation,
							letterSpacing: '0.02em',
						}}
					>
						@{author}
					</div>
					<div className="mt-16">
						{titleLines?.map((line, index) => {
							const springAnimation = spring({
								frame: frame - 25 - index * 5,
								fps,
								config: { damping: 12 },
							})
							return (
								<div
									className="text-[6.5rem] font-bold leading-[1.15]"
									style={{
										background: 'linear-gradient(135deg, #ee3f4d, #ff6b6b)',
										WebkitBackgroundClip: 'text',
										WebkitTextFillColor: 'transparent',
										textShadow: '1px 1px 2px rgba(0,0,0,0.05)',
										transform: `translateX(${(1 - springAnimation) * 50}px)`,
										opacity: springAnimation,
									}}
									key={line}
								>
									{line}
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</AbsoluteFill>
	)

	if (coverOnly) {
		return <CoverContent />
	}

	return (
		<Sequence from={0} durationInFrames={coverDurationInSeconds * fps}>
			<CoverContent />
		</Sequence>
	)
}
