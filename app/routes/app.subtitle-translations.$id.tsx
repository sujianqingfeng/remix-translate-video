import type { LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import { useState } from 'react'
import invariant from 'tiny-invariant'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { db, schema } from '~/lib/drizzle'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const subtitleTranslation = await db.query.subtitleTranslations.findFirst({
		where: eq(schema.subtitleTranslations.id, id),
	})
	invariant(subtitleTranslation, 'subtitleTranslation not found')

	return {
		subtitleTranslation,
	}
}

export default function SubtitleTranslationPage() {
	const { subtitleTranslation } = useLoaderData<typeof loader>()
	// Use fetcher instead of Form and useActionData
	const asrFetcher = useFetcher()
	const alignmentFetcher = useFetcher()
	const [activeTab, setActiveTab] = useState('asr')

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-4">Subtitle Translation</h1>

			<Tabs defaultValue="asr" className="w-full" onValueChange={setActiveTab} value={activeTab}>
				<TabsList className="grid grid-cols-4 w-full">
					<TabsTrigger value="asr">ASR</TabsTrigger>
					<TabsTrigger value="alignment">Alignment</TabsTrigger>
					<TabsTrigger value="translation">Translation</TabsTrigger>
					<TabsTrigger value="display">Optimized Display</TabsTrigger>
				</TabsList>

				{/* ASR Tab Content */}
				<TabsContent value="asr" className="border rounded-lg p-4 mt-4">
					<h2 className="text-lg font-semibold mb-3">Automatic Speech Recognition</h2>

					{subtitleTranslation.withTimeWords && subtitleTranslation.withTimeWords.length > 0 ? (
						<div className="mb-4">
							<p className="text-sm text-gray-500 mb-2">Words with Timestamps:</p>
							<div className="max-h-60 overflow-y-auto bg-gray-100 p-2 rounded">
								{subtitleTranslation.withTimeWords.map((word, index) => (
									<span key={`word-${index}-${word.start}`} className="inline-block mr-1 mb-1 bg-white px-1 rounded text-sm">
										{word.word} <span className="text-xs text-gray-500">({word.start.toFixed(2)}s)</span>
									</span>
								))}
							</div>
						</div>
					) : (
						<div className="mb-4">
							<p className="text-sm text-gray-500">No ASR data available. Convert audio to text using the form below.</p>
						</div>
					)}

					<div className="mt-4 border-t pt-4">
						<h3 className="text-md font-medium mb-3">Convert Audio to Text</h3>
						<asrFetcher.Form method="post" action={`/app/subtitle-translations/${subtitleTranslation.id}/asr`} className="flex flex-col gap-4">
							<div>
								<label htmlFor="model" className="block text-sm font-medium mb-1">
									Select ASR Model
								</label>
								<Select name="model" defaultValue="whisper-large">
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select ASR model" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="whisper-large">Whisper Large</SelectItem>
										<SelectItem value="whisper-medium">Whisper Medium</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<LoadingButtonWithState type="submit" className="mt-2" state={asrFetcher.state} idleText="Convert Audio to Text" loadingText="Converting..." />
						</asrFetcher.Form>
					</div>
				</TabsContent>

				{/* Alignment Tab Content */}
				<TabsContent value="alignment" className="border rounded-lg p-4 mt-4">
					<h2 className="text-lg font-semibold mb-3">Text Alignment</h2>

					{subtitleTranslation.withTimeWords && subtitleTranslation.withTimeWords.length > 0 ? (
						<div className="mb-4">
							<p className="text-sm text-gray-500 mb-2">ASR data available for alignment. Use the form below to align the text.</p>
						</div>
					) : (
						<div className="mb-4">
							<p className="text-sm text-gray-500">No ASR data available. Please complete the ASR step first.</p>
						</div>
					)}

					{subtitleTranslation.sentences && subtitleTranslation.sentences.length > 0 ? (
						<div className="mb-4">
							<p className="text-sm text-gray-500 mb-2">Aligned Subtitles:</p>
							<div className="max-h-60 overflow-y-auto bg-gray-100 p-2 rounded">
								{subtitleTranslation.sentences.map((subtitle, index) => (
									<div key={`subtitle-${subtitle.start}-${index}`} className="mb-2 bg-white p-2 rounded">
										<p className="text-sm">{subtitle.text}</p>
										<p className="text-xs text-gray-500">
											{subtitle.start.toFixed(2)}s - {subtitle.end.toFixed(2)}s
										</p>
									</div>
								))}
							</div>
						</div>
					) : null}

					<div className="mt-4 border-t pt-4">
						<h3 className="text-md font-medium mb-3">Align Text</h3>
						<alignmentFetcher.Form method="post" action={`/app/subtitle-translations/${subtitleTranslation.id}/alignment`} className="flex flex-col gap-4">
							<div>
								<label htmlFor="alignmentMethod" className="block text-sm font-medium mb-1">
									Select Alignment Method
								</label>
								<Select name="alignmentMethod" defaultValue="ai">
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Select alignment method" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="ai">AI Alignment</SelectItem>
										<SelectItem value="code">Code-based Alignment</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<LoadingButtonWithState
								type="submit"
								className="mt-2"
								state={alignmentFetcher.state}
								idleText="Align Text"
								loadingText="Aligning..."
								disabled={!subtitleTranslation.withTimeWords || subtitleTranslation.withTimeWords.length === 0}
							/>
						</alignmentFetcher.Form>
					</div>
				</TabsContent>

				{/* Translation Tab Content */}
				<TabsContent value="translation" className="border rounded-lg p-4 mt-4">
					<h2 className="text-lg font-semibold mb-3">Translation</h2>
					<p className="text-gray-500">This tab will contain tools for translating the transcribed text.</p>

					{/* Placeholder for translation functionality */}
					<div className="p-4 bg-gray-100 rounded-lg mt-4">
						<p className="text-center text-gray-400">Translation functionality will be implemented here</p>
					</div>
				</TabsContent>

				{/* Optimized Display Tab Content */}
				<TabsContent value="display" className="border rounded-lg p-4 mt-4">
					<h2 className="text-lg font-semibold mb-3">Optimized Display</h2>
					<p className="text-gray-500">This tab will show the optimized display of the subtitles.</p>

					{/* Placeholder for optimized display functionality */}
					<div className="p-4 bg-gray-100 rounded-lg mt-4">
						<p className="text-center text-gray-400">Optimized display functionality will be implemented here</p>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
