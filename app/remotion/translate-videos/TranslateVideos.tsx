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

// 二分查找获取当前字幕
function findCurrentTranscript(
	transcripts: YoutubeTranscript[],
	currentTime: number,
): YoutubeTranscript | undefined {
	let left = 0
	let right = transcripts.length - 1

	while (left <= right) {
		const mid = Math.floor((left + right) / 2)
		const transcript = transcripts[mid]
		const start = transcript.offset
		const end = transcript.offset + transcript.duration

		if (currentTime >= start && currentTime <= end) {
			return transcript
		}

		if (currentTime < start) {
			right = mid - 1
		} else {
			left = mid + 1
		}
	}

	return undefined
}

export default function TranslateVideos({
	playVideoFileName,
	transcripts,
}: TranslateVideosProps) {
	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()

	// 使用 useMemo 缓存计算结果
	const currentTranscript = useMemo(() => {
		const currentTime = frame / fps
		return findCurrentTranscript(transcripts, currentTime)
	}, [frame, fps, transcripts])

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
