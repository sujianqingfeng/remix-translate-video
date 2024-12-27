import type { ActionFunctionArgs } from '@remix-run/node'
import { Form, data, redirect, useActionData, useFetcher } from '@remix-run/react'
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { db, schema } from '~/lib/drizzle'

import { X } from 'lucide-react'
import { useEffect, useState } from 'react'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Textarea } from '~/components/ui/textarea'
import type { GenerateShortTextActionData } from '~/types'

const insertShortTextSchema = z.object({
	title: z.string().min(1, 'Title is required'),
	titleZh: z.string().min(1, '中文标题是必填的'),
	shortText: z.string().min(1, 'Short text is required'),
	shortTextZh: z.string().min(1, '中文短文是必填的'),
	littleDifficultWords: z
		.array(
			z.object({
				word: z.string().min(1, 'Word is required'),
				translation: z.string().min(1, 'Translation is required'),
			}),
		)
		.min(1, '至少需要添加一个单词'),
	fps: z.number(),
})

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const rawData = {
		title: formData.get('title'),
		titleZh: formData.get('titleZh'),
		shortText: formData.get('shortText'),
		shortTextZh: formData.get('shortTextZh'),
		littleDifficultWords: JSON.parse((formData.get('words') as string) || '[]').map((word: { word: string; translation: string }) => ({
			word: word.word,
			translation: word.translation,
		})),
		fps: 120,
	} as const

	try {
		const validatedData = insertShortTextSchema.parse(rawData)
		await db.insert(schema.shortTexts).values({
			...validatedData,
			littleDifficultWords: validatedData.littleDifficultWords,
		})
		return redirect('/app/short-text')
	} catch (error) {
		if (error instanceof z.ZodError) {
			return data({ errors: error.errors }, { status: 400 })
		}
		throw error
	}
}

function ShortTextInfo({
	shortText,
	setShortText,
}: {
	shortText: GenerateShortTextActionData['shortText']
	setShortText: (shortText: GenerateShortTextActionData['shortText']) => void
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

	const deleteWord = (index: number) => {
		const newWords = shortText.words.filter((_, i) => i !== index)
		setShortText({ ...shortText, words: newWords })
	}

	return (
		<>
			<Form method="post" className="mt-4">
				<div className="space-y-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="title" className="block text-sm font-medium mb-1">
								Title
							</label>
							<Input id="title" name="title" value={shortText.title} onChange={(e) => setShortText({ ...shortText, title: e.target.value })} />
						</div>
						<div>
							<label htmlFor="titleZh" className="block text-sm font-medium mb-1">
								中文标题
							</label>
							<Input id="titleZh" name="titleZh" value={shortText.titleZh} onChange={(e) => setShortText({ ...shortText, titleZh: e.target.value })} />
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label htmlFor="shortText" className="block text-sm font-medium mb-1">
								Short Text
							</label>
							<Textarea id="shortText" name="shortText" rows={4} value={shortText.shortText} onChange={(e) => setShortText({ ...shortText, shortText: e.target.value })} />
						</div>
						<div>
							<label htmlFor="shortTextZh" className="block text-sm font-medium mb-1">
								中文短文
							</label>
							<Textarea id="shortTextZh" name="shortTextZh" rows={4} value={shortText.shortTextZh} onChange={(e) => setShortText({ ...shortText, shortTextZh: e.target.value })} />
						</div>
					</div>

					<input type="hidden" name="words" value={JSON.stringify(shortText.words)} />

					<div className="space-y-2">
						<div className="text-sm font-medium">Words</div>
						{shortText.words.map((word, index) => {
							const wordId = `word-${index}`
							const translationId = `translation-${index}`
							return (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
									key={`word-${index}`}
									className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center"
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
									<Button type="button" variant="ghost" size="icon" onClick={() => deleteWord(index)} className="text-red-500 hover:text-red-700 hover:bg-red-100">
										<X className="text-red-500" />
									</Button>
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

				<Button type="submit">Create</Button>
			</Form>
		</>
	)
}

export default function ShortTextIndexPage() {
	const fetcher = useFetcher<GenerateShortTextActionData>()
	const actionData = useActionData<{ errors?: z.ZodError['errors'] }>()
	const [currentShortText, setCurrentShortText] = useState<GenerateShortTextActionData['shortText']>({
		title: '',
		titleZh: '',
		shortText: '',
		shortTextZh: '',
		words: [],
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

			<div className="rounded-lg p-4">
				<ShortTextInfo shortText={currentShortText} setShortText={setCurrentShortText} />
			</div>

			{actionData?.errors && (
				<div className="space-y-1 text-red-500">
					{actionData.errors.map((error) => (
						<div key={`${error.path.join('.')}-${error.message}`}>
							{error.path.join('.')} - {error.message}
						</div>
					))}
				</div>
			)}

			{fetcher.data?.success === false && <p className="text-red-500">generate failed</p>}
		</div>
	)
}
