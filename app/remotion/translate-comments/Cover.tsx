import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion'

type CoverProps = {
	coverDuration: number
	title?: string
	author?: string
	isSplit?: boolean
}

export default function Cover({ coverDuration, title, author, isSplit }: CoverProps) {
	const { fps } = useVideoConfig()

	const titleLines = isSplit ? title?.split(/[|。，]/) : [title]

	return (
		<Sequence from={0} durationInFrames={coverDuration * fps}>
			<AbsoluteFill>
				<div className="w-full h-full flex justify-center items-center">
					<div className="text-right leading-[1.2] w-[65%]">
						<div className="text-6xl">外网评论</div>
						<div className="text-5xl">@{author}</div>

						{titleLines?.map((line) => (
							<div className="text-[6rem] text-[#ee3f4d]" key={line}>
								{line}
							</div>
						))}
					</div>
				</div>
			</AbsoluteFill>
		</Sequence>
	)
}
