import { useFetcher } from '@remix-run/react'
import { Languages, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import type { Comment } from '~/db/schema'

export default function Comments({ comments }: { comments: Comment[] }) {
	const deleteFetcher = useFetcher()
	const translateFetcher = useFetcher()

	return (
		<div className="flex flex-col gap-2">
			{comments.map((comment, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={index}>
					<div className="flex justify-between items-center">
						<p>
							@{comment.author}({comment.publishedTime})
						</p>

						<div className="flex gap-2">
							<translateFetcher.Form method="post" action="translate">
								<input type="hidden" name="index" value={index} />
								<input type="hidden" name="action" value="translate-single" />
								<Button variant="ghost" size="icon">
									<Languages size={16} />
								</Button>
							</translateFetcher.Form>

							<deleteFetcher.Form method="post" action="delete-comment">
								<input type="hidden" name="index" value={index} />
								<Button variant="ghost" size="icon">
									<Trash size={16} />
								</Button>
							</deleteFetcher.Form>
						</div>
					</div>
					<p> {comment.content}</p>
					<p> {comment.translatedContent}</p>
				</div>
			))}
		</div>
	)
}
