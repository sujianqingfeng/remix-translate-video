import fsp from 'node:fs/promises'
import path from 'node:path'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json, useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { Languages } from 'lucide-react'
import invariant from 'tiny-invariant'
import { CommentsList } from '~/components/business/CommentsList'
import { Button } from '~/components/ui/button'
import { PROXY, PUBLIC_DIR, USER_AGENT, YOUTUBE_NAME_FILE } from '~/constants'
import { TranslateCommentVideo } from '~/remotion/translate-comments/TranslateCommentVideo'
import type { YoutubeInfo } from '~/types'
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
	tryGetYoutubeDownloadFile,
} from '~/utils/youtube'

async function copyOriginalVideoToPublic(videoId: string) {
	const playVideoFile = await tryGetYoutubeDownloadFile(videoId)

	if (!playVideoFile) {
		return {
			playVideoFile: '',
		}
	}

	const suffixName = path.extname(playVideoFile)
	const playVideoFileName = `${YOUTUBE_NAME_FILE}${suffixName}`

	const destPath = path.join(PUBLIC_DIR, playVideoFileName)
	await fsp.copyFile(playVideoFile, destPath)

	return {
		playVideoFile: playVideoFileName,
	}
}

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

	const { playVideoFile } = await copyOriginalVideoToPublic(videoId)
	const durationInSeconds = 5
	const fps = 40

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
		playVideoFile,
		remotionVideoComments,
		totalDurationInFrames,
	})
}

export default function VideoCommentPage() {
	const {
		videoId,
		info,
		playVideoFile,
		remotionVideoComments,
		fps,
		durationInSeconds,
		totalDurationInFrames,
	} = useLoaderData<typeof loader>()

	const renderFetcher = useFetcher()
	const translateFetcher = useFetcher()

	return (
		<div className="p-4 h-screen w-full flex justify-center gap-2">
			<div className="flex flex-col gap-2">
				<Player
					component={TranslateCommentVideo}
					inputProps={{
						comments: remotionVideoComments,
						title: info.translatedTitle,
						videoSrc: playVideoFile,
						dateTime: info.dateTime ?? '',
						viewCount: info.viewCount,
					}}
					durationInFrames={totalDurationInFrames}
					compositionWidth={1280}
					compositionHeight={720}
					fps={fps}
					style={{
						width: 1280,
						height: 720,
					}}
					controls
				/>

				<p>{info.title}</p>
				<p>{info.translatedTitle}</p>
				<renderFetcher.Form method="post" action="render">
					<input type="hidden" name="fps" value={fps} />
					<input
						type="hidden"
						name="durationInSeconds"
						value={durationInSeconds}
					/>
					<input type="hidden" name="videoSrc" value={playVideoFile} />
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

			<div className="overflow-y-auto">
				<div className="text-xl p-2 flex justify-between items-center">
					<p className="text-sm">videoId : {videoId}</p>
					<translateFetcher.Form method="post" action="translate">
						<button
							type="submit"
							className="cursor-pointer"
							disabled={translateFetcher.state !== 'idle'}
						>
							<Languages />
						</button>
					</translateFetcher.Form>
				</div>

				<CommentsList comments={remotionVideoComments} />
			</div>
		</div>
	)
}
