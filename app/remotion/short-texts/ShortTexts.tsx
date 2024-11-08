// https://huggingface.co/spaces/innoai/Edge-TTS-Text-to-Speech

import {
	AbsoluteFill,
	Audio,
	Img,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion'
import type { ShortTextInputItem } from '~/types'

import { loadFont } from '@remotion/google-fonts/SourceCodePro'

export function ShortTexts({
	texts,
	littleDifficultWords,
}: {
	texts: ShortTextInputItem[]
	littleDifficultWords: string[]
}) {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()
	const currentTime = frame / fps
	const BUFFER_TIME = 0.05

	const isHighlighted = (item: ShortTextInputItem) =>
		currentTime >= item.start - BUFFER_TIME &&
		currentTime < item.end + BUFFER_TIME

	const isDifficultWord = (text: string) => {
		const cleanText = text.toLowerCase().replace(/[.,!?;:'"()]/g, '')
		return littleDifficultWords.some((word) => cleanText === word.toLowerCase())
	}

	const { fontFamily } = loadFont()

	return (
		<AbsoluteFill>
			<Img src={staticFile('audio.png')} />
			<div
				className="absolute top-0 right-0 bottom-0 left-0 h-full flex flex-col justify-center items-center gap-4 p-4"
				style={{ fontFamily }}
			>
				<div className="text-[40px] font-bold">
					My Daily Life
					<span className="text-[20px]">(我的日常生活)</span>
				</div>
				<div className="text-2xl text-[#333333] leading-[1.5]">
					{texts.map((item) => (
						<span
							key={item.start}
							className="px-1 mx-0.5 rounded-md inline-block transition-all duration-300"
							style={{
								backgroundColor: isHighlighted(item)
									? '#FFFFCC'
									: 'transparent',
								transform: isHighlighted(item) ? 'scale(1.1)' : 'scale(1)',
								boxShadow: isHighlighted(item)
									? '0 2px 8px rgba(0,0,0,0.2)'
									: 'none',
								color: isDifficultWord(item.text) ? '#F87171' : 'inherit',
							}}
						>
							{item.text}
						</span>
					))}
				</div>

				<Audio src={staticFile('audio.mp3')} />
			</div>
		</AbsoluteFill>
	)
}
