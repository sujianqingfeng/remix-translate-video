import path from 'node:path'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useFetcher, useLoaderData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import { Copy, Download, FileAudio, FileVideo, Globe2, Languages, Upload } from 'lucide-react'
import invariant from 'tiny-invariant'
import BackPrevious from '~/components/BackPrevious'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import Transcripts from '~/components/business/translate-video/Transcripts'
import VideoPlayer from '~/components/business/translate-video/VideoPlayer'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Separator } from '~/components/ui/separator'
import { toast } from '~/hooks/use-toast'
import { db, schema } from '~/lib/drizzle'
import { safeCopyFileToPublic } from '~/utils/file'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const translateVideo = await db.query.translateVideos.findFirst({
		where: eq(schema.translateVideos.id, id),
	})
	invariant(translateVideo, 'translateVideo not found')

	const { source, downloadId, uploadFilePath } = translateVideo

	let playFile = ''
	let link = ''
	if (source === 'download' && downloadId) {
		const download = await db.query.downloads.findFirst({
			where: eq(schema.downloads.id, downloadId),
		})
		invariant(download, 'download not found')
		const filePath = download.filePath || ''
		link = download.link || ''

		if (filePath) {
			await safeCopyFileToPublic(filePath)
			playFile = path.basename(filePath)
		}
	}

	if (source === 'upload' && uploadFilePath) {
		await safeCopyFileToPublic(uploadFilePath)
		playFile = path.basename(uploadFilePath)
	}

	return {
		translateVideo,
		playFile,
		downloadId,
		link,
	}
}

export default function TranslateVideoPage() {
	const { translateVideo, playFile, downloadId, link } = useLoaderData<typeof loader>()

	const translateFetcher = useFetcher()
	const downloadVideoFetcher = useFetcher()
	const uploadAsrFetcher = useFetcher()
	const renderFetcher = useFetcher()
	const remoteRenderFetcher = useFetcher()
	const splitFetcher = useFetcher()
	const autoAsrFetcher = useFetcher()
	const splitAlignFetcher = useFetcher()

	const onCopy = async (text?: string | null) => {
		if (!text) {
			return
		}
		await navigator.clipboard.writeText(text)
		toast({
			title: 'copy successful!',
		})
	}

	return (
		<div className="container mx-auto py-8 px-4">
			<BackPrevious />
			<div className="flex flex-col lg:flex-row gap-8 mt-6">
				<div className="flex-1 lg:flex-[2] space-y-8">
					<Card className="group transition-all duration-300 hover:shadow-lg">
						<CardContent className="p-0 overflow-hidden rounded-lg">
							<VideoPlayer playFile={playFile} transcripts={translateVideo.transcripts ?? []} />
						</CardContent>
					</Card>

					<Card className="group transition-all duration-300 hover:shadow-lg">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<Globe2 className="w-5 h-5 text-muted-foreground" />
								Video Information
							</CardTitle>
						</CardHeader>
						<CardContent className="space-y-8">
							<div className="grid gap-6">
								<div className="p-4 bg-muted/50 rounded-lg space-y-1.5 transition-colors duration-200 hover:bg-muted/70">
									<div className="text-sm text-muted-foreground">Original Title</div>
									<div className="text-lg font-medium break-all">{translateVideo.title}</div>
								</div>

								<div className="p-4 bg-muted/50 rounded-lg space-y-1.5 transition-colors duration-200 hover:bg-muted/70">
									<div className="text-sm text-muted-foreground">Original Link</div>
									<div className="flex items-center gap-2 group/link">
										<Globe2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
										<div className="text-lg font-medium break-all flex-1">{link}</div>
										<Button variant="ghost" size="icon" className="opacity-0 group-hover/link:opacity-100 transition-opacity" onClick={() => onCopy(link)}>
											<Copy size={16} className="text-muted-foreground hover:text-foreground transition-colors" />
										</Button>
									</div>
								</div>

								<div className="p-4 bg-muted/50 rounded-lg space-y-1.5 transition-colors duration-200 hover:bg-muted/70">
									<div className="text-sm text-muted-foreground">Translated Title</div>
									<div className="flex items-center gap-2 group/title">
										<Languages className="w-4 h-4 text-muted-foreground flex-shrink-0" />
										<div className="text-lg font-medium break-all flex-1">{translateVideo.titleZh}</div>
										<Button variant="ghost" size="icon" className="opacity-0 group-hover/title:opacity-100 transition-opacity" onClick={() => onCopy(translateVideo.titleZh)}>
											<Copy size={16} className="text-muted-foreground hover:text-foreground transition-colors" />
										</Button>
									</div>
								</div>
							</div>

							<Separator />

							<div className="space-y-4">
								<h3 className="text-lg font-semibold flex items-center gap-2">
									<FileAudio className="w-5 h-5 text-muted-foreground" />
									Media Controls
								</h3>
								<div className="flex flex-wrap gap-4">
									<Link to="download-audio" target="_blank" rel="noopener noreferrer">
										<Button variant="outline" className="gap-2 transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary">
											<FileAudio size={16} />
											Download Audio
										</Button>
									</Link>

									{translateVideo.source === 'download' && !playFile && (
										<downloadVideoFetcher.Form action="/app/downloads/download-video" method="post">
											{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
											<input name="id" value={downloadId!} hidden readOnly />
											<input name="highQuality" value="true" hidden readOnly />
											<LoadingButtonWithState
												state={downloadVideoFetcher.state}
												idleText="Download video"
												className="gap-2 transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary"
												variant="outline"
												icon={<FileVideo size={16} />}
											/>
										</downloadVideoFetcher.Form>
									)}
								</div>
							</div>

							<Separator />

							<Card className="bg-muted/30 group transition-all duration-300 hover:shadow-md">
								<CardHeader>
									<CardTitle className="flex items-center gap-2 text-lg">
										<Upload className="w-5 h-5 text-muted-foreground" />
										ASR Upload
									</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<uploadAsrFetcher.Form method="post" action="upload-asr" encType="multipart/form-data" className="space-y-4">
										<input
											type="file"
											name="file"
											accept=".json"
											className="w-full file:mr-4 file:rounded-lg file:border-0 file:bg-primary/10 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/20 cursor-pointer transition-all"
											required
										/>
										<Button type="submit" variant="secondary" className="w-full gap-2 transition-all hover:bg-primary/20 hover:text-primary">
											<Upload size={16} />
											Upload ASR
										</Button>
									</uploadAsrFetcher.Form>

									<div className="relative">
										<div className="absolute inset-0 flex items-center">
											<span className="w-full border-t" />
										</div>
										<div className="relative flex justify-center text-xs uppercase">
											<span className="bg-muted/30 px-2 text-muted-foreground">Or</span>
										</div>
									</div>

									<autoAsrFetcher.Form method="post" action="auto-asr">
										<LoadingButtonWithState
											state={autoAsrFetcher.state}
											idleText="Auto ASR"
											className="w-full gap-2 transition-all hover:bg-primary/20 hover:text-primary"
											variant="secondary"
											icon={<Languages size={16} />}
										/>
									</autoAsrFetcher.Form>
								</CardContent>
							</Card>

							<Separator />

							<div className="space-y-4">
								<h3 className="text-lg font-semibold flex items-center gap-2">
									<Languages className="w-5 h-5 text-muted-foreground" />
									Translation Actions
								</h3>
								<div className="flex flex-wrap gap-4">
									<translateFetcher.Form method="post" action="translate" className="flex items-center gap-2">
										<Select name="model" defaultValue="r1">
											<SelectTrigger className="w-[140px]">
												<SelectValue placeholder="Select Model" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="r1">R1</SelectItem>
												<SelectItem value="deepseek">DeepSeek</SelectItem>
												<SelectItem value="openai">OpenAI</SelectItem>
											</SelectContent>
										</Select>
										<LoadingButtonWithState
											state={translateFetcher.state}
											idleText="Translate"
											className="gap-2 transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary"
											variant="outline"
											icon={<Languages size={16} />}
										/>
									</translateFetcher.Form>

									<Separator orientation="vertical" className="h-10" />

									<splitFetcher.Form method="post" action="split">
										<LoadingButtonWithState state={splitFetcher.state} idleText="Split" className="transition-colors hover:bg-primary/10 hover:text-primary" variant="outline" />
									</splitFetcher.Form>

									<Separator orientation="vertical" className="h-10" />

									<splitAlignFetcher.Form method="post" action="align" className="flex items-center gap-2">
										<Select name="type" defaultValue="ai">
											<SelectTrigger className="w-[100px]">
												<SelectValue placeholder="Select Type" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="ai">AI</SelectItem>
												<SelectItem value="code">Code</SelectItem>
											</SelectContent>
										</Select>
										<LoadingButtonWithState
											state={splitAlignFetcher.state}
											idleText="Align"
											className="gap-2 transition-colors hover:bg-primary/10 hover:text-primary"
											variant="outline"
											icon={<Languages size={16} />}
										/>
									</splitAlignFetcher.Form>

									{playFile && (
										<renderFetcher.Form method="post" action="render">
											<LoadingButtonWithState
												state={renderFetcher.state}
												idleText="Render"
												className="transition-colors hover:bg-primary/10 hover:text-primary"
												variant="outline"
											/>
										</renderFetcher.Form>
									)}

									{playFile && (
										<remoteRenderFetcher.Form method="post" action="remote-render">
											<LoadingButtonWithState
												state={remoteRenderFetcher.state}
												idleText="Remote Render"
												className="transition-colors hover:bg-primary/10 hover:text-primary"
												variant="outline"
											/>
										</remoteRenderFetcher.Form>
									)}

									{translateVideo.outputFilePath && (
										<Link to="local-download" target="_blank" rel="noopener noreferrer">
											<Button variant="outline" className="gap-2 transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary">
												<Download size={16} />
												Download Local
											</Button>
										</Link>
									)}

									<Form method="post" action="create-translate-comment">
										<Button variant="secondary" className="gap-2 transition-colors hover:bg-primary/20 hover:text-primary">
											<Languages size={16} />
											Start Translate Comment
										</Button>
									</Form>

									<Link to="batch-replace">
										<Button variant="outline" className="transition-colors hover:bg-primary/10 hover:text-primary hover:border-primary">
											Batch Replace
										</Button>
									</Link>

									<Form method="post" action="create-subtitle-translation">
										<Button variant="secondary" className="gap-2 transition-colors hover:bg-primary/20 hover:text-primary">
											<Languages size={16} />
											Create Subtitle Translation
										</Button>
									</Form>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>

				<div className="w-full lg:w-[400px] lg:flex-1">
					<Card className="sticky top-4 group transition-all duration-300 hover:shadow-lg">
						<CardHeader className="sticky top-0 bg-card z-10">
							<CardTitle className="flex items-center gap-2">
								<Languages className="w-5 h-5 text-muted-foreground" />
								Transcripts
							</CardTitle>
						</CardHeader>
						<CardContent className="max-h-[calc(100vh-180px)] overflow-y-auto px-4 -mx-2">
							<Transcripts transcripts={translateVideo?.transcripts ?? []} />
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	)
}
