import {
	AbsoluteFill,
	Audio,
	Img,
	Sequence,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion'
import type { SentenceTranscript, WordTranscript } from '~/types'

import { loadFont } from '@remotion/google-fonts/SourceCodePro'

export function ShortTexts({
	wordTranscripts,
	littleDifficultWords,
	playAudioName,
	title,
	titleZh,
	audioDuration,
	shortTextZh,
	sentenceTranscript,
}: {
	wordTranscripts: WordTranscript[]
	sentenceTranscript: SentenceTranscript[]
	littleDifficultWords: string[]
	playAudioName: string
	title: string
	titleZh: string
	audioDuration: number
	shortTextZh: string
}) {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()
	const currentTime = (frame / fps) * 1000
	const BUFFER_TIME = 0.05

	const isHighlighted = (item: WordTranscript) =>
		currentTime >= item.start - BUFFER_TIME &&
		currentTime < item.end + BUFFER_TIME

	const isDifficultWord = (text: string) => {
		const cleanText = text
			.trim()
			.toLowerCase()
			.replace(/[.,!?;:'"()]/g, '')
		return littleDifficultWords.some((word) => cleanText === word.toLowerCase())
	}

	const currentSentence = sentenceTranscript.find((item) => {
		return currentTime >= item.start && currentTime < item.end
	})

	const { fontFamily } = loadFont()

	return (
		<AbsoluteFill>
			<AbsoluteFill>
				<Img
					className="h-full w-full object-cover"
					src={staticFile('audio.png')}
				/>
				<Audio src={staticFile(playAudioName)} />
			</AbsoluteFill>
			<AbsoluteFill>
				<Sequence from={0} durationInFrames={audioDuration}>
					<div
						className="absolute top-0 right-0 left-0 h-[calc(100%-180px)] flex flex-col justify-center items-center gap-4 px-8"
						style={{ fontFamily }}
					>
						<div className="text-[40px] font-bold">{title}</div>
						<div className="text-[36px] text-[#333333] leading-[1.5]">
							{wordTranscripts.map((item) => (
								<span
									key={item.start}
									className="px-1 mx-0.5 rounded-md inline-block transition-all duration-300"
									style={{
										backgroundColor: isHighlighted(item)
											? '#f2ce2b'
											: 'transparent',
										color: isDifficultWord(item.part) ? '#ee3f4d' : 'inherit',
									}}
								>
									{item.part}
								</span>
							))}
						</div>
					</div>

					{currentSentence && (
						<div className="absolute bottom-[120px] left-[50%] -translate-x-1/2 w-[96%] text-[#333333] leading-[1.5] ">
							<div className="text-center text-xl">{currentSentence.part}</div>
							<div className="text-center text-2xl">
								{currentSentence.partZh}
							</div>
						</div>
					)}

					<div className="absolute top-4 right-4 font-bold text-right">
						参考释义在视频末尾
						<p className="text-[20px]">{titleZh}</p>
					</div>
				</Sequence>
			</AbsoluteFill>

			<AbsoluteFill>
				<Sequence from={audioDuration}>
					<div className="flex flex-col justify-center items-center gap-4 px-20 leading-2">
						<div className="font-bold text-[3rem]">{titleZh}</div>
						<div className="text-[2.5rem]"> {shortTextZh}</div>
					</div>
				</Sequence>
			</AbsoluteFill>
		</AbsoluteFill>
	)
}
