import { useFetcher } from '@remix-run/react'
import { Trash } from 'lucide-react'
import type { YoutubeComment } from '~/types'

interface CommentsListProps {
	comments: YoutubeComment[]
}

export function CommentsList({ comments }: CommentsListProps) {
	const fetcher = useFetcher()

	return (
		<div>
			{comments.map((comment) => (
				<div key={comment.content} className="p-2">
					<div className="text-sm flex items-center justify-between gap-1">
						<span>{comment.author}</span>

						<fetcher.Form method="post" action="delete">
							<input type="hidden" name="intent" value="delete" />
							<input
								type="hidden"
								name="commentContent"
								value={comment.content}
							/>
							<button
								type="submit"
								className="cursor-pointer hover:text-red-500"
							>
								<Trash size={16} />
							</button>
						</fetcher.Form>
					</div>
					<p className="text-md">{comment.content}</p>
					<p className="text-md">{comment.translatedContent}</p>
				</div>
			))}
		</div>
	)
}
