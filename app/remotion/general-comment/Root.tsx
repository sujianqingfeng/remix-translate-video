import { Composition } from 'remotion'
import { LandscapeGeneralComment } from './LandscapeGeneralComment'
import { PortraitGeneralComment } from './PortraitGeneralComment'
import { VerticalGeneralComment } from './VerticalGeneralComment'
import type { GeneralCommentProps } from './types'

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="LandscapeGeneralComment"
				component={LandscapeGeneralComment}
				durationInFrames={300}
				fps={30}
				width={1920}
				height={1080}
				defaultProps={{} as GeneralCommentProps}
			/>
			<Composition
				id="PortraitGeneralComment"
				component={PortraitGeneralComment}
				durationInFrames={300}
				fps={30}
				width={1080}
				height={1920}
				defaultProps={{} as GeneralCommentProps}
			/>
			<Composition
				id="VerticalGeneralComment"
				component={VerticalGeneralComment}
				durationInFrames={300}
				fps={30}
				width={1080}
				height={1350}
				defaultProps={{} as GeneralCommentProps}
			/>
		</>
	)
}
