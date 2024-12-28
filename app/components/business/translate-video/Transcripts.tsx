import { useFetcher } from '@remix-run/react'
import { Merge, Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import type { Transcript } from '~/types'
export default function Transcripts({ transcripts }: { transcripts: Transcript[] }) {
	const deleteFetcher = useFetcher()
	const mergeFetcher = useFetcher()

	const len = transcripts.length

	return (
		<div>
			<div className="text-md">Transcripts</div>
			{transcripts.map((transcript, index) => {
				return (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index} className="border-b last:border-b-0 p-2">
						<div className="flex justify-between items-center">
							<div className="text-sm text-gray-500">
								{transcript.start}-{transcript.end}
							</div>

							<div className="flex">
								{index !== len - 1 && (
									<mergeFetcher.Form method="post" action="merge-transcript">
										<input type="hidden" name="index" value={index} />
										<Button variant="ghost" size="icon">
											<Merge size={16} />
										</Button>
									</mergeFetcher.Form>
								)}

								<deleteFetcher.Form method="post" action="delete-transcript">
									<input type="hidden" name="index" value={index} />
									<Button variant="ghost" size="icon">
										<Trash size={16} />
									</Button>
								</deleteFetcher.Form>
							</div>
						</div>
						<div className="text-sm">{transcript.text}</div>
						<div className="text-sm">{transcript.textLiteralTranslation}</div>
					</div>
				)
			})}
		</div>
	)
}
