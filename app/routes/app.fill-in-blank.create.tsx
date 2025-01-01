import type { ActionFunctionArgs } from '@remix-run/node'
import { Form, redirect, useFetcher } from '@remix-run/react'
import { Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import invariant from 'tiny-invariant'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { db, schema } from '~/lib/drizzle'
import type { FillInBlankSentence } from '~/types'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const sentencesStr = formData.get('sentences')
	invariant(typeof sentencesStr === 'string', 'sentences is required')

	const sentences = JSON.parse(sentencesStr) as FillInBlankSentence[]

	const [result] = await db
		.insert(schema.fillInBlanks)
		.values({
			sentences: sentences,
		})
		.returning({
			id: schema.fillInBlanks.id,
		})

	return redirect(`/app/fill-in-blank/${result.id}`)
}

export default function AppFillInBlankCreatePage() {
	const generateFetcher = useFetcher<FillInBlankSentence[]>()
	const [sentences, setSentences] = useState<FillInBlankSentence[]>([])

	const onDelete = (index: number) => {
		setSentences((prev) => prev.filter((_, i) => i !== index))
	}

	const onEdit = (index: number, field: keyof FillInBlankSentence, value: string) => {
		setSentences((prev) => prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)))
	}

	const onAddNew = () => {
		setSentences((prev) => [
			...prev,
			{
				sentence: '',
				word: '',
				sentenceZh: '',
				wordZh: '',
				wordPronunciation: '',
			},
		])
	}

	useEffect(() => {
		if (generateFetcher.data) {
			setSentences((prev) => [...prev, ...(generateFetcher.data as FillInBlankSentence[])])
		}
	}, [generateFetcher.data])

	return (
		<div className="flex flex-col flex-auto p-4 gap-4">
			<generateFetcher.Form method="post" action="/app/fill-in-blank/generate">
				<LoadingButtonWithState state={generateFetcher.state} idleText="Generate" loadingText="Generating..." />
			</generateFetcher.Form>

			<div className="flex-auto overflow-auto space-y-4">
				{sentences.map((sentence, index) => (
					<div key={`${sentence.word}-${sentence.sentence}-${index}`} className="p-4 space-y-2 border rounded-lg bg-white shadow-sm">
						<div className="flex justify-between items-center">
							<h3 className="font-bold">Sentence {index + 1}</h3>
							<Button variant="ghost" size="icon" onClick={() => onDelete(index)}>
								<Trash2 className="h-4 w-4" />
							</Button>
						</div>
						<div className="space-y-2">
							<Input placeholder="Sentence" value={sentence.sentence} onChange={(e) => onEdit(index, 'sentence', e.target.value)} />
							<Input placeholder="Word" value={sentence.word} onChange={(e) => onEdit(index, 'word', e.target.value)} />
							<Input placeholder="Sentence (Chinese)" value={sentence.sentenceZh} onChange={(e) => onEdit(index, 'sentenceZh', e.target.value)} />
							<Input placeholder="Word (Chinese)" value={sentence.wordZh} onChange={(e) => onEdit(index, 'wordZh', e.target.value)} />
							<Input placeholder="Word Pronunciation" value={sentence.wordPronunciation} onChange={(e) => onEdit(index, 'wordPronunciation', e.target.value)} />
						</div>
					</div>
				))}
			</div>

			<div className="flex gap-2 sticky bottom-0 bg-white py-2">
				<Button onClick={onAddNew}>Add New Sentence</Button>
				<Form method="post">
					<input type="hidden" name="sentences" value={JSON.stringify(sentences)} />
					<Button type="submit">Create</Button>
				</Form>
			</div>
		</div>
	)
}
