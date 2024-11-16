import { useMemo } from 'react'
import {
	AbsoluteFill,
	Video,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion'
import type { YoutubeTranscript } from '~/types'

type TranslateVideosProps = {
	playVideoFileName: string
	transcripts: YoutubeTranscript[]
}

export default function TranslateVideos({
	playVideoFileName,
	transcripts,
}: TranslateVideosProps) {
	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()

	const currentTime = frame / fps

	const currentTranscript = transcripts.find((item) => {
		const [start, end] = item.timestamp
		return currentTime >= start && currentTime <= end
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
					<div
						className="absolute bottom-[160px] left-[50%] -translate-x-1/2 w-[96%] text-4xl text-white leading-[1.5]"
						style={{
							backgroundColor: 'rgba(0, 0, 0, 0.5)',
							padding: '10px',
							borderRadius: '8px',
						}}
					>
						<div className="text-center">{currentTranscript.text}</div>
					</div>
				)}
			</AbsoluteFill>
		</AbsoluteFill>
	)
}
