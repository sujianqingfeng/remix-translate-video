import { Composition } from 'remotion'
import TranslateVideos from './TranslateVideos'

export function RemotionRoot() {
	return (
		<>
			<Composition
				id="TranslateVideos"
				component={TranslateVideos}
				durationInFrames={60 * 20}
				fps={60}
				width={1920}
				height={1080}
				defaultProps={{
					transcripts: [],
					playVideoFileName: '',
				}}
			/>
		</>
	)
}
