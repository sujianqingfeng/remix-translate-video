import { Form, json, useFetcher, useLoaderData } from '@remix-run/react'
import { useEffect, useState } from 'react'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import type { GenerateShortTextActionData, ShortText } from '~/types'
import { generateUniqueKey } from '~/utils'

function ShortTextInfo({
	shortText,
	setShortText,
	uniqueKey,
}: {
	shortText: ShortText
	setShortText: (shortText: ShortText) => void
	uniqueKey: string
}) {
	const [bulkWords, setBulkWords] = useState('')

	const updateWord = (index: number, field: 'word' | 'translation', value: string) => {
		const newWords = [...shortText.words]
		newWords[index] = { ...newWords[index], [field]: value }
		setShortText({ ...shortText, words: newWords })
	}

	const handleBulkAdd = () => {
		const newWords = bulkWords
			.split('\n')
			.filter((line) => line.trim())
			.map((line) => {
				const [word, translation] = line.split(':').map((s) => s.trim())
				return { word: word || '', translation: translation || '' }
			})

		setShortText({
			...shortText,
			words: [...shortText.words, ...newWords],
		})
		setBulkWords('')
	}

	return (
		<>
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div>
						<label htmlFor="title" className="block text-sm font-medium mb-1">
							Title
						</label>
						<Input id="title" value={shortText.title} onChange={(e) => setShortText({ ...shortText, title: e.target.value })} />
					</div>
					<div>
						<label htmlFor="titleZh" className="block text-sm font-medium mb-1">
							中文标题
						</label>
						<Input id="titleZh" value={shortText.titleZh} onChange={(e) => setShortText({ ...shortText, titleZh: e.target.value })} />
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div>
						<label htmlFor="shortText" className="block text-sm font-medium mb-1">
							Short Text
						</label>
						<Textarea id="shortText" rows={4} value={shortText.shortText} onChange={(e) => setShortText({ ...shortText, shortText: e.target.value })} />
					</div>
					<div>
						<label htmlFor="shortTextZh" className="block text-sm font-medium mb-1">
							中文短文
						</label>
						<Textarea id="shortTextZh" rows={4} value={shortText.shortTextZh} onChange={(e) => setShortText({ ...shortText, shortTextZh: e.target.value })} />
					</div>
				</div>

				<div className="space-y-2">
					<div className="text-sm font-medium">Words</div>
					{shortText.words.map((word, index) => {
						const wordId = `word-${uniqueKey}-${index}`
						const translationId = `translation-${uniqueKey}-${index}`
						return (
							<div
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={`${uniqueKey}-word-${index}`}
								className="grid grid-cols-2 gap-2"
							>
								<div>
									<label htmlFor={wordId} className="sr-only">
										Word {index + 1}
									</label>
									<Input id={wordId} value={word.word} onChange={(e) => updateWord(index, 'word', e.target.value)} placeholder="Word" />
								</div>
								<div>
									<label htmlFor={translationId} className="sr-only">
										Translation {index + 1}
									</label>
									<Input id={translationId} value={word.translation} onChange={(e) => updateWord(index, 'translation', e.target.value)} placeholder="Translation" />
								</div>
							</div>
						)
					})}

					<div className="space-y-2">
						<Textarea
							value={bulkWords}
							onChange={(e) => setBulkWords(e.target.value)}
							rows={10}
							// biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
							placeholder={`每行输入一个单词和释义，用冒号分隔。例如：\nhello:你好\nworld:世界`}
						/>
						<Button onClick={handleBulkAdd} type="button" variant="outline">
							Add Words
						</Button>
					</div>
				</div>
			</div>

			<Form method="post" action="confirm" className="mt-4">
				<input name="key" value={uniqueKey} type="hidden" />
				<input type="hidden" name="shortText" value={JSON.stringify(shortText, null, 2)} />
				<Button type="submit">Confirm</Button>
			</Form>
		</>
	)
}

export const loader = async () => {
	const key = generateUniqueKey('st-')

	return json({
		key,
	})
}

export default function ShortTextIndexPage() {
	const { key } = useLoaderData<typeof loader>()

	const fetcher = useFetcher<GenerateShortTextActionData>()
	const [currentShortText, setCurrentShortText] = useState<ShortText>({
		title: '',
		titleZh: '',
		shortText: '',
		shortTextZh: '',
		words: [],
		direction: 0,
	})

	useEffect(() => {
		if (fetcher.data?.success) {
			setCurrentShortText(fetcher.data.shortText)
		}
	}, [fetcher.data])

	return (
		<div className="space-y-4">
			<div className="flex gap-2 justify-end">
				<fetcher.Form method="post" action="generate" className="flex items-center gap-2">
					<Input placeholder="theme" name="theme" />
					<LoadingButtonWithState state={fetcher.state} idleText="Generate" />
				</fetcher.Form>
			</div>

			<div className="rounded-lg border p-4">
				<ShortTextInfo uniqueKey={key} shortText={currentShortText} setShortText={setCurrentShortText} />
			</div>

			{fetcher.data?.success === false && <p className="text-red-500">generate failed</p>}
		</div>
	)
}
