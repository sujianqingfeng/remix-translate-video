import { useFetcher } from '@remix-run/react'
import { Trash2, Upload } from 'lucide-react'
import { Button } from '~/components/ui/button'
import type { RemotionFillInBlankSentence } from '~/types'

type SentencesProps = {
	sentences: RemotionFillInBlankSentence[]
}
export default function Sentences({ sentences }: SentencesProps) {
	const uploadCoverFetcher = useFetcher()
	const deleteFetcher = useFetcher()

	return (
		<div className="grid gap-6">
			{sentences.map((sentence, index) => (
				// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
				<div key={index} className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
					<div className="relative p-6">
						{/* Delete Button - Positioned at top right */}
						<deleteFetcher.Form method="post" action="delete-sentence" className="absolute right-4 top-6">
							<input type="hidden" name="index" value={index} />
							<Button variant="ghost" type="submit" className="h-8 w-8 rounded-full p-0 hover:bg-red-50 hover:text-red-500">
								<Trash2 className="h-4 w-4" />
							</Button>
						</deleteFetcher.Form>

						{/* Main Content */}
						<div className="mb-6 space-y-4">
							{/* English Section */}
							<div className="space-y-1">
								<h3 className="text-xl font-semibold text-gray-900">{sentence.sentence}</h3>
								<p className="text-base text-gray-600">{sentence.sentenceZh}</p>
							</div>

							{/* Word Section */}
							<div className="rounded-lg bg-gray-50 p-3">
								<p className="font-medium text-gray-900">{sentence.word}</p>
								<p className="text-sm text-gray-600">{sentence.wordZh}</p>
							</div>
						</div>

						{/* Image Section */}
						{sentence.publicCoverPath && (
							<div className="mb-6">
								<img src={sentence.publicCoverPath} alt={sentence.word} className="h-56 w-full rounded-lg object-cover shadow-sm" />
							</div>
						)}

						{/* Upload Form */}
						<uploadCoverFetcher.Form method="post" action="upload-cover" encType="multipart/form-data" className="flex items-center gap-3">
							<input hidden name="index" value={index} readOnly />
							<div className="relative flex-1">
								<input
									type="file"
									name="file"
									accept=".png,.jpg,.jpeg"
									className="w-full cursor-pointer rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-blue-700 hover:border-blue-300 hover:file:bg-blue-100"
									required
								/>
							</div>
							<Button type="submit" variant="outline" className="h-10 w-10 rounded-lg p-0 hover:bg-blue-50 hover:text-blue-600">
								<Upload className="h-4 w-4" />
							</Button>
						</uploadCoverFetcher.Form>
					</div>
				</div>
			))}
		</div>
	)
}
