import { useFetcher } from '@remix-run/react'
import { Check, Languages, Pencil, Split, Trash } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import type { Comment } from '~/types'

export default function Comments({ comments }: { comments: Comment[] }) {
	const deleteFetcher = useFetcher()
	const translateFetcher = useFetcher()
	const splitFetcher = useFetcher()
	const updateContentFetcher = useFetcher()
	const [editingIndex, setEditingIndex] = useState<number | null>(null)
	const [editContent, setEditContent] = useState('')

	const handleEdit = (index: number, content: string) => {
		setEditingIndex(index)
		setEditContent(content)
	}

	const handleSave = (index: number) => {
		updateContentFetcher.submit(
			{
				index: index.toString(),
				translatedContent: editContent,
			},
			{ method: 'post', action: 'update-content' },
		)
		setEditingIndex(null)
	}

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
					<p className="text-sm">{comment.content}</p>
					<div className="flex items-center gap-2">
						{editingIndex === index ? (
							<>
								<Input value={editContent} onChange={(e) => setEditContent(e.target.value)} className="flex-1" />
								<Button variant="ghost" size="icon" onClick={() => handleSave(index)}>
									<Check size={16} />
								</Button>
							</>
						) : (
							<>
								<p className="text-md flex-1">{comment.translatedContent}</p>
								<Button variant="ghost" size="icon" onClick={() => handleEdit(index, comment.translatedContent || '')}>
									<Pencil size={16} />
								</Button>
							</>
						)}
					</div>
				</div>
			))}
		</div>
	)
}
