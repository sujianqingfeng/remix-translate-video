import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import type { RemotionDialogue } from '~/types'

type DialogueProps = {
	dialogues: RemotionDialogue[]
}

export default function Dialogue({ dialogues }: DialogueProps) {
	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()

	// Calculate duration based on fps (6 seconds * fps)
	const DIALOGUE_DURATION = 6 * fps

	return (
		<AbsoluteFill>
			<div className="bg-gradient-to-br from-blue-50 to-purple-50 h-full w-full">
				{dialogues.map((dialogue, index) => {
					const startFrame = index * DIALOGUE_DURATION
					const isRole1 = dialogue.roleLabel === 1

					return (
						<Sequence key={`${dialogue.roleLabel}-${dialogue.content}-${index}`} from={startFrame} durationInFrames={DIALOGUE_DURATION}>
							<div className="absolute inset-0 flex flex-col justify-between px-32 py-40">
								<div
									className={`
									max-w-[70%] 
									${isRole1 ? 'self-start ml-16 mt-16 mb-auto bg-blue-500 text-white' : 'self-end mr-16 mb-16 mt-auto bg-white'}
									p-8
									rounded-3xl 
									shadow-xl
									border border-opacity-10 border-black
									backdrop-blur-sm
									transition-all
									transform
								`}
								>
									<p className={`m-0 text-4xl font-medium leading-relaxed ${isRole1 ? 'text-white' : 'text-gray-800'}`}>{dialogue.content}</p>
									<p className={`mt-4 text-2xl ${isRole1 ? 'text-blue-100' : 'text-gray-600'}`}>{dialogue.contentZh}</p>
								</div>
							</div>
							{dialogue.publicAudioPath && <Audio src={staticFile(dialogue.publicAudioPath)} />}
						</Sequence>
					)
				})}
			</div>
		</AbsoluteFill>
	)
}
