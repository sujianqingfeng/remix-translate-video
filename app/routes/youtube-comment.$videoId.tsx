import fsp from 'node:fs/promises'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { format } from 'date-fns'
import { Copy, Languages, LoaderCircle } from 'lucide-react'
import invariant from 'tiny-invariant'
import { ProxyAgent } from 'undici'
import BackPrevious from '~/components/BackPrevious'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import { CommentsList } from '~/components/business/CommentsList'
import { Button } from '~/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { commentModeOptions } from '~/config'
import { PROXY } from '~/constants'
import { toast } from '~/hooks/use-toast'
import { PortraitTranslateComment, TranslateComment, VerticalTranslateComment } from '~/remotion'
import type { YoutubeInfo } from '~/types'
import { copyMaybeOriginalVideoToPublic } from '~/utils'
import { fileExist } from '~/utils/file'
import { taskStatus } from '~/utils/remote-render'
import { buildRemotionRenderData, getYoutubeCommentOut } from '~/utils/translate-comment'
import { createProxyYoutubeInnertube, generateYoutubeUrlByVideoId } from '~/utils/youtube'

function getRemotionTemplateComponent(mode: YoutubeInfo['mode']) {
	const componentMap = {
		landscape: TranslateComment,
		portrait: PortraitTranslateComment,
		vertical: VerticalTranslateComment,
	}
	return componentMap[mode]
}

async function fetchVideoInfo(videoId: string): Promise<YoutubeInfo> {
	const proxyAgent = new ProxyAgent({
		uri: PROXY,
	})
	const innertube = await createProxyYoutubeInnertube(proxyAgent)
	const youtubeInfo = await innertube.getBasicInfo(videoId)

	return {
		author: youtubeInfo.basic_info.author || '',
		title: youtubeInfo.basic_info.title || '',
		viewCount: youtubeInfo.basic_info?.view_count ?? 0,
		youtubeUrl: generateYoutubeUrlByVideoId(videoId),
		mode: 'landscape',
	}
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	invariant(params.videoId, 'videoId is required')

	const videoId = params.videoId
	const { infoFile, outDir } = getYoutubeCommentOut(videoId)

	let info: YoutubeInfo | null = null
	if (!(await fileExist(infoFile))) {
		info = await fetchVideoInfo(videoId)
		await fsp.writeFile(infoFile, JSON.stringify(info, null, 2))
	} else {
		const infoStr = await fsp.readFile(infoFile, 'utf-8')
		info = JSON.parse(infoStr) as YoutubeInfo
	}

	const { playVideoFileName } = await copyMaybeOriginalVideoToPublic({
		outDir,
	})

	const { fps, playerHeight, playerWidth, compositionHeight, compositionWidth, totalDurationInFrames, coverDuration, remotionVideoComments } = await buildRemotionRenderData({
		videoId,
		mode: info.mode,
	})

	const { jobId } = info
	let renderProgress = 0
	let renderState = ''
	if (jobId) {
		const { progress, state } = await taskStatus(jobId)
		renderProgress = progress
		renderState = state
	}

	return {
		videoId,
		info,
		fps,
		playVideoFileName,
		remotionVideoComments,
		totalDurationInFrames,
		coverDuration,
		playerHeight,
		playerWidth,
		compositionHeight,
		compositionWidth,
		renderProgress,
		renderState,
		jobId,
	}
}

export default function VideoCommentPage() {
	const {
		videoId,
		info,
		playVideoFileName,
		fps,
		totalDurationInFrames,
		coverDuration,
		remotionVideoComments,
		playerHeight,
		playerWidth,
		compositionHeight,
		compositionWidth,
		renderProgress,
		renderState,
		jobId,
	} = useLoaderData<typeof loader>()

	const renderFetcher = useFetcher()
	const translateFetcher = useFetcher()
	const downloadFetcher = useFetcher()
	const downloadCommentsFetcher = useFetcher()
	const modeFetcher = useFetcher()
	const convertFetcher = useFetcher()
	const remoteRenderFetcher = useFetcher()

	const currentTime = format(new Date(), 'yyyy-MM-dd HH:mm')
	const desc = `原链接：${info.youtubeUrl}\n视频仅供娱乐，请勿过度解读\n评论权重受点赞等影响，在不同的时间，评论的内容可能不同，当前视频评论拉取时间${currentTime}`

	const onCopy = async (text?: string) => {
		if (!text) {
			return
		}
		await navigator.clipboard.writeText(text)
		toast({
			title: 'copy successful!',
		})
	}

	return (
		<div className="p-4 h-screen w-full ">
			<div className="flex items-center gap-2">
				<BackPrevious />

				<modeFetcher.Form method="post">
					<Select
						defaultValue={info.mode}
						onValueChange={(value) => {
							modeFetcher.submit({ mode: value }, { method: 'post', action: 'mode' })
						}}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Select mode" />
						</SelectTrigger>
						<SelectContent>
							{commentModeOptions.map((item) => (
								<SelectItem key={item.value} value={item.value}>
									{item.label}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</modeFetcher.Form>
			</div>

			<div className="flex mt-2 justify-center gap-2">
				<div className="flex flex-col gap-2">
					<Player
						component={getRemotionTemplateComponent(info.mode)}
						inputProps={{
							comments: remotionVideoComments,
							title: info.translatedTitle,
							videoSrc: playVideoFileName,
							viewCount: info.viewCount,
							coverDuration,
							author: info.author,
						}}
						durationInFrames={totalDurationInFrames}
						compositionWidth={compositionWidth}
						compositionHeight={compositionHeight}
						fps={fps}
						style={{
							width: playerWidth,
							height: playerHeight,
						}}
						controls
					/>

					<p>{info.title}</p>
					<p>{info.translatedTitle}</p>
					<p className="flex items-center gap-2">
						{info.publishTitle}

						<Copy size={16} className="cursor-pointer" onClick={() => onCopy(info.publishTitle)} />
					</p>

					<p className="flex items-center gap-2">
						{desc}
						<Copy size={16} className="cursor-pointer" onClick={() => onCopy(desc)} />
					</p>

					{jobId && (
						<div className="flex items-center gap-2">
							<p>Remote remotion render:{renderProgress}</p>
							<p>Remote remotion render:{renderState}</p>
						</div>
					)}

					<div className="flex items-center gap-2">
						{!playVideoFileName && (
							<downloadFetcher.Form method="post" action="download">
								<LoadingButtonWithState state={downloadFetcher.state} idleText="Download" />
							</downloadFetcher.Form>
						)}

						<convertFetcher.Form method="post" action="convert">
							<LoadingButtonWithState state={convertFetcher.state} idleText="Convert" />
						</convertFetcher.Form>

						<renderFetcher.Form method="post" action="render">
							<input type="hidden" name="playVideoFileName" value={playVideoFileName} />
							<LoadingButtonWithState state={renderFetcher.state} idleText="Render" />
						</renderFetcher.Form>

						<remoteRenderFetcher.Form method="post" action="remote-render">
							<input type="hidden" name="playVideoFileName" value={playVideoFileName} />
							<LoadingButtonWithState state={remoteRenderFetcher.state} idleText="Remote Render" />
						</remoteRenderFetcher.Form>

						<Link to="download-remote" target="_blank" rel="noopener noreferrer">
							<Button>Download Remote Video</Button>
						</Link>
					</div>
				</div>

				<div className="overflow-y-auto">
					<div className="text-xl p-2 flex justify-between items-center">
						<p className="text-sm">videoId : {videoId}</p>
						<translateFetcher.Form method="post" action="translate">
							<button type="submit" className="cursor-pointer" disabled={translateFetcher.state !== 'idle'}>
								{translateFetcher.state === 'submitting' ? <LoaderCircle className="animate-spin" /> : <Languages />}
							</button>
						</translateFetcher.Form>
					</div>

					{remotionVideoComments.length ? (
						<CommentsList comments={remotionVideoComments} />
					) : (
						<div className="flex flex-col gpa-2 justify-center items-center">
							<p>No comments</p>

							<downloadCommentsFetcher.Form method="post" action="download-comments">
								<LoadingButtonWithState state={downloadCommentsFetcher.state} idleText="Download Comments" />
							</downloadCommentsFetcher.Form>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
