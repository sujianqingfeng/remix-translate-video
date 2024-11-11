import { Composition } from 'remotion'
import { TranslateCommentVideo } from './TranslateCommentVideo'

export function RemotionRoot() {
	return (
		<>
			<Composition
				id="TranslateCommentVideo"
				component={TranslateCommentVideo}
				durationInFrames={60 * 20}
				fps={60}
				width={1920}
				height={1080}
				defaultProps={{
					comments: [],
					title: '',
					videoSrc: '',
					dateTime: '',
					viewCount: 0,
				}}
			/>
		</>
	)
}
