import type { LoaderFunctionArgs } from '@remix-run/node'
import { Form, useFetcher, useLoaderData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import { AlignLeft, ArrowRight, Languages, Mic, MonitorPlay } from 'lucide-react'
import { useState } from 'react'
import invariant from 'tiny-invariant'
import AiModelSelect from '~/components/AiModelSelect'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import { Badge } from '~/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '~/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Separator } from '~/components/ui/separator'
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
	const translationFetcher = useFetcher()
	const optimizationFetcher = useFetcher()
	const syncScriptFetcher = useFetcher()
	const [activeTab, setActiveTab] = useState('asr')

	return (
		<div className="container mx-auto py-8 px-4 max-w-6xl">
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
				<div>
					<h1 className="text-3xl font-bold tracking-tight">Subtitle Translation</h1>
					<p className="text-muted-foreground mt-1">Process and translate your video subtitles</p>
				</div>
			</div>

			<Card className="shadow-md border-0">
				<CardContent className="p-0">
					<Tabs defaultValue="asr" className="w-full" onValueChange={setActiveTab} value={activeTab}>
						<TabsList className="w-full grid grid-cols-4 rounded-none bg-muted/50 p-0">
							<TabsTrigger value="asr" className="rounded-none data-[state=active]:bg-background py-3 border-b-2 border-transparent data-[state=active]:border-primary">
								<div className="flex items-center gap-2">
									<Mic className="h-4 w-4" />
									<span>ASR</span>
								</div>
							</TabsTrigger>
							<TabsTrigger value="alignment" className="rounded-none data-[state=active]:bg-background py-3 border-b-2 border-transparent data-[state=active]:border-primary">
								<div className="flex items-center gap-2">
									<AlignLeft className="h-4 w-4" />
									<span>Alignment</span>
								</div>
							</TabsTrigger>
							<TabsTrigger value="translation" className="rounded-none data-[state=active]:bg-background py-3 border-b-2 border-transparent data-[state=active]:border-primary">
								<div className="flex items-center gap-2">
									<Languages className="h-4 w-4" />
									<span>Translation</span>
								</div>
							</TabsTrigger>
							<TabsTrigger value="display" className="rounded-none data-[state=active]:bg-background py-3 border-b-2 border-transparent data-[state=active]:border-primary">
								<div className="flex items-center gap-2">
									<MonitorPlay className="h-4 w-4" />
									<span>Display</span>
								</div>
							</TabsTrigger>
						</TabsList>

						{/* ASR Tab Content */}
						<TabsContent value="asr" className="p-6 focus:outline-none">
							<div className="flex items-center gap-2 mb-4">
								<Mic className="h-5 w-5 text-primary" />
								<h2 className="text-xl font-semibold">Automatic Speech Recognition</h2>
							</div>
							<CardDescription className="mb-6">Convert audio from your video into text with timestamps</CardDescription>

							{subtitleTranslation.withTimeWords?.length ? (
								<Card className="mb-6 bg-muted/30 border-0">
									<CardHeader className="pb-2">
										<CardTitle className="text-base">Text</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="max-h-60 overflow-y-auto rounded-md bg-muted/20 p-3">
											{subtitleTranslation.withTimeWords.reduce((acc, word) => {
												return acc + word.word
											}, '')}
										</div>
									</CardContent>
								</Card>
							) : (
								<Card className="mb-6 bg-muted/30 border-0">
									<CardContent className="p-4 flex items-center gap-3">
										<div className="rounded-full bg-muted/50 p-2">
											<Mic className="h-4 w-4 text-muted-foreground" />
										</div>
										<p className="text-sm text-muted-foreground">No ASR data available. Convert audio to text using the form below.</p>
									</CardContent>
								</Card>
							)}

							<Separator className="my-6" />

							<div className="bg-card rounded-lg p-6 shadow-sm">
								<h3 className="text-lg font-medium mb-4">Convert Audio to Text</h3>
								<asrFetcher.Form method="post" action="asr" className="flex flex-col gap-5">
									<div>
										<label htmlFor="model" className="block text-sm font-medium mb-2">
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

									<LoadingButtonWithState type="submit" className="mt-2 w-full sm:w-auto" state={asrFetcher.state} idleText="Convert Audio to Text" loadingText="Converting..." />
								</asrFetcher.Form>
							</div>
						</TabsContent>

						{/* Alignment Tab Content */}
						<TabsContent value="alignment" className="p-6 focus:outline-none">
							<div className="flex items-center gap-2 mb-4">
								<AlignLeft className="h-5 w-5 text-primary" />
								<h2 className="text-xl font-semibold">Text Alignment</h2>
							</div>
							<CardDescription className="mb-6">Align text into properly timed subtitle segments</CardDescription>

							{subtitleTranslation.withTimeWords?.length ? (
								<Card className="mb-6 bg-muted/30 border-0">
									<CardContent className="p-4 flex items-center gap-3">
										<div className="rounded-full bg-primary/10 p-2">
											<ArrowRight className="h-4 w-4 text-primary" />
										</div>
										<p className="text-sm">ASR data available for alignment. Use the form below to align the text.</p>
									</CardContent>
								</Card>
							) : (
								<Card className="mb-6 bg-muted/30 border-0">
									<CardContent className="p-4 flex items-center gap-3">
										<div className="rounded-full bg-muted/50 p-2">
											<AlignLeft className="h-4 w-4 text-muted-foreground" />
										</div>
										<p className="text-sm text-muted-foreground">No ASR data available. Please complete the ASR step first.</p>
									</CardContent>
								</Card>
							)}

							{subtitleTranslation.sentences?.length ? (
								<Card className="mb-6 bg-muted/30 border-0">
									<CardHeader className="pb-2">
										<CardTitle className="text-base">Aligned Subtitles</CardTitle>
									</CardHeader>
									<CardContent>
										<div className="max-h-60 overflow-y-auto rounded-md bg-muted/20 p-3">
											{subtitleTranslation.sentences.map((subtitle, index) => (
												<div key={`subtitle-${subtitle.start}-${index}`} className="mb-3 bg-card p-3 rounded-md shadow-sm">
													<p className="text-sm">{subtitle.text}</p>
													<div className="flex items-center mt-2">
														<Badge variant="outline" className="text-xs font-normal">
															{subtitle.start.toFixed(2)}s - {subtitle.end.toFixed(2)}s
														</Badge>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							) : null}

							<Separator className="my-6" />

							<div className="bg-card rounded-lg p-6 shadow-sm">
								<h3 className="text-lg font-medium mb-4">Align Text</h3>
								<alignmentFetcher.Form method="post" action="alignment" className="flex flex-col gap-5">
									<div>
										<label htmlFor="alignmentMethod" className="block text-sm font-medium mb-2">
											Select Alignment Method
										</label>

										<AiModelSelect name="alignmentMethod" defaultValue="ai" />
									</div>

									<LoadingButtonWithState type="submit" className="mt-2 w-full sm:w-auto" state={alignmentFetcher.state} idleText="Align Text" loadingText="Aligning..." />
								</alignmentFetcher.Form>
							</div>
						</TabsContent>

						{/* Translation Tab Content */}
						<TabsContent value="translation" className="p-6 focus:outline-none">
							<div className="flex items-center gap-2 mb-4">
								<Languages className="h-5 w-5 text-primary" />
								<h2 className="text-xl font-semibold">Translation</h2>
							</div>
							<CardDescription className="mb-6">Translate your subtitles to the target language</CardDescription>

							{subtitleTranslation.sentences?.length ? (
								<div className="mb-6">
									<Card className="mb-3 bg-muted/30 border-0">
										<CardContent className="p-4 flex items-center gap-3">
											<div className="rounded-full bg-primary/10 p-2">
												<ArrowRight className="h-4 w-4 text-primary" />
											</div>
											<p className="text-sm">Aligned sentences available for translation.</p>
										</CardContent>
									</Card>

									{subtitleTranslation.sentences.some((s) => s?.textInterpretation) ? (
										<Card className="bg-muted/30 border-0">
											<CardHeader className="pb-2">
												<CardTitle className="text-base">Translated Subtitles</CardTitle>
											</CardHeader>
											<CardContent>
												<div className="max-h-60 overflow-y-auto rounded-md bg-muted/20 p-3">
													{subtitleTranslation.sentences.map((subtitle, index) => (
														<div key={`subtitle-translation-${subtitle.start}-${index}`} className="mb-3 bg-card p-3 rounded-md shadow-sm">
															<p className="text-sm font-medium">{subtitle.text}</p>
															{subtitle.textInterpretation ? (
																<p className="text-sm mt-2 text-primary">{subtitle.textInterpretation}</p>
															) : (
																<p className="text-sm mt-2 text-muted-foreground italic">No translation yet</p>
															)}
															<div className="flex items-center mt-2">
																<Badge variant="outline" className="text-xs font-normal">
																	{subtitle.start.toFixed(2)}s - {subtitle.end.toFixed(2)}s
																</Badge>
															</div>
														</div>
													))}
												</div>
											</CardContent>
										</Card>
									) : (
										<Card className="bg-muted/30 border-0">
											<CardContent className="p-4 flex items-center gap-3">
												<div className="rounded-full bg-muted/50 p-2">
													<Languages className="h-4 w-4 text-muted-foreground" />
												</div>
												<p className="text-sm text-muted-foreground">No translations available yet. Use the form below to translate the text.</p>
											</CardContent>
										</Card>
									)}
								</div>
							) : (
								<Card className="mb-6 bg-muted/30 border-0">
									<CardContent className="p-4 flex items-center gap-3">
										<div className="rounded-full bg-muted/50 p-2">
											<Languages className="h-4 w-4 text-muted-foreground" />
										</div>
										<p className="text-sm text-muted-foreground">No aligned sentences available. Please complete the alignment step first.</p>
									</CardContent>
								</Card>
							)}

							<Separator className="my-6" />

							<div className="bg-card rounded-lg p-6 shadow-sm">
								<h3 className="text-lg font-medium mb-4">Translate Text</h3>
								<translationFetcher.Form method="post" action="translation" className="flex flex-col gap-5">
									<div>
										<label htmlFor="model" className="block text-sm font-medium mb-2">
											Select Translation Model
										</label>

										<AiModelSelect name="model" defaultValue="deepseek" />
									</div>

									<LoadingButtonWithState type="submit" className="mt-2 w-full sm:w-auto" state={translationFetcher.state} idleText="Translate Text" loadingText="Translating..." />
								</translationFetcher.Form>
							</div>
						</TabsContent>

						{/* Optimized Display Tab Content */}
						<TabsContent value="display" className="p-6 focus:outline-none">
							<div className="flex items-center gap-2 mb-4">
								<MonitorPlay className="h-5 w-5 text-primary" />
								<h2 className="text-xl font-semibold">Optimized Display</h2>
							</div>
							<CardDescription className="mb-6">Optimize how subtitles are displayed for better viewing experience</CardDescription>

							{subtitleTranslation.optimizedSentences?.length && subtitleTranslation.optimizedSentences.some((s) => s?.textInterpretation) ? (
								<Card className="mb-6 bg-muted/30 border-0">
									<CardHeader className="pb-2">
										<CardTitle className="text-base">Preview</CardTitle>
										<CardDescription>Optimized subtitles for better viewing experience</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="max-h-60 overflow-y-auto rounded-md bg-muted/20 p-3">
											{subtitleTranslation.optimizedSentences.map((subtitle, index) => (
												<div key={`subtitle-optimized-${subtitle.start}-${index}`} className="mb-3 bg-card p-3 rounded-md shadow-sm">
													<p className="text-sm">{subtitle.text}</p>
													{subtitle.textInterpretation && <p className="text-sm mt-2 text-primary">{subtitle.textInterpretation}</p>}
													<div className="flex items-center mt-2">
														<Badge variant="outline" className="text-xs font-normal">
															{subtitle.start.toFixed(2)}s - {subtitle.end.toFixed(2)}s
														</Badge>
													</div>
												</div>
											))}
										</div>
									</CardContent>
								</Card>
							) : (
								<Card className="mb-6 bg-muted/30 border-0">
									<CardContent className="p-4 flex items-center gap-3">
										<div className="rounded-full bg-muted/50 p-2">
											<MonitorPlay className="h-4 w-4 text-muted-foreground" />
										</div>
										<p className="text-sm text-muted-foreground">No translated sentences available. Please complete the translation step first.</p>
									</CardContent>
								</Card>
							)}

							<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
								<div className="bg-card rounded-lg p-6 shadow-sm">
									<h3 className="text-lg font-medium mb-4">Optimize Display</h3>
									<p className="text-sm text-muted-foreground mb-4">Improve subtitle timing and formatting for better readability</p>
									<optimizationFetcher.Form method="post" action="optimize" className="flex flex-col gap-5">
										<LoadingButtonWithState type="submit" className="w-full" state={optimizationFetcher.state} idleText="Optimize Display" loadingText="Optimizing..." />
									</optimizationFetcher.Form>
								</div>

								<div className="bg-card rounded-lg p-6 shadow-sm">
									<h3 className="text-lg font-medium mb-4">Sync to Video Script</h3>
									<p className="text-sm text-muted-foreground mb-4">Export optimized subtitles to your video script</p>
									<Form method="post" action="sync-script" className="flex flex-col gap-5">
										<LoadingButtonWithState type="submit" className="w-full" state={syncScriptFetcher.state} idleText="Sync to Video Script" loadingText="Syncing..." />
									</Form>
								</div>
							</div>
						</TabsContent>
					</Tabs>
				</CardContent>
			</Card>
		</div>
	)
}
