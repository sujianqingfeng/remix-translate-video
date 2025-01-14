import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import type { SentenceTranscript, WordTranscript } from '~/types'

import { loadFont } from '@remotion/google-fonts/SourceCodePro'
import Cover from './Cover'

export function ShortTexts({
	wordTranscripts,
	littleDifficultWords,
	playAudioFile,
	title,
	titleZh,
	audioDuration,
	sentenceTranscript,
	direction,
	shortTextBgFile,
	shortTextCoverFile,
	isRemoteRender = false,
	shortTextZh,
}: {
	wordTranscripts: WordTranscript[]
	sentenceTranscript: SentenceTranscript[]
	littleDifficultWords: string[]
	playAudioFile: string
	shortTextBgFile: string
	shortTextCoverFile: string
	title: string
	titleZh: string
	audioDuration: number
	shortTextZh: string
	direction: number
	isRemoteRender?: boolean
}) {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()
	const currentTime = (frame / fps) * 1000
	const BUFFER_TIME = 0.05

	const isHighlighted = (item: WordTranscript) => currentTime >= item.start - BUFFER_TIME && currentTime < item.end + BUFFER_TIME

	const isDifficultWord = (text: string) => {
		const cleanText = text
			.trim()
			.toLowerCase()
			.replace(/[.,!?;:'"()]/g, '')
		return littleDifficultWords.some((word) => cleanText === word.toLowerCase())
	}

	const currentSentence = sentenceTranscript.find((item, index) => {
		const isCurrentSentence = currentTime >= item.start && currentTime < item.end
		if (isCurrentSentence) {
			const sentences = shortTextZh.split(/[。！？]/)
			item.partZh = sentences[index]?.trim()
		}
		return isCurrentSentence
	})

	const { fontFamily } = loadFont()

	const coverFileName = isRemoteRender ? shortTextCoverFile : staticFile(shortTextCoverFile)

	return (
		<AbsoluteFill>
			<AbsoluteFill>
				<Img className="h-full w-full object-cover" src={isRemoteRender ? shortTextBgFile : staticFile(shortTextBgFile)} />
				<Audio src={isRemoteRender ? playAudioFile : staticFile(playAudioFile)} />
			</AbsoluteFill>
			<AbsoluteFill>
				<Sequence from={0} durationInFrames={audioDuration}>
					<div className={`flex w-full h-full ${direction ? 'flex-row' : 'flex-col'}`}>
						<Cover direction={direction} coverFileName={coverFileName} />

						<div className="flex-1 flex flex-col items-center px-[6rem]">
							<div className="flex-1 flex flex-col items-center pt-[5rem]" style={{ fontFamily }}>
								<div className="text-5xl font-bold leading-1.2">{title}</div>
								<div className="text-5xl font-bold leading-1.2 mt-6">{titleZh}</div>
								<div className="text-[40px] text-black leading-[1.8] mt-10">
									{wordTranscripts.map((item) => (
										<span
											key={item.start}
											className="px-1 mx-0.5 rounded-md inline-block transition-all duration-300"
											style={{
												backgroundColor: isHighlighted(item) ? '#f2ce2b' : 'transparent',
												color: isDifficultWord(item.part) ? '#ee3f4d' : 'inherit',
											}}
										>
											{item.part}
										</span>
									))}
								</div>
							</div>

							<div className="h-[400px] text-[#333333] px-4 leading-1.5 flex justify-center items-start">
								{currentSentence && (
									<div className="bg-[#f2ce2b] px-3 py-5 rounded-md">
										<div className="text-center text-4xl">{currentSentence.part}</div>
										<div className="text-center text-4xl">{currentSentence.partZh}</div>
									</div>
								)}
							</div>
						</div>
					</div>

					<div className="absolute top-8 right-8 text-3xl font-bold text-right text-white">参考释义在视频末尾</div>
				</Sequence>
			</AbsoluteFill>

			<AbsoluteFill>
				<Sequence from={audioDuration}>
					<div className={`flex ${direction ? 'flex-row' : 'flex-col'} gap-4 leading-2`}>
						<Cover direction={direction} coverFileName={coverFileName} />

						<div className="flex-1 p-[6rem] flex flex-col justify-start items-center">
							<div className="font-bold text-6xl">{titleZh}</div>
							<div className="text-[40px] leading-[1.8] mt-10"> {shortTextZh}</div>
						</div>
					</div>
				</Sequence>
			</AbsoluteFill>
		</AbsoluteFill>
	)
}
