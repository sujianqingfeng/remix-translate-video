import { AbsoluteFill, Sequence, staticFile, useCurrentFrame, useVideoConfig } from 'remotion'
import { Audio } from './Audio'
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
	audioPath,
	publicAudioPath,
	createdAt,
	likes,
	views,
	commentCount,
}) => {
	// Convert seconds to frames
	const coverDurationInFrames = coverDurationInSeconds * fps
	const totalCommentsDuration = commentDurations.reduce((acc, curr) => acc + curr, 0)
	const totalCommentDurationInFrames = totalCommentsDuration * fps

	return (
		<AbsoluteFill className="bg-gradient-to-br from-gray-50 to-gray-100">
			{/* Background Pattern */}
			<div className="absolute inset-0 opacity-[0.02]">
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,#000_1px,transparent_0)] bg-[length:40px_40px]" />
			</div>

			{/* Background Audio */}
			{publicAudioPath && <Audio publicAudioPath={publicAudioPath} />}

			{/* Cover */}
			<Sequence durationInFrames={coverDurationInFrames}>
				<Cover title={title} author={author} images={images} />
			</Sequence>

			{/* Main Content Container */}
			<Sequence from={coverDurationInFrames}>
				<AbsoluteFill className="p-12">
					<div className="bg-white rounded-3xl shadow-xl h-full flex overflow-hidden ring-1 ring-black/[0.02]">
						{/* Left Column: Content */}
						<div className="w-[55%] border-r border-gray-100 bg-gradient-to-br from-white to-gray-50/50 overflow-hidden">
							<Content content={content} contentZh={contentZh} images={images} fps={fps} createdAt={createdAt} likes={likes} views={views} commentCount={commentCount} />
						</div>

						{/* Right Column: Comments */}
						<div className="w-[45%] flex flex-col bg-white">
							{/* Comments Header */}
							<div className="py-8 px-12 border-b border-gray-100 bg-white/80 backdrop-blur-sm">
								<div className="flex items-center gap-3">
									<div className="h-6 w-1 bg-gradient-to-b from-gray-900 to-gray-700 rounded-full" />
									<h2 className="text-2xl font-bold text-gray-900">Comments</h2>
								</div>
							</div>

							{/* Comments List */}
							<div className="flex-1 relative">
								<Comments comments={comments} totalDurationInFrames={totalCommentDurationInFrames} />
							</div>
						</div>
					</div>
				</AbsoluteFill>
			</Sequence>
		</AbsoluteFill>
	)
}
