import { useFetcher } from '@remix-run/react'
import { Languages, Split, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import type { Comment } from '~/types'

export default function Comments({ comments }: { comments: Comment[] }) {
	const deleteFetcher = useFetcher()
	const translateFetcher = useFetcher()
	const splitFetcher = useFetcher()

	return (
		<div className="flex flex-col gap-2">
			{comments.map((comment, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={index} className="border-b p-2 last:border-b-0">
					<div className="flex justify-between items-center">
						<p className="text-sm">
							{comment.author.startsWith('@') ? '' : '@'}
							{comment.author}({comment.publishedTime})
						</p>

						<div className="flex">
							<translateFetcher.Form method="post" action="translate">
								<input type="hidden" name="index" value={index} />
								<input type="hidden" name="action" value="translate-single" />
								<Button variant="ghost" size="icon">
									<Languages size={16} />
								</Button>
							</translateFetcher.Form>

							<splitFetcher.Form method="post" action="split-comment">
								<input type="hidden" name="index" value={index} />
								<Button variant="ghost" size="icon">
									<Split size={16} />
								</Button>
							</splitFetcher.Form>

							<deleteFetcher.Form method="post" action="delete-comment">
								<input type="hidden" name="index" value={index} />
								<Button variant="ghost" size="icon">
									<Trash size={16} />
								</Button>
							</deleteFetcher.Form>
						</div>
					</div>
					<p className="text-sm"> {comment.content}</p>
					<p className="text-md"> {comment.translatedContent}</p>
				</div>
			))}
		</div>
	)
}
