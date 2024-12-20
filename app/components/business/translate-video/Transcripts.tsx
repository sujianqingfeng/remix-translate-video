import { useFetcher } from '@remix-run/react'
import { Trash } from 'lucide-react'
import { Button } from '~/components/ui/button'
import type { Transcript } from '~/types'
export default function Transcripts({ transcripts }: { transcripts: Transcript[] }) {
	const deleteFetcher = useFetcher()
	return (
		<div>
			{transcripts.map((transcript, index) => {
				return (
					// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
					<div key={index}>
						<div className="flex justify-between items-center">
							<div>
								{transcript.start}-{transcript.end}
							</div>

							<div>
								<deleteFetcher.Form method="post" action="delete-transcript">
									<input type="hidden" name="index" value={index} />
									<Button variant="ghost" size="icon">
										<Trash size={16} />
									</Button>
								</deleteFetcher.Form>
							</div>
						</div>
						<div>{transcript.text}</div>
						<div>{transcript.textLiteralTranslation}</div>
					</div>
				)
			})}
		</div>
	)
}
