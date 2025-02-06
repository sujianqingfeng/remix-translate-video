import { useState } from 'react'
import type { Comment } from '~/types'
import { CommentItem } from './CommentItem'

interface CommentListProps {
	comments: Comment[]
	onUpdateTranslation: (index: number, content: string) => void
	onDelete: (index: number) => void
	isLoading?: boolean
}

export function CommentList({ comments, onUpdateTranslation, onDelete, isLoading }: CommentListProps) {
	const [editingIndex, setEditingIndex] = useState<number | null>(null)

	return (
		<div className="space-y-6">
			{comments.map((comment, index) => (
				<CommentItem
					key={comment.id}
					comment={comment}
					index={index}
					editingIndex={editingIndex}
					onStartEdit={setEditingIndex}
					onCancelEdit={() => setEditingIndex(null)}
					onUpdateTranslation={(index, content) => {
						onUpdateTranslation(index, content)
						setEditingIndex(null)
					}}
					onDelete={onDelete}
					isLoading={isLoading}
				/>
			))}
		</div>
	)
}
