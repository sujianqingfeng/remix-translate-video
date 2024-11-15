import fsp from 'node:fs/promises'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json, useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { Languages, LoaderCircle } from 'lucide-react'
import invariant from 'tiny-invariant'
import { ProxyAgent } from 'undici'
import BackPrevious from '~/components/business/BackPrevious'
import { CommentsList } from '~/components/business/CommentsList'
import { Button } from '~/components/ui/button'
import { PROXY } from '~/constants'
import TranslateComment from '~/remotion/translate-comments/TranslateComment'
import type { YoutubeComment, YoutubeInfo } from '~/types'
import { copyMaybeOriginalVideoToPublic } from '~/utils'
import { fileExist } from '~/utils/file'
import {
	generateRemotionVideoComment,
	getYoutubeCommentOut,
} from '~/utils/translate-comment'
import {
	createProxyYoutubeInnertube,
	generateYoutubeUrlByVideoId,
} from '~/utils/youtube'

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	invariant(params.videoId, 'videoId is required')

	const videoId = params.videoId
	const { commentFile, infoFile, outDir } = getYoutubeCommentOut(videoId)

	let comments: YoutubeComment[] = []
	let info: YoutubeInfo | null = null
	if (!(await fileExist(commentFile))) {
		const proxyAgent = new ProxyAgent({
			uri: PROXY,
		})
		const innertube = await createProxyYoutubeInnertube(proxyAgent)

		const youtubeInfo = await innertube.getBasicInfo(videoId)

		info = {
			title: youtubeInfo.basic_info.title || '',
			viewCount: youtubeInfo.basic_info?.view_count ?? 0,
			youtubeUrl: generateYoutubeUrlByVideoId(videoId),
		}

		const youtubeComments = await innertube.getComments(videoId)

		const mapComment = (item: any) => {
			return {
				content: item?.comment?.content?.text ?? '',
				author: item?.comment?.author?.name ?? '',
				likes: item?.comment?.like_count ?? '',
				authorThumbnail: item?.comment?.author?.thumbnails[0].url ?? '',
				publishedTime: item?.comment?.published_time ?? '',
			}
		}
		comments = youtubeComments.contents.map(mapComment)

		if (youtubeComments.has_continuation) {
			const continuation = await youtubeComments.getContinuation()
			comments = comments.concat(continuation.contents.map(mapComment))
		}

		await fsp.writeFile(commentFile, JSON.stringify(comments, null, 2))
		await fsp.writeFile(infoFile, JSON.stringify(info, null, 2))
	} else {
		const commentsStr = await fsp.readFile(commentFile, 'utf-8')
		comments = JSON.parse(commentsStr) as YoutubeComment[]

		const infoStr = await fsp.readFile(infoFile, 'utf-8')
		info = JSON.parse(infoStr) as YoutubeInfo
	}

	const { playVideoFileName } = await copyMaybeOriginalVideoToPublic({
		outDir,
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
						component={TranslateComment}
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
