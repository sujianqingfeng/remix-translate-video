import path from 'node:path'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useFetcher, useLoaderData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import { Copy } from 'lucide-react'
import invariant from 'tiny-invariant'
import BackPrevious from '~/components/BackPrevious'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import Transcripts from '~/components/business/translate-video/Transcripts'
import VideoPlayer from '~/components/business/translate-video/VideoPlayer'
import { Button } from '~/components/ui/button'
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
				<div className="flex-1 space-y-8">
					<div className="bg-white rounded-lg shadow-md overflow-hidden">
						<VideoPlayer playFile={playFile} transcripts={translateVideo.transcripts ?? []} />
					</div>

					<div className="space-y-6 bg-white rounded-lg shadow-md p-6">
						<div className="space-y-6">
							<div className="space-y-4">
								<h3 className="text-lg font-semibold">Video Information</h3>
								<div className="space-y-3">
									<div className="p-4 bg-gray-50 rounded-lg">
										<div className="text-sm text-gray-500 mb-1">Original Title</div>
										<div className="text-lg break-all">{translateVideo.title}</div>
									</div>

									<div className="p-4 bg-gray-50 rounded-lg">
										<div className="text-sm text-gray-500 mb-1">Original Link</div>

										<div className="flex items-center gap-2 group">
											<div className="text-lg break-all flex-1">{link}</div>
											<Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => onCopy(link)}>
												<Copy size={16} className="text-gray-500 hover:text-gray-700" />
											</Button>
										</div>
									</div>

									<div className="p-4 bg-gray-50 rounded-lg">
										<div className="text-sm text-gray-500 mb-1">Translated Title</div>
										<div className="flex items-center gap-2 group">
											<div className="text-lg break-all flex-1">{translateVideo.titleZh}</div>
											<Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => onCopy(translateVideo.titleZh)}>
												<Copy size={16} className="text-gray-500 hover:text-gray-700" />
											</Button>
										</div>
									</div>
								</div>
							</div>

							<div className="flex flex-wrap gap-3">
								<h3 className="w-full text-lg font-semibold mb-2">Media Controls</h3>
								<Link to="download-audio" target="_blank" rel="noopener noreferrer">
									<Button variant="outline">Download Audio</Button>
								</Link>

								{translateVideo.source === 'download' && !playFile && (
									<downloadVideoFetcher.Form action="/app/downloads/download-video" method="post">
										{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
										<input name="id" value={downloadId!} hidden readOnly />
										<input name="highQuality" value="true" hidden readOnly />
										<LoadingButtonWithState state={downloadVideoFetcher.state} idleText="Download video" />
									</downloadVideoFetcher.Form>
								)}
							</div>

							<div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
								<h3 className="text-lg font-semibold mb-4">ASR Upload</h3>
								<uploadAsrFetcher.Form method="post" action="upload-asr" encType="multipart/form-data" className="space-y-4">
									<input
										type="file"
										name="file"
										accept=".json"
										className="w-full file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
										required
									/>
									<Button type="submit" variant="secondary" className="w-full">
										Upload ASR
									</Button>
								</uploadAsrFetcher.Form>
							</div>

							<div className="space-y-4">
								<h3 className="text-lg font-semibold">Translation Actions</h3>
								<div className="flex flex-wrap gap-3">
									<translateFetcher.Form method="post" action="translate">
										<LoadingButtonWithState state={translateFetcher.state} idleText="Translate" />
									</translateFetcher.Form>

									<splitFetcher.Form method="post" action="split">
										<LoadingButtonWithState state={splitFetcher.state} idleText="Split" />
									</splitFetcher.Form>

									{playFile && (
										<renderFetcher.Form method="post" action="render">
											<LoadingButtonWithState state={renderFetcher.state} idleText="Render" />
										</renderFetcher.Form>
									)}

									{playFile && (
										<remoteRenderFetcher.Form method="post" action="remote-render">
											<LoadingButtonWithState state={remoteRenderFetcher.state} idleText="Remote Render" />
										</remoteRenderFetcher.Form>
									)}

									{translateVideo.outputFilePath && (
										<Link to="local-download" target="_blank" rel="noopener noreferrer">
											<Button variant="outline">Download Local</Button>
										</Link>
									)}

									<Form method="post" action="create-translate-comment">
										<Button variant="secondary">Start Translate Comment</Button>
									</Form>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full lg:w-[500px]">
					<div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
						<h2 className="text-lg font-semibold mb-4">Transcripts</h2>
						<div className="max-h-[calc(100vh-180px)] overflow-y-auto">
							<Transcripts transcripts={translateVideo?.transcripts ?? []} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
