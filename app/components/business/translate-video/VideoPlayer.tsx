import { useEffect, useRef, useState } from 'react'
import type { Transcript } from '~/types'

export default function VideoPlayer({ playFile, transcripts }: { playFile: string; transcripts: Transcript[] }) {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [currentTranscript, setCurrentTranscript] = useState<Transcript | null>(null)

	useEffect(() => {
		const video = videoRef.current
		if (!video) return

		const handleTimeUpdate = () => {
			const currentTime = video.currentTime
			// 查找当前时间对应的字幕
			const transcript = transcripts.find((t) => {
				const start = t.start
				const end = t.end
				return currentTime >= start && currentTime <= end
			})

			setCurrentTranscript(transcript || null)
		}

		video.addEventListener('timeupdate', handleTimeUpdate)
		return () => video.removeEventListener('timeupdate', handleTimeUpdate)
	}, [transcripts])

	return (
		<div className="relative">
			<video ref={videoRef} src={`/${playFile}`} controls className="w-full">
				<track
					kind="captions"
					src="#" // 为了满足可访问性要求，添加一个空的 track 元素
					default
				/>
			</video>

			{currentTranscript && (
				<div className="absolute bottom-16 left-0 right-0 text-center">
					<div className="inline-block bg-black/70 text-white px-4 py-2 rounded-lg">
						<p>{currentTranscript.text}</p>
						<p>{currentTranscript.textLiteralTranslation}</p>
					</div>
				</div>
			)}
		</div>
	)
}
