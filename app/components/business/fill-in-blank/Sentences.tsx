import { useFetcher } from '@remix-run/react'
import { Upload } from 'lucide-react'
import { Button } from '~/components/ui/button'
import type { RemotionFillInBlankSentence } from '~/types'

type SentencesProps = {
	sentences: RemotionFillInBlankSentence[]
}
export default function Sentences({ sentences }: SentencesProps) {
	const uploadCoverFetcher = useFetcher()
	return (
		<div className="flex flex-col gap-4">
			{sentences.map((sentence, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={index} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
					<div className="mb-4 space-y-2">
						<p className="text-lg font-medium text-gray-900">{sentence.sentence}</p>
						<p className="text-gray-600">{sentence.sentenceZh}</p>
					</div>

					{sentence.publicCoverPath && (
						<div className="mb-4">
							<img src={sentence.publicCoverPath} alt={sentence.word} className="h-48 w-full rounded-md object-cover" />
						</div>
					)}

					<div className="flex items-center gap-4">
						<uploadCoverFetcher.Form method="post" action="upload-cover" encType="multipart/form-data" className="flex flex-1 items-center gap-4">
							<input hidden name="index" value={index} readOnly />
							<input
								type="file"
								name="file"
								accept=".png,.jpg,.jpeg"
								className="flex-1 cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:file:bg-blue-100"
								required
							/>

							<Button type="submit" variant="ghost">
								<Upload className="h-4 w-4" />
							</Button>
						</uploadCoverFetcher.Form>
					</div>
				</div>
			))}
		</div>
	)
}
