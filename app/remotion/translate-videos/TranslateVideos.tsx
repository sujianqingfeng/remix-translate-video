import {
	AbsoluteFill,
	Video,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion'
import type { Transcript } from '~/types'

type TranslateVideosProps = {
	playVideoFileName: string
	transcripts: Transcript[]
}

export default function TranslateVideos({
	playVideoFileName,
	transcripts,
}: TranslateVideosProps) {
	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()

	const currentTime = frame / fps

	const currentTranscript = transcripts.find((item) => {
		return currentTime >= item.start && currentTime <= item.end
	})

	return (
		<AbsoluteFill>
			<AbsoluteFill>
				<Video
					loop
					className="object-contain h-full"
					startFrom={0}
					crossOrigin="anonymous"
					src={staticFile(playVideoFileName)}
				/>
			</AbsoluteFill>

			<AbsoluteFill>
				{currentTranscript && (
					<div className="absolute bottom-[160px] left-[50%] -translate-x-1/2 w-[96%] text-white leading-[1.5]">
						<div className="text-center text-4xl">{currentTranscript.text}</div>
						<div className="text-center text-5xl">
							{currentTranscript.textInterpretation}
						</div>
					</div>
				)}
			</AbsoluteFill>
		</AbsoluteFill>
	)
}
