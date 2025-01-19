import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

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

	const imageScale = spring({
		frame: frame - 30,
		fps,
		from: 0.8,
		to: 1,
		durationInFrames: 45,
	})

	const imageOpacity = interpolate(frame - 30, [0, 30], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	})

	return (
		<AbsoluteFill className="bg-gray-100 flex items-center justify-center p-20">
			<div className="text-center space-y-8">
				<h1
					className="text-6xl font-bold text-gray-900"
					style={{
						opacity: titleOpacity,
					}}
				>
					{title || 'Untitled'}
				</h1>
				<p
					className="text-2xl text-gray-600"
					style={{
						opacity: authorOpacity,
					}}
				>
					By {author}
				</p>

				{images && images.length > 0 && (
					<div
						className="flex gap-4 justify-center mt-8"
						style={{
							opacity: imageOpacity,
							transform: `scale(${imageScale})`,
						}}
					>
						{images.map((image) => (
							<img key={image} src={image} alt="" className="w-40 h-40 object-cover rounded-lg shadow-lg" />
						))}
					</div>
				)}
			</div>
		</AbsoluteFill>
	)
}
