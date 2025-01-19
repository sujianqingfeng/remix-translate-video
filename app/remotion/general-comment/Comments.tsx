import { ThumbsUp } from 'lucide-react'
import { spring, useCurrentFrame, useVideoConfig } from 'remotion'
import type { Comment } from '~/types'

interface CommentsProps {
	comments: Comment[]
}

const formatLikes = (count: number) => {
	if (count >= 10000) {
		return `${(count / 10000).toFixed(1)}w`
	}
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}k`
	}
	return count.toString()
}

export const Comments: React.FC<CommentsProps> = ({ comments }) => {
	const frame = useCurrentFrame()
	const { fps } = useVideoConfig()
	const comment = comments[0] // We now handle one comment at a time

	const opacity = spring({
		frame,
		fps,
		from: 0,
		to: 1,
		durationInFrames: 30,
	})

	const scale = spring({
		frame,
		fps,
		from: 0.8,
		to: 1,
		durationInFrames: 30,
	})

	const likes = typeof comment.likes === 'string' ? Number.parseInt(comment.likes, 10) : comment.likes

	return (
		<div className="h-full flex items-center">
			<div
				className="w-full px-8"
				style={{
					opacity,
					transform: `scale(${scale})`,
				}}
			>
				<div className="bg-gray-50 rounded-2xl p-8">
					<div className="flex items-start gap-5">
						{comment.authorThumbnail && <img src={comment.authorThumbnail} alt={comment.author} className="w-16 h-16 rounded-full object-cover ring-2 ring-white" />}
						<div className="flex-1 min-w-0">
							<div className="flex items-center gap-2 mb-3">
								<h3 className="text-2xl font-semibold text-gray-900 truncate">{comment.author}</h3>
								<span className="text-base text-gray-500">•</span>
								<span className="text-base text-gray-500">{new Date(comment.publishedTime).toLocaleDateString()}</span>
							</div>
							<div className="space-y-4">
								<div>
									<h4 className="text-sm font-medium text-blue-600 tracking-wide uppercase mb-2">Original</h4>
									<p className="text-xl text-gray-600 leading-relaxed">{comment.content}</p>
								</div>
								{comment.translatedContent && (
									<div>
										<h4 className="text-sm font-medium text-emerald-600 tracking-wide uppercase mb-2">Translation</h4>
										<p className="text-[2.5rem] text-gray-900 leading-normal font-medium">{comment.translatedContent}</p>
									</div>
								)}
							</div>
							<div className="mt-5 flex items-center gap-2">
								<ThumbsUp className="w-7 h-7 text-gray-700" />
								<span className="text-xl font-medium text-gray-700">{formatLikes(likes)}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
