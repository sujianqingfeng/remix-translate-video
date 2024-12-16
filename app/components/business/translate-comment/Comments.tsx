import type { Comment } from '~/db/schema'

export default function Comments({ comments }: { comments: Comment[] }) {
	return (
		<div className="flex flex-col gap-2">
			{comments.map((comment, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={index}>{comment.content}</div>
			))}
		</div>
	)
}
