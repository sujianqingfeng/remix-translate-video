// https://huggingface.co/spaces/innoai/Edge-TTS-Text-to-Speech

import { AbsoluteFill, useCurrentFrame, useVideoConfig } from 'remotion'
import type { ShortTextInputItem } from '~/types'

export function ShortTexts({ texts }: { texts: ShortTextInputItem[] }) {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()
	const currentTime = frame / fps

	return (
		<AbsoluteFill>
			<div>
				{texts.map((item) => (
					<span
						key={`${item.text}-${item.start}`}
						style={{
							backgroundColor:
								currentTime >= item.start && currentTime < item.end
									? 'yellow'
									: 'transparent',
							padding: '0 4px',
							borderRadius: '4px',
							transition: 'background-color 0.3s',
						}}
					>
						{item.text}{' '}
					</span>
				))}
			</div>
		</AbsoluteFill>
	)
}
