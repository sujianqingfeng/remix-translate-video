import { AbsoluteFill, Audio, Img, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import type { RemotionFillInBlankSentence } from '~/types'

type FillInBlankProps = {
	sentences: RemotionFillInBlankSentence[]
}

export default function FillInBlank({ sentences }: FillInBlankProps) {
	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()

	const QUESTION_DURATION = 3 * fps // 3 seconds for question
	const ANSWER_DURATION = 3 * fps // 3 seconds for answer + audio

	const getCurrentSentenceIndex = () => {
		const totalDuration = QUESTION_DURATION + ANSWER_DURATION
		return Math.floor(frame / totalDuration)
	}

	const currentIndex = getCurrentSentenceIndex()
	const currentSentence = sentences[currentIndex]

	const renderEnglishSentence = (sentence: string, word: string, pronunciation: string, showAnswer: boolean) => {
		const parts = sentence.split(word)
		return (
			<div className="text-5xl text-center">
				{parts[0]}
				<div className="relative inline-block">
					<div className="h-[6rem]">
						<div className="relative">
							{showAnswer ? (
								<>
									<span className="text-red-500">{word}</span>
									<div className="absolute w-full text-center top-10">
										<span className="text-gray-500 text-2xl">{pronunciation}</span>
									</div>
								</>
							) : (
								<>
									<span className="invisible">{word}</span>
									<div className="absolute inset-x-0 bottom-0 border-b-4 border-black" />
									<div className="absolute inset-0 flex items-center justify-center">
										<span className="text-blue-500 font-bold">{Math.ceil((QUESTION_DURATION - (frame % (QUESTION_DURATION + ANSWER_DURATION))) / fps)}</span>
									</div>
									<div className="absolute w-full text-center top-10">
										<span className="text-gray-500 text-2xl opacity-0">{pronunciation}</span>
									</div>
								</>
							)}
						</div>
					</div>
				</div>
				{parts[1]}
			</div>
		)
	}

	const renderChineseSentence = (sentence: string, word: string) => {
		const parts = sentence.split(word)
		return (
			<div className="text-5xl text-center">
				{parts[0]}
				<span className="text-red-500">{word}</span>
				{parts[1]}
			</div>
		)
	}

	if (!currentSentence) return null

	const startFrame = currentIndex * (QUESTION_DURATION + ANSWER_DURATION)
	const currentSequenceFrame = frame - startFrame

	return (
		<AbsoluteFill className="bg-white">
			<Sequence from={startFrame} durationInFrames={QUESTION_DURATION + ANSWER_DURATION}>
				<div className="w-full flex flex-col items-center justify-center gap-12">
					{currentSentence.publicCoverPath && (
						<div className="w-full flex justify-center">
							<Img src={staticFile(currentSentence.publicCoverPath)} className="h-[400px] object-cover rounded-lg shadow-lg" />
						</div>
					)}
					{renderEnglishSentence(currentSentence.sentence, currentSentence.word, currentSentence.wordPronunciation, currentSequenceFrame >= QUESTION_DURATION)}
					{renderChineseSentence(currentSentence.sentenceZh, currentSentence.wordZh)}
				</div>
			</Sequence>
			{currentSentence.publicAudioPath && (
				<Sequence from={startFrame + QUESTION_DURATION} durationInFrames={ANSWER_DURATION}>
					<Audio src={staticFile(currentSentence.publicAudioPath)} />
				</Sequence>
			)}
		</AbsoluteFill>
	)
}
