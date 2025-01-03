import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'

import type { Dialogue as RemotionDialogue } from '~/types'

type DialogueProps = {
	dialogues: RemotionDialogue[]
}

const DIALOGUE_DURATION = 360 // 6 seconds at 60fps

export default function Dialogue({ dialogues }: DialogueProps) {
	const { fps } = useVideoConfig()
	const frame = useCurrentFrame()

	return (
		<AbsoluteFill>
			{dialogues.map((dialogue, index) => {
				const startFrame = index * DIALOGUE_DURATION
				const isRole1 = dialogue.roleLabel === 1

				return (
					<Sequence key={`${dialogue.roleLabel}-${dialogue.content}-${index}`} from={startFrame} durationInFrames={DIALOGUE_DURATION}>
						<div className="absolute inset-0 flex flex-col justify-between p-10">
							<div className={`max-w-[60%] bg-white/90 p-5 rounded-2xl shadow-lg ${isRole1 ? 'self-start mt-0 mb-auto' : 'self-end mb-0 mt-auto'}`}>
								<p className="m-0 text-2xl text-black">{dialogue.content}</p>
								<p className="mt-2 text-lg text-gray-600">{dialogue.contentZh}</p>
							</div>
						</div>
						{dialogue.audioFilePath && <Audio src={staticFile(dialogue.audioFilePath)} />}
					</Sequence>
				)
			})}
		</AbsoluteFill>
	)
}
