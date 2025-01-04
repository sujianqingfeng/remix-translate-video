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
	const splitTitle = (title?: string) => {
		if (!title) return []
		if (!isSplit) return [title]

		const segments: string[] = []
		let currentSegment = ''

		for (const char of title) {
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

	const titleLines = splitTitle(title)

	const CoverContent = () => (
		<AbsoluteFill>
			<div className="w-full h-full flex justify-center items-center">
				<div className="text-left leading-[1.2] w-[50%]">
					<div className="text-5xl">外网评论</div>
					<div className="text-4xl mt-2">@{author}</div>

					{titleLines?.map((line) => (
						<div className="text-[6rem] text-[#ee3f4d]" key={line}>
							{line}
						</div>
					))}
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
