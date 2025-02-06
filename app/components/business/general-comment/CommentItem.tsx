import { Edit3, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Textarea } from '~/components/ui/textarea'
import type { Comment } from '~/types'

interface CommentItemProps {
	comment: Comment
	index: number
	editingIndex: number | null
	onStartEdit: (index: number) => void
	onCancelEdit: () => void
	onUpdateTranslation: (index: number, content: string) => void
	onDelete: (index: number) => void
	isLoading?: boolean
}

export function CommentItem({ comment, index, editingIndex, onStartEdit, onCancelEdit, onUpdateTranslation, onDelete, isLoading }: CommentItemProps) {
	const commentWithNumberLikes = {
		...comment,
		likes: typeof comment.likes === 'string' ? Number.parseInt(comment.likes, 10) : comment.likes,
	}

	return (
		<div className="flex gap-3">
			{comment.authorThumbnail && <img src={comment.authorThumbnail} alt={comment.author} className="w-6 h-6 rounded-full shrink-0" />}
			<div className="flex-1">
				<div className="flex items-center justify-between gap-2">
					<div className="flex items-center gap-2">
						<span className="font-medium text-sm text-gray-900">{comment.author}</span>
						<span className="text-xs text-gray-500">•</span>
						<span className="text-xs text-gray-500">👍 {commentWithNumberLikes.likes}</span>
					</div>
					<div className="flex items-center gap-2">
						<Button type="button" variant="outline" size="sm" className="gap-1" onClick={() => onStartEdit(index)} disabled={isLoading}>
							<Edit3 className="h-3 w-3" />
							Edit
						</Button>
						<Button type="button" variant="destructive" size="sm" className="gap-1" onClick={() => onDelete(index)} disabled={isLoading}>
							<Trash className="h-3 w-3" />
							Delete
						</Button>
					</div>
				</div>
				<p className="text-sm text-gray-700 mt-1">{comment.content}</p>
				{editingIndex === index ? (
					<div className="mt-1 space-y-2">
						<Textarea
							defaultValue={comment.translatedContent}
							className="text-sm"
							onKeyDown={(e) => {
								if (e.key === 'Escape') {
									onCancelEdit()
								}
							}}
							ref={(textarea) => {
								if (textarea) {
									textarea.focus()
								}
							}}
						/>
						<div className="flex justify-end gap-2">
							<Button type="button" variant="outline" size="sm" onClick={onCancelEdit}>
								Cancel
							</Button>
							<Button
								type="button"
								size="sm"
								onClick={(e) => {
									const textarea = e.currentTarget.parentElement?.previousElementSibling as HTMLTextAreaElement
									if (textarea) {
										onUpdateTranslation(index, textarea.value)
									}
								}}
							>
								Save
							</Button>
						</div>
					</div>
				) : (
					comment.translatedContent && <p className="text-sm text-gray-500 mt-1">{comment.translatedContent}</p>
				)}

				{/* Media Content */}
				{comment.media && comment.media.length > 0 && (
					<div className="mt-2 space-y-2">
						{comment.media.map((m, mediaIndex) => (
							<div key={`${m.url}-${mediaIndex}`} className={`${m.type === 'video' ? 'aspect-video' : 'aspect-square'} max-w-[240px] bg-black rounded-lg overflow-hidden`}>
								{m.type === 'video' ? (
									<video src={m.url} controls className="w-full h-full">
										<track kind="captions" />
									</video>
								) : (
									<img src={m.url} alt="Comment media" className="w-full h-full object-cover" />
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
