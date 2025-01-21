import { Img, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'

interface ContentProps {
	content?: string
	contentZh?: string
	images?: string[]
	fps: number
}

export const Content: React.FC<ContentProps> = ({ content, contentZh, images, fps }) => {
	const frame = useCurrentFrame()

	const contentOpacity = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		durationInFrames: 30,
	})

	const contentZhOpacity = spring({
		frame: frame - 15,
		fps,
		from: 0,
		to: 1,
		durationInFrames: 30,
	})

	const imageOpacity = spring({
		frame: frame - 30,
		fps,
		from: 0,
		to: 1,
		durationInFrames: 30,
	})

	return (
		<div className="h-full flex flex-col">
			{/* Text Content */}
			<div className="mb-8">
				{content && (
					<div
						className="space-y-2"
						style={{
							opacity: contentOpacity,
						}}
					>
						<h3 className="text-sm font-medium text-blue-600 tracking-wide uppercase">Original</h3>
						<p className="text-xl text-gray-700 leading-relaxed">{content}</p>
					</div>
				)}

				{contentZh && (
					<div
						className="space-y-3 mt-8"
						style={{
							opacity: contentZhOpacity,
						}}
					>
						<h3 className="text-sm font-medium text-emerald-600 tracking-wide uppercase">Translation</h3>
						<p className="text-[2.5rem] text-gray-900 leading-normal font-medium tracking-normal">{contentZh}</p>
					</div>
				)}
			</div>

			{/* Images */}
			{images && images.length > 0 && (
				<div className="flex-1 flex items-center">
					<div
						className="w-full grid grid-cols-2 gap-6"
						style={{
							opacity: imageOpacity,
						}}
					>
						{images.map((image) => (
							<div key={image} className="aspect-[4/3] rounded-2xl shadow-lg overflow-hidden">
								<Img src={staticFile(image)} alt="" className="w-full h-full object-cover" />
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	)
}
