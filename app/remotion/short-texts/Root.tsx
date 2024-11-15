import { Composition } from 'remotion'
import { ShortTexts } from './ShortTexts'

export function RemotionRoot() {
	const fps = 60
	return (
		<>
			<Composition
				id="ShortTexts"
				component={ShortTexts}
				durationInFrames={60 * 20}
				fps={fps}
				width={1280}
				height={720}
				defaultProps={{
					title: '',
					titleZh: '',
					playAudioName: '',
					audioDuration: 1,
					wordTranscripts: [],
					littleDifficultWords: [],
					sentenceTranscript: [],
					shortTextZh: '',
				}}
			/>
		</>
	)
}
