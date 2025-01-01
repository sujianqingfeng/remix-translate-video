import { Composition } from 'remotion'
import FillInBlank from './FillInBlank'

export function RemotionRoot() {
	return (
		<>
			<Composition
				id="FillInBlank"
				component={FillInBlank}
				durationInFrames={60 * 20}
				fps={60}
				width={1920}
				height={1080}
				defaultProps={{
					sentences: [],
				}}
			/>
		</>
	)
}
