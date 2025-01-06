import { Composition } from 'remotion'
import Phrases from './Phrases'

export function RemotionRoot() {
	return (
		<>
			<Composition
				id="Phrases"
				component={Phrases}
				durationInFrames={60 * 20}
				fps={60}
				width={1080}
				height={1920}
				defaultProps={{
					title: 'Phrases',
					phrases: [],
				}}
			/>
		</>
	)
}
