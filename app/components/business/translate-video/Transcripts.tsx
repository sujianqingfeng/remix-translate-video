import { useFetcher } from '@remix-run/react'
import { Merge, Pencil, Save, Trash, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { cn } from '~/lib/utils'
import type { Transcript } from '~/types'

function formatTime(seconds: number) {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = Math.floor(seconds % 60)
	return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export default function Transcripts({ transcripts }: { transcripts: Transcript[] }) {
	const deleteFetcher = useFetcher()
	const mergeFetcher = useFetcher()
	const updateFetcher = useFetcher()
	const len = transcripts.length
	const [editingIndex, setEditingIndex] = useState<number | null>(null)
	const [editingField, setEditingField] = useState<'text' | 'literal' | 'interpretation' | null>(null)

	return (
		<div className="flex flex-col gap-4">
			{transcripts.map((transcript, index) => {
				const isEditing = editingIndex === index

				return (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index} className={cn('p-4 rounded-lg transition-all', 'bg-card/50 hover:bg-card/80 border border-border/50', 'group relative')}>
						<div className="flex justify-between items-center mb-3">
							<div className="px-2 py-1 rounded bg-primary/10 text-xs font-medium text-primary">
								{formatTime(transcript.start)}-{formatTime(transcript.end)}
							</div>

							<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
								{index !== len - 1 && (
									<mergeFetcher.Form method="post" action="merge-transcript">
										<input type="hidden" name="index" value={index} />
										<Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-primary/10 hover:text-primary">
											<Merge size={14} />
										</Button>
									</mergeFetcher.Form>
								)}

								<deleteFetcher.Form method="post" action="delete-transcript">
									<input type="hidden" name="index" value={index} />
									<Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-destructive/10 text-muted-foreground hover:text-destructive">
										<Trash size={14} />
									</Button>
								</deleteFetcher.Form>
							</div>
						</div>

						{isEditing && editingField === 'text' ? (
							<updateFetcher.Form
								method="post"
								action="update-translation"
								className="flex gap-2"
								onSubmit={() => {
									setEditingIndex(null)
									setEditingField(null)
								}}
							>
								<input type="hidden" name="index" value={index} />
								<input type="hidden" name="field" value="text" />
								<Input name="text" defaultValue={transcript.text} className="text-sm flex-1 bg-background/50" />
								<Button type="submit" variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
									<Save size={16} />
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
									onClick={() => {
										setEditingIndex(null)
										setEditingField(null)
									}}
								>
									<X size={16} />
								</Button>
							</updateFetcher.Form>
						) : (
							<div className="flex justify-between items-start gap-2 px-0.5 mb-3">
								<p className="text-sm leading-relaxed text-foreground/90">{transcript.text}</p>
								<Button
									variant="ghost"
									size="icon"
									className="h-7 w-7 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
									onClick={() => {
										setEditingIndex(index)
										setEditingField('text')
									}}
								>
									<Pencil size={14} />
								</Button>
							</div>
						)}

						{isEditing && editingField === 'literal' ? (
							<updateFetcher.Form
								method="post"
								action="update-translation"
								className="flex gap-2"
								onSubmit={() => {
									setEditingIndex(null)
									setEditingField(null)
								}}
							>
								<input type="hidden" name="index" value={index} />
								<input type="hidden" name="field" value="literal" />
								<Input name="textLiteralTranslation" defaultValue={transcript.textLiteralTranslation} className="text-sm flex-1 bg-background/50" />
								<Button type="submit" variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
									<Save size={16} />
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
									onClick={() => {
										setEditingIndex(null)
										setEditingField(null)
									}}
								>
									<X size={16} />
								</Button>
							</updateFetcher.Form>
						) : (
							<div className="flex justify-between items-start gap-2 px-0.5">
								<p className="text-sm leading-relaxed text-primary/90 flex-1">{transcript.textLiteralTranslation}</p>
								<Button
									variant="ghost"
									size="icon"
									className="h-7 w-7 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
									onClick={() => {
										setEditingIndex(index)
										setEditingField('literal')
									}}
								>
									<Pencil size={14} />
								</Button>
							</div>
						)}

						{isEditing && editingField === 'interpretation' ? (
							<updateFetcher.Form
								method="post"
								action="update-translation"
								className="flex gap-2 mt-2"
								onSubmit={() => {
									setEditingIndex(null)
									setEditingField(null)
								}}
							>
								<input type="hidden" name="index" value={index} />
								<input type="hidden" name="field" value="interpretation" />
								<Input name="textInterpretation" defaultValue={transcript.textInterpretation} className="text-sm flex-1 bg-background/50" />
								<Button type="submit" variant="ghost" size="icon" className="h-8 w-8 hover:bg-primary/10 hover:text-primary">
									<Save size={16} />
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive"
									onClick={() => {
										setEditingIndex(null)
										setEditingField(null)
									}}
								>
									<X size={16} />
								</Button>
							</updateFetcher.Form>
						) : (
							<div className="flex justify-between items-start gap-2 px-0.5 mt-2">
								<p className="text-sm leading-relaxed text-primary/90 flex-1">{transcript.textInterpretation}</p>
								<Button
									variant="ghost"
									size="icon"
									className="h-7 w-7 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary"
									onClick={() => {
										setEditingIndex(index)
										setEditingField('interpretation')
									}}
								>
									<Pencil size={14} />
								</Button>
							</div>
						)}
					</div>
				)
			})}
		</div>
	)
}
