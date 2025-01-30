import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

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

	const authorOpacity = spring({
		frame: frame - 15,
		fps,
		from: 0,
		to: 1,
		durationInFrames: 30,
	})

	const backgroundScale = spring({
		frame,
		fps,
		from: 1.2,
		to: 1,
		durationInFrames: 60,
		config: {
			damping: 100,
		},
	})

	return (
		<AbsoluteFill className="bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-20 relative overflow-hidden">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-5">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] bg-[length:40px_40px]" />
			</div>

			{/* Content Container */}
			<div
				className="relative z-10 max-w-4xl mx-auto text-center space-y-12 bg-white/80 backdrop-blur-sm p-16 rounded-3xl shadow-2xl"
				style={{
					transform: `scale(${backgroundScale})`,
				}}
			>
				<h1
					className="text-7xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent"
					style={{
						opacity: titleOpacity,
					}}
				>
					{title || 'Untitled'}
				</h1>
				<div
					className="flex items-center justify-center gap-4"
					style={{
						opacity: authorOpacity,
					}}
				>
					<div className="h-px w-12 bg-gray-300" />
					<p className="text-2xl text-gray-600 font-medium tracking-wide">By {author}</p>
					<div className="h-px w-12 bg-gray-300" />
				</div>
			</div>
		</AbsoluteFill>
	)
}
