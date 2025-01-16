import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion'

type CoverProps = {
	coverDurationInSeconds: number
	title?: string
	author?: string
	isSplit?: boolean
	coverOnly?: boolean
}

export default function Cover({ coverDurationInSeconds, title, author, isSplit = true, coverOnly = false }: CoverProps) {
	const { fps } = useVideoConfig()
	const processedTitle = title?.endsWith('。') ? title.slice(0, -1) : title

	const CoverContent = () => (
		<AbsoluteFill className="bg-gradient-to-br from-[#fdfbfb] to-[#fff1f1]">
			<div className="w-full h-full flex justify-center items-center p-16">
				<div className="relative w-[75%]">
					<div className="text-7xl font-bold tracking-tight bg-gradient-to-r from-[#2c2c2c] to-[#4a4a4a] bg-clip-text text-transparent drop-shadow-sm">外网评论</div>
					<div className="text-4xl mt-6 font-medium text-gray-500">@{author}</div>
					<div className="mt-16">
						<div className="text-[6.5rem] font-bold leading-[1.15] bg-gradient-to-r from-[#ee3f4d] to-[#ff6b6b] bg-clip-text text-transparent drop-shadow-sm">{processedTitle}</div>
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
