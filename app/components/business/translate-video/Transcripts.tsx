import { useFetcher } from '@remix-run/react'
import { Merge, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import type { Transcript } from '~/types'

function formatTime(seconds: number) {
	const minutes = Math.floor(seconds / 60)
	const remainingSeconds = Math.floor(seconds % 60)
	return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export default function Transcripts({ transcripts }: { transcripts: Transcript[] }) {
	const deleteFetcher = useFetcher()
	const mergeFetcher = useFetcher()
	const len = transcripts.length

	return (
		<div className="flex flex-col divide-y">
			{transcripts.map((transcript, index) => {
				return (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index} className="py-4 first:pt-0 last:pb-0">
						<div className="flex justify-between items-center mb-2">
							<div className="text-sm text-muted-foreground">
								{formatTime(transcript.start)}-{formatTime(transcript.end)}
							</div>

							<div className="flex gap-1">
								{index !== len - 1 && (
									<mergeFetcher.Form method="post" action="merge-transcript">
										<input type="hidden" name="index" value={index} />
										<Button variant="ghost" size="icon" className="h-8 w-8">
											<Merge size={16} />
										</Button>
									</mergeFetcher.Form>
								)}

								<deleteFetcher.Form method="post" action="delete-transcript">
									<input type="hidden" name="index" value={index} />
									<Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
										<Trash size={16} />
									</Button>
								</deleteFetcher.Form>
							</div>
						</div>
						<p className="text-sm mb-2">{transcript.text}</p>
						<p className="text-sm text-primary">{transcript.textLiteralTranslation}</p>
					</div>
				)
			})}
		</div>
	)
}
