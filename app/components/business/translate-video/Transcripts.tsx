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
		<div className="flex flex-col gap-6">
			{transcripts.map((transcript, index) => {
				const isEditing = editingIndex === index

				return (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div
						key={index}
						className={cn(
							'p-5 rounded-xl transition-all',
							'bg-gradient-to-br from-card/50 to-card/30 hover:from-card/70 hover:to-card/50',
							'border border-border/50 hover:border-border/80',
							'shadow-sm hover:shadow-md',
							'group relative',
						)}
					>
						<div className="flex justify-between items-center mb-4">
							<div className="px-3 py-1.5 rounded-full bg-primary/10 text-xs font-medium text-primary tracking-wide">
								{formatTime(transcript.start)} - {formatTime(transcript.end)}
							</div>

							<div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
								{index !== len - 1 && (
									<mergeFetcher.Form method="post" action="merge-transcript">
										<input type="hidden" name="index" value={index} />
										<Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary" title="合并下一句">
											<Merge size={15} />
										</Button>
									</mergeFetcher.Form>
								)}

								<deleteFetcher.Form method="post" action="delete-transcript">
									<input type="hidden" name="index" value={index} />
									<Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-destructive/10 text-muted-foreground hover:text-destructive" title="删除">
										<Trash size={15} />
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
								<Button type="submit" variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
									<Save size={15} />
								</Button>
								<Button
									type="button"
									variant="ghost"
									size="icon"
									className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
									onClick={() => {
										setEditingIndex(null)
										setEditingField(null)
									}}
								>
									<X size={15} />
								</Button>
							</updateFetcher.Form>
						) : (
							<div className="flex justify-between items-start gap-2 px-1 mb-4">
								<p className="text-sm leading-relaxed text-foreground/90 font-medium">{transcript.text}</p>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary rounded-full"
									onClick={() => {
										setEditingIndex(index)
										setEditingField('text')
									}}
									title="编辑原文"
								>
									<Pencil size={15} />
								</Button>
							</div>
						)}

						<div className="space-y-3">
							{/* 直译 */}
							<div className="relative">
								<div className="absolute -left-4 top-1.5 w-2 h-2 rounded-full bg-primary/30" />
								{isEditing && editingField === 'literal' ? (
									<updateFetcher.Form
										method="post"
										action="update-translation"
										className="flex gap-2 pl-1"
										onSubmit={() => {
											setEditingIndex(null)
											setEditingField(null)
										}}
									>
										<input type="hidden" name="index" value={index} />
										<input type="hidden" name="field" value="literal" />
										<Input name="textLiteralTranslation" defaultValue={transcript.textLiteralTranslation} className="text-sm flex-1 bg-background/50" />
										<Button type="submit" variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
											<Save size={15} />
										</Button>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
											onClick={() => {
												setEditingIndex(null)
												setEditingField(null)
											}}
										>
											<X size={15} />
										</Button>
									</updateFetcher.Form>
								) : (
									<div className="flex justify-between items-start gap-2 pl-1">
										<p className="text-sm leading-relaxed text-primary/90 flex-1">{transcript.textLiteralTranslation}</p>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary rounded-full"
											onClick={() => {
												setEditingIndex(index)
												setEditingField('literal')
											}}
											title="编辑直译"
										>
											<Pencil size={15} />
										</Button>
									</div>
								)}
							</div>

							{/* 意译 */}
							<div className="relative">
								<div className="absolute -left-4 top-1.5 w-2 h-2 rounded-full bg-primary/60" />
								{isEditing && editingField === 'interpretation' ? (
									<updateFetcher.Form
										method="post"
										action="update-translation"
										className="flex gap-2 pl-1"
										onSubmit={() => {
											setEditingIndex(null)
											setEditingField(null)
										}}
									>
										<input type="hidden" name="index" value={index} />
										<input type="hidden" name="field" value="interpretation" />
										<Input name="textInterpretation" defaultValue={transcript.textInterpretation} className="text-sm flex-1 bg-background/50" />
										<Button type="submit" variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary">
											<Save size={15} />
										</Button>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
											onClick={() => {
												setEditingIndex(null)
												setEditingField(null)
											}}
										>
											<X size={15} />
										</Button>
									</updateFetcher.Form>
								) : (
									<div className="flex justify-between items-start gap-2 pl-1">
										<p className="text-sm leading-relaxed text-primary/90 flex-1">{transcript.textInterpretation}</p>
										<Button
											variant="ghost"
											size="icon"
											className="h-8 w-8 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10 hover:text-primary rounded-full"
											onClick={() => {
												setEditingIndex(index)
												setEditingField('interpretation')
											}}
											title="编辑意译"
										>
											<Pencil size={15} />
										</Button>
									</div>
								)}
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)
}
