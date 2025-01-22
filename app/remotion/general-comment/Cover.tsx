import { AbsoluteFill, Img, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion'

interface CoverProps {
	title?: string
	author: string
}

export const Cover: React.FC<CoverProps> = ({ title, author }) => {
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
			</div>
		</AbsoluteFill>
	)
}
