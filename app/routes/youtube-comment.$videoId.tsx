import fsp from 'node:fs/promises'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json, useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { Languages, LoaderCircle } from 'lucide-react'
import invariant from 'tiny-invariant'
import BackPrevious from '~/components/business/BackPrevious'
import { CommentsList } from '~/components/business/CommentsList'
import { Button } from '~/components/ui/button'
import { PROXY, USER_AGENT } from '~/constants'
import { TranslateCommentVideo } from '~/remotion/translate-comments/TranslateCommentVideo'
import type { YoutubeInfo } from '~/types'
import { copyMaybeOriginalVideoToPublic } from '~/utils'
import { createFileCache } from '~/utils/file'
import {
	downloadYoutubeHtml,
	fetchYoutubeComments,
	generateRemotionVideoComment,
	generateYoutubeUrlByVideoId,
	getYoutubeCommentOut,
	parseYoutubeDateTime,
	parseYoutubeTitle,
	parseYoutubeViewCount,
} from '~/utils/youtube'

async function fetchComments({
	commentFile,
	html,
}: { commentFile: string; html: string }) {
	return createFileCache({
		path: commentFile,
		generator: () =>
			fetchYoutubeComments({ html, agent: new HttpsProxyAgent(PROXY) }),
		isJsonTransform: true,
	})
}

async function fetchYoutubeInfo({
	videoId,
	infoFile,
	html,
}: { videoId: string; infoFile: string; html: string }): Promise<YoutubeInfo> {
	return createFileCache({
		path: infoFile,
		generator: async () => {
			const title = await parseYoutubeTitle(html)
			const viewCount = await parseYoutubeViewCount(html)
			const dateTime = await parseYoutubeDateTime(html)
			return {
				title,
				youtubeUrl: generateYoutubeUrlByVideoId(videoId),
				viewCount,
				dateTime,
			}
		},
		isJsonTransform: true,
	})
}

async function fetchYoutubeHtml({
	videoId,
	originalHtmlFile,
}: { videoId: string; originalHtmlFile: string }) {
	return createFileCache({
		path: originalHtmlFile,
		generator: () =>
			downloadYoutubeHtml(videoId, {
				agent: new HttpsProxyAgent(PROXY),
				userAgent: USER_AGENT,
			}),
	})
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	invariant(params.videoId, 'videoId is required')

	const videoId = params.videoId
	const youtubeCommentOut = getYoutubeCommentOut(videoId)
	await fsp.mkdir(youtubeCommentOut.outDir, { recursive: true })

	const html = await fetchYoutubeHtml({
		videoId,
		originalHtmlFile: youtubeCommentOut.originalHtmlFile,
	})

	const comments = await fetchComments({
		html,
		commentFile: youtubeCommentOut.commentFile,
	})

	const info = await fetchYoutubeInfo({
		videoId,
		infoFile: youtubeCommentOut.infoFile,
		html,
	})

	const { playVideoFileName } = await copyMaybeOriginalVideoToPublic({
		outDir: youtubeCommentOut.outDir,
	})

	const durationInSeconds = 5
	const fps = 60

	const remotionVideoComments = generateRemotionVideoComment(
		comments,
		fps,
		durationInSeconds,
	)

	const totalDurationInFrames =
		fps * durationInSeconds * remotionVideoComments.length

	return json({
		videoId,
		info,
		fps,
		durationInSeconds,
		playVideoFileName,
		remotionVideoComments,
		totalDurationInFrames,
	})
}

export default function VideoCommentPage() {
	const {
		videoId,
		info,
		playVideoFileName,
		remotionVideoComments,
		fps,
		durationInSeconds,
		totalDurationInFrames,
	} = useLoaderData<typeof loader>()

	const renderFetcher = useFetcher()
	const translateFetcher = useFetcher()
	const downloadFetcher = useFetcher()

	return (
		<div className="p-4 h-screen w-full ">
			<BackPrevious />
			<div className="flex justify-center gap-2">
				<div className="flex flex-col gap-2">
					<Player
						component={TranslateCommentVideo}
						inputProps={{
							comments: remotionVideoComments,
							title: info.translatedTitle,
							videoSrc: playVideoFileName,
							dateTime: info.dateTime ?? '',
							viewCount: info.viewCount,
						}}
						durationInFrames={totalDurationInFrames}
						compositionWidth={1920}
						compositionHeight={1080}
						fps={fps}
						style={{
							width: 1280,
							height: 720,
						}}
						controls
					/>

					<p>{info.title}</p>
					<p>{info.translatedTitle}</p>

					<div className="flex items-center gap-2">
						{!playVideoFileName && (
							<downloadFetcher.Form method="post" action="download">
								<Button
									type="submit"
									disabled={downloadFetcher.state !== 'idle'}
								>
									{downloadFetcher.state === 'submitting'
										? 'Loading...'
										: 'Download'}
								</Button>
							</downloadFetcher.Form>
						)}

						<renderFetcher.Form method="post" action="render">
							<input type="hidden" name="fps" value={fps} />
							<input
								type="hidden"
								name="durationInSeconds"
								value={durationInSeconds}
							/>
							<input type="hidden" name="videoSrc" value={playVideoFileName} />
							<input
								type="hidden"
								name="totalDurationInFrames"
								value={totalDurationInFrames}
							/>
							<input type="hidden" name="dateTime" value={info.dateTime} />
							<input type="hidden" name="viewCount" value={info.viewCount} />
							<input type="hidden" name="title" value={info.translatedTitle} />
							<Button type="submit" disabled={renderFetcher.state !== 'idle'}>
								{renderFetcher.state === 'submitting' ? 'Loading...' : 'Render'}
							</Button>
						</renderFetcher.Form>
					</div>
				</div>

				<div className="overflow-y-auto">
					<div className="text-xl p-2 flex justify-between items-center">
						<p className="text-sm">videoId : {videoId}</p>
						<translateFetcher.Form method="post" action="translate">
							<button
								type="submit"
								className="cursor-pointer"
								disabled={translateFetcher.state !== 'idle'}
							>
								{translateFetcher.state === 'submitting' ? (
									<LoaderCircle className="animate-spin" />
								) : (
									<Languages />
								)}
							</button>
						</translateFetcher.Form>
					</div>

					<CommentsList comments={remotionVideoComments} />
				</div>
			</div>
		</div>
	)
}
