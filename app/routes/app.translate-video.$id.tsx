import path from 'node:path'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { Form, Link, useFetcher, useLoaderData } from '@remix-run/react'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import Transcripts from '~/components/business/translate-video/Transcripts'
import VideoPlayer from '~/components/business/translate-video/VideoPlayer'
import { Button } from '~/components/ui/button'
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
	if (source === 'download' && downloadId) {
		const download = await db.query.downloads.findFirst({
			where: eq(schema.downloads.id, downloadId),
		})
		invariant(download, 'download not found')
		const filePath = download.filePath || ''

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
	}
}

export default function TranslateVideoPage() {
	const { translateVideo, playFile, downloadId } = useLoaderData<typeof loader>()

	const translateFetcher = useFetcher()
	const downloadVideoFetcher = useFetcher()
	const uploadAsrFetcher = useFetcher()
	const renderFetcher = useFetcher()
	const remoteRenderFetcher = useFetcher()

	return (
		<div className="flex justify-center">
			<div className="flex gap-6">
				<div className="flex flex-col gap-2">
					<div>
						<VideoPlayer playFile={playFile} transcripts={translateVideo.transcripts ?? []} />
					</div>

					<div>
						<Link to="download-audio" target="_blank" rel="noopener noreferrer">
							<Button>Download Audio</Button>
						</Link>

						{translateVideo.source === 'download' && !playFile && (
							<downloadVideoFetcher.Form action="/app/downloads/download-video" method="post">
								{/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
								<input name="id" value={downloadId!} hidden readOnly />
								<LoadingButtonWithState state={downloadVideoFetcher.state} idleText="Download video" />
							</downloadVideoFetcher.Form>
						)}
					</div>
					<div>
						<uploadAsrFetcher.Form method="post" action="upload-asr" encType="multipart/form-data" className="flex flex-col gap-4">
							<input
								type="file"
								name="file"
								accept=".json"
								className="file:mr-4 file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
								required
							/>

							<Button type="submit">Upload ASR</Button>
						</uploadAsrFetcher.Form>
					</div>

					<div className="flex gap-2">
						<translateFetcher.Form method="post" action="translate">
							<LoadingButtonWithState state={translateFetcher.state} idleText="Translate" />
						</translateFetcher.Form>

						<renderFetcher.Form method="post" action="render">
							<LoadingButtonWithState state={renderFetcher.state} idleText="Render" />
						</renderFetcher.Form>

						<remoteRenderFetcher.Form method="post" action="remote-render">
							<LoadingButtonWithState state={remoteRenderFetcher.state} idleText="Remote Render" />
						</remoteRenderFetcher.Form>

						{translateVideo.outputFilePath && (
							<Link to="local-download" target="_blank" rel="noopener noreferrer">
								<Button>Download Local</Button>
							</Link>
						)}

						<Form method="post" action="create-translate-comment">
							<Button>Start Translate Comment</Button>
						</Form>
					</div>
				</div>

				<div className="w-[500px]">
					<Transcripts transcripts={translateVideo?.transcripts ?? []} />
				</div>
			</div>
		</div>
	)
}
