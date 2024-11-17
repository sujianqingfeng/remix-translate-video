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
	direction,
}: {
	wordTranscripts: WordTranscript[]
	sentenceTranscript: SentenceTranscript[]
	littleDifficultWords: string[]
	playAudioName: string
	title: string
	titleZh: string
	audioDuration: number
	shortTextZh: string
	direction: number
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
						className={`flex w-full h-full ${direction ? 'flex-row' : 'flex-col'}`}
					>
						<div
							className={`${direction ? 'w-[400px] relative' : 'h-[400px] relative'}`}
						>
							<Img
								className={`${direction ? 'h-full' : 'h-full w-full'} object-cover`}
								src={staticFile('short-text-cover.png')}
							/>
							{direction ? (
								<div
									className="absolute top-0 right-0 h-full w-[200px]"
									style={{
										background:
											'linear-gradient(to right, transparent, #EAE0CD)',
									}}
								/>
							) : (
								<div
									className="absolute bottom-0 left-0 w-full h-[100px]"
									style={{
										background:
											'linear-gradient(to bottom, transparent, #EFEADB)',
									}}
								/>
							)}
						</div>

						<div className="flex-1 flex flex-col justify-center items-center">
							<div
								className="flex-1 flex flex-col justify-center items-center gap-4 pl-12 pr-8"
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
												color: isDifficultWord(item.part)
													? '#ee3f4d'
													: 'inherit',
											}}
										>
											{item.part}
										</span>
									))}
								</div>
							</div>

							<div className="h-[160px] text-[#333333] leading-[1.5] ">
								{currentSentence && (
									<div className="bg-[#f2ce2b] px-2 py-1 rounded-md">
										<div className="text-center text-2xl">
											{currentSentence.part}
										</div>
										<div className="text-center text-3xl">
											{currentSentence.partZh}
										</div>
									</div>
								)}
							</div>
						</div>
					</div>

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
