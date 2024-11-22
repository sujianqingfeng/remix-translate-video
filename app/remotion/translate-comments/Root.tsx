import { Composition } from 'remotion'
import PortraitTranslateComment from './PortraitTranslateComment'
import TranslateComment from './TranslateComment'
import VerticalTranslateComment from './VerticalTranslateComment'

export function RemotionRoot() {
	return (
		<>
			<Composition
				id="TranslateComment"
				component={TranslateComment}
				durationInFrames={60 * 20}
				fps={60}
				width={1920}
				height={1080}
				defaultProps={{
					comments: [],
					title: '',
					videoSrc: '',
					viewCount: 0,
					coverDuration: 60 * 20,
				}}
			/>

			<Composition
				id="PortraitTranslateComment"
				component={PortraitTranslateComment}
				durationInFrames={60 * 20}
				fps={60}
				width={1920}
				height={1080}
				defaultProps={{
					comments: [],
					title: '',
					videoSrc: '',
					viewCount: 0,
					coverDuration: 60 * 20,
				}}
			/>

			<Composition
				id="VerticalTranslateComment"
				component={VerticalTranslateComment}
				durationInFrames={60 * 20}
				fps={60}
				width={1920}
				height={1080}
				defaultProps={{
					comments: [],
					title: '',
					videoSrc: '',
					viewCount: 0,
					coverDuration: 60 * 20,
				}}
			/>
		</>
	)
}
