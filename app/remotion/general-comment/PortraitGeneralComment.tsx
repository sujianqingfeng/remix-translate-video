import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion'
import { Comments } from './Comments'
import { Content } from './Content'
import { Cover } from './Cover'
import type { GeneralCommentProps } from './types'

export const PortraitGeneralComment: React.FC<GeneralCommentProps> = ({
	title,
	content,
	contentZh,
	author,
	images,
	comments,
	fps,
	coverDurationInSeconds,
	secondsForEvery30Words,
}) => {
	const frame = useCurrentFrame()
	const { width, height } = useVideoConfig()

	const coverDurationInFrames = coverDurationInSeconds * fps
	const contentStartFrame = coverDurationInFrames

	return (
		<AbsoluteFill style={{ backgroundColor: '#f3f4f6' }}>
			<Sequence durationInFrames={coverDurationInFrames}>
				<Cover title={title} author={author} images={images} />
			</Sequence>

			<Sequence from={contentStartFrame}>
				<Content content={content} contentZh={contentZh} images={images} secondsForEvery30Words={secondsForEvery30Words} fps={fps} />
			</Sequence>

			{comments.length > 0 && (
				<Sequence from={contentStartFrame + 60}>
					<Comments comments={comments} />
				</Sequence>
			)}
		</AbsoluteFill>
	)
}
