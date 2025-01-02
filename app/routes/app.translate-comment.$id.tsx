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
	const checkSensitiveWordsFetcher = useFetcher()

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
		<div className="container mx-auto p-6">
			<BackPrevious />

			<div className="grid grid-cols-[1fr,400px] gap-8 mt-6">
				{/* Left Column */}
				<div className="space-y-6">
					{/* Video Player */}
					<div className="bg-card rounded-lg p-4 shadow-sm">
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

					{/* Video Info */}
					<div className="bg-card rounded-lg p-4 space-y-3 shadow-sm">
						<p className="text-sm text-muted-foreground">{download.title}</p>

						<div className="flex items-start gap-2 group cursor-pointer" onClick={() => onCopy(publishTitle)}>
							<Copy size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
							<p className="text-sm font-medium">{publishTitle}</p>
						</div>

						<div className="flex items-start gap-2 group cursor-pointer" onClick={() => onCopy(desc)}>
							<Copy size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
							<p className="text-sm text-muted-foreground whitespace-pre-line">{desc}</p>
						</div>
					</div>

					{/* Controls */}
					<div className="space-y-4">
						{/* Mode & Title Update */}
						<updateFetcher.Form method="post" action="update" className="bg-card rounded-lg p-4 shadow-sm">
							<div className="flex gap-3">
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

								<Input className="flex-1" name="translatedTitle" defaultValue={translateComment.translatedTitle || ''} placeholder="Translated Title" />

								<LoadingButtonWithState state={updateFetcher.state} idleText="Update" />
							</div>
						</updateFetcher.Form>

						{/* Action Buttons */}
						<div className="flex flex-wrap gap-3">
							{!download.author && (
								<downloadInfoFetcher.Form action="/app/downloads/download-info" method="post">
									<input name="id" value={dId} hidden readOnly />
									<LoadingButtonWithState variant="outline" state={downloadInfoFetcher.state} idleText="Download info" />
								</downloadInfoFetcher.Form>
							)}

							{download.author && !download.filePath && (
								<downloadVideoFetcher.Form action="/app/downloads/download-video" method="post">
									<input name="id" value={dId} hidden readOnly />
									<LoadingButtonWithState variant="outline" state={downloadVideoFetcher.state} idleText="Download video" />
								</downloadVideoFetcher.Form>
							)}

							<translateFetcher.Form action="translate" method="post">
								<LoadingButtonWithState variant="outline" state={translateFetcher.state} idleText="Translate" />
							</translateFetcher.Form>

							<transformFetcher.Form action="transform" method="post">
								<LoadingButtonWithState variant="outline" state={transformFetcher.state} idleText="Transform" />
							</transformFetcher.Form>

							<checkSensitiveWordsFetcher.Form action="check-sensitive-words" method="post">
								<LoadingButtonWithState variant="outline" state={checkSensitiveWordsFetcher.state} idleText="Check Sensitive Words" />
							</checkSensitiveWordsFetcher.Form>

							{download.author && download.filePath && (
								<>
									<renderFetcher.Form action="render" method="post">
										<LoadingButtonWithState variant="outline" state={renderFetcher.state} idleText="Render" />
									</renderFetcher.Form>

									<remoteRenderFetcher.Form action="remote-render" method="post">
										<LoadingButtonWithState variant="outline" state={remoteRenderFetcher.state} idleText="Remote Render" />
									</remoteRenderFetcher.Form>
								</>
							)}

							{translateComment.outputFilePath && (
								<Link to="local-download" target="_blank" rel="noopener noreferrer">
									<Button variant="outline">Download Local</Button>
								</Link>
							)}
						</div>
					</div>
				</div>

				{/* Right Column - Comments */}
				<div className="bg-card rounded-lg p-4 shadow-sm h-[calc(100vh-8rem)] overflow-y-auto">
					{translateComment.comments?.length ? (
						<Comments comments={translateComment.comments ?? []} />
					) : (
						<div className="flex flex-col gap-4 items-center justify-center h-full">
							<p className="text-muted-foreground">No comments available</p>
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
