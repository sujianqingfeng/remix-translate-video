import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig } from 'remotion'
import { Comments } from './Comments'
import { Content } from './Content'
import { Cover } from './Cover'
import type { GeneralCommentProps } from './types'

export const LandscapeGeneralComment: React.FC<GeneralCommentProps> = ({
	title,
	content,
	contentZh,
	author,
	images,
	comments,
	fps,
	coverDurationInSeconds,
	contentDurationInSeconds,
	commentDurations,
}) => {
	const frame = useCurrentFrame()
	const { width, height } = useVideoConfig()

	// Convert seconds to frames
	const coverDurationInFrames = coverDurationInSeconds * fps
	const mainContentDurationInFrames = contentDurationInSeconds * fps
	const commentDurationsInFrames = commentDurations.map((seconds) => seconds * fps)

	// Calculate start frames for each comment
	const commentsStartFrame = coverDurationInFrames
	const getCommentStartFrame = (index: number) => {
		return commentsStartFrame + commentDurationsInFrames.slice(0, index).reduce((acc, curr) => acc + curr, 0)
	}

	return (
		<AbsoluteFill style={{ backgroundColor: '#f3f4f6' }}>
			{/* Cover */}
			<Sequence durationInFrames={coverDurationInFrames}>
				<Cover title={title} author={author} images={images} />
			</Sequence>

			{/* Main Content Container */}
			<Sequence from={coverDurationInFrames}>
				<AbsoluteFill className="p-12">
					<div className="bg-white rounded-3xl shadow-xl h-full flex overflow-hidden">
						{/* Left Column: Content */}
						<div className="w-[55%] p-16 border-r border-gray-100 bg-gradient-to-br from-white to-gray-50 overflow-hidden">
							<Content content={content} contentZh={contentZh} images={images} fps={fps} />
						</div>

						{/* Right Column: Comments */}
						<div className="w-[45%] flex flex-col bg-white">
							{/* Comments Header */}
							<div className="py-8 px-12 border-b border-gray-100">
								<h2 className="text-2xl font-bold text-gray-900">Comments</h2>
							</div>

							{/* Comments List */}
							<div className="flex-1 relative">
								{comments.map((comment, index) => {
									const startFrame = getCommentStartFrame(index)
									const duration = commentDurationsInFrames[index]

									return (
										<Sequence key={`${comment.author}-${comment.publishedTime}-${index}`} from={startFrame} durationInFrames={duration} layout="none">
											<div className="absolute inset-0">
												<Comments comments={[comment]} />
											</div>
										</Sequence>
									)
								})}
							</div>
						</div>
					</div>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	)
}
