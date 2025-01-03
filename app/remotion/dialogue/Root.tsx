import { Composition } from 'remotion'
import Dialogue from './Dialogue'

export function RemotionRoot() {
	return (
		<>
			<Composition
				id="Dialogue"
				component={Dialogue}
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
