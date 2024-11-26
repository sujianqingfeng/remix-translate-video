import { AbsoluteFill, Sequence, useVideoConfig } from 'remotion'

type CoverProps = {
	coverDuration: number
	title?: string
	author?: string
}

export default function Cover({ coverDuration, title, author }: CoverProps) {
	const { fps } = useVideoConfig()

	const titleLines = title?.split(/[|。，]/)

	return (
		<Sequence from={0} durationInFrames={coverDuration * fps}>
			<AbsoluteFill>
				<div className="w-full h-full flex justify-center items-center">
					<div className="text-right leading-[1.2] w-[60%]">
						<div className="text-6xl">外网评论</div>
						<div className="text-5xl">@{author}</div>

						{titleLines?.map((line, index) => (
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
