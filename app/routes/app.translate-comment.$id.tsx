import path from 'node:path'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { Link, useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { format } from 'date-fns'
import { Copy } from 'lucide-react'
import invariant from 'tiny-invariant'
import BackPrevious from '~/components/BackPrevious'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import Comments from '~/components/business/translate-comment/Comments'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { commentModeOptions } from '~/config'
import { toast } from '~/hooks/use-toast'
import type { schema } from '~/lib/drizzle'
import { NewLandscapeTranslateComment, NewPortraitTranslateComment, NewVerticalTranslateComment } from '~/remotion'
import { safeCopyFileToPublic } from '~/utils/file'
import { buildTranslateCommentRemotionRenderData } from '~/utils/translate-comment'
import { getTranslateCommentAndDownloadInfo } from '~/utils/translate-comment.server'

type Mode = (typeof schema.translateComments.$inferSelect)['mode']
function getRemotionTemplateComponent(mode: Mode) {
	const componentMap = {
		landscape: NewLandscapeTranslateComment,
		portrait: NewPortraitTranslateComment,
		vertical: NewVerticalTranslateComment,
	}
	return componentMap[mode]
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')
	const { translateComment, download } = await getTranslateCommentAndDownloadInfo(id)

	const playFilePath = translateComment.sourceFilePath || download.filePath
	let playFile = ''
	if (playFilePath) {
		const fileName = path.basename(playFilePath)
		await safeCopyFileToPublic(playFilePath)
		playFile = fileName
	}

	const render = await buildTranslateCommentRemotionRenderData({
		mode: translateComment.mode,
		fps: translateComment.fps,
		secondsForEvery30Words: translateComment.secondsForEvery30Words,
		coverDurationInSeconds: translateComment.coverDurationInSeconds,
		comments: translateComment.comments ?? [],
	})

	return { dId: translateComment.downloadId, id, download, render, translateComment, playFile }
}

export default function TranslateCommentPage() {
	const { dId, download, render, translateComment, playFile } = useLoaderData<typeof loader>()
	const downloadInfoFetcher = useFetcher()
	const downloadVideoFetcher = useFetcher()
	const downloadCommentsFetcher = useFetcher()
	const updateFetcher = useFetcher()
	const translateFetcher = useFetcher()
	const renderFetcher = useFetcher()
	const remoteRenderFetcher = useFetcher()
	const transformFetcher = useFetcher()
	const currentTime = format(translateComment.commentPullAt ?? new Date(), 'yyyy-MM-dd HH:mm')
	const desc = `原链接：${download.link}\n视频仅供娱乐，请勿过度解读\n评论权重受点赞等影响，在不同的时间，评论的内容可能不同，当前视频评论拉取时间${currentTime}`

	const publishTitle = `外网真实评论：${translateComment.translatedTitle}`

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
		<div className="w-full h-full">
			<BackPrevious />
			<div className="w-full flex gap-4 justify-center">
				<div className="flex flex-col gap-2 ">
					<div>
						<Player
							component={getRemotionTemplateComponent(translateComment.mode)}
							inputProps={{
								comments: render.remotionVideoComments,
								title: translateComment.translatedTitle || '',
								playFile,
								viewCountText: download.viewCountText || '',
								coverDurationInSeconds: translateComment.coverDurationInSeconds,
								author: download.author || '',
							}}
							durationInFrames={render.totalDurationInFrames}
							compositionWidth={render.compositionWidth}
							compositionHeight={render.compositionHeight}
							fps={translateComment.fps}
							style={{
								width: render.playerWidth,
								height: render.playerHeight,
							}}
							controls
						/>
					</div>

					<div>
						<p className="flex items-center gap-2">
							{publishTitle}
							<Copy size={16} className="cursor-pointer" onClick={() => onCopy(publishTitle)} />
						</p>
						<p className="flex items-center gap-2">
							{desc}
							<Copy size={16} className="cursor-pointer" onClick={() => onCopy(desc)} />
						</p>
					</div>

					<div className="flex gap-2">
						<updateFetcher.Form method="post" action="update">
							<div className="flex gap-2">
								<Select name="mode" defaultValue={translateComment.mode}>
									<SelectTrigger className="w-[180px]">
										<SelectValue placeholder="select mode" />
									</SelectTrigger>
									<SelectContent>
										{commentModeOptions.map((item) => (
											<SelectItem key={item.value} value={item.value}>
												{item.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Input className="w-[400px]" name="translatedTitle" defaultValue={translateComment.translatedTitle || ''} />

								<LoadingButtonWithState state={updateFetcher.state} idleText="Update" />
							</div>
						</updateFetcher.Form>
					</div>

					<div className="flex gap-2">
						{!download.author && (
							<downloadInfoFetcher.Form action="/app/downloads/download-info" method="post">
								<input name="id" value={dId} hidden readOnly />
								<LoadingButtonWithState state={downloadInfoFetcher.state} idleText="Download info" />
							</downloadInfoFetcher.Form>
						)}

						{download.author && !download.filePath && (
							<downloadVideoFetcher.Form action="/app/downloads/download-video" method="post">
								<input name="id" value={dId} hidden readOnly />
								<LoadingButtonWithState state={downloadVideoFetcher.state} idleText="Download video" />
							</downloadVideoFetcher.Form>
						)}

						<translateFetcher.Form action="translate" method="post">
							<LoadingButtonWithState state={translateFetcher.state} idleText="Translate" />
						</translateFetcher.Form>

						<transformFetcher.Form action="transform" method="post">
							<LoadingButtonWithState state={transformFetcher.state} idleText="Transform" />
						</transformFetcher.Form>
					</div>

					<div className="flex gap-2">
						{download.author && download.filePath && (
							<renderFetcher.Form action="render" method="post">
								<LoadingButtonWithState state={renderFetcher.state} idleText="Render" />
							</renderFetcher.Form>
						)}

						{download.author && download.filePath && (
							<remoteRenderFetcher.Form action="remote-render" method="post">
								<LoadingButtonWithState state={remoteRenderFetcher.state} idleText="Remote Render" />
							</remoteRenderFetcher.Form>
						)}

						{translateComment.outputFilePath && (
							<Link to="local-download" target="_blank" rel="noopener noreferrer">
								<Button>Download Local</Button>
							</Link>
						)}
					</div>
				</div>
				<div className="w-[400px] h-full overflow-y-auto">
					{translateComment.comments?.length ? (
						<Comments comments={translateComment.comments ?? []} />
					) : (
						<div className="flex flex-col gap-2">
							<p> No comments</p>
							<downloadCommentsFetcher.Form action="download-comments" method="post">
								<LoadingButtonWithState state={downloadCommentsFetcher.state} idleText="Download comments" />
							</downloadCommentsFetcher.Form>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
