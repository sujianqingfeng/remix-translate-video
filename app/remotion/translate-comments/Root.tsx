import { Composition } from 'remotion'
import { TranslateCommentVideo } from './TranslateCommentVideo'

export function RemotionRoot() {
	return (
		<>
			<Composition
				id="TranslateCommentVideo"
				component={TranslateCommentVideo}
				durationInFrames={30 * 20}
				fps={30}
				width={1280}
				height={720}
				defaultProps={{
					comments: [],
					title: '',
					videoSrc: '',
				}}
			/>
		</>
	)
}
