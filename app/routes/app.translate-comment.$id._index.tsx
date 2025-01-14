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
import { LandscapeTranslateComment, PortraitTranslateComment, VerticalTranslateComment } from '~/remotion'
import { safeCopyFileToPublic } from '~/utils/file'
import { buildTranslateCommentRemotionRenderData } from '~/utils/translate-comment'
import { getTranslateCommentAndDownloadInfo } from '~/utils/translate-comment.server'

type Mode = (typeof schema.translateComments.$inferSelect)['mode']
function getRemotionTemplateComponent(mode: Mode) {
	const componentMap = {
		landscape: LandscapeTranslateComment,
		portrait: PortraitTranslateComment,
		vertical: VerticalTranslateComment,
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
	const desc = `原链接：${download.link}\n视频仅供娱乐，请勿过度解读\n评论权重受点赞等影响，在不同的时间，评论的内容可能不同，当前视频评论拉取时间${currentTime}\n虽然评论是真实的，但是内容不一定是真的，大家注意分辨。`

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
		<div className="h-[calc(100vh-2rem)] overflow-hidden bg-gradient-to-br from-background via-background to-muted/10 px-8 py-6">
			<BackPrevious />

			<div className="grid grid-cols-[1fr,400px] gap-10 mt-6 h-[calc(100vh-8rem)]">
				{/* Left Column */}
				<div className="space-y-8 overflow-y-auto pr-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
					{/* Video Player */}
					<div className="bg-background border rounded-xl overflow-hidden">
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
								width: '100%',
								height: 'auto',
								aspectRatio: `${render.compositionWidth} / ${render.compositionHeight}`,
							}}
							controls
						/>
					</div>

					{/* Video Info */}
					<div className="bg-background border rounded-xl divide-y">
						<div className="p-5">
							<p className="text-sm text-muted-foreground/90 mb-4">{download.title}</p>

							<button
								type="button"
								className="flex items-start gap-3 group cursor-pointer w-full text-left hover:bg-accent p-2 rounded-md transition-colors"
								onClick={() => onCopy(publishTitle)}
								onKeyDown={(e) => e.key === 'Enter' && onCopy(publishTitle)}
							>
								<Copy size={16} className="opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
								<p className="text-sm font-medium">{publishTitle}</p>
							</button>

							<button
								type="button"
								className="flex items-start gap-3 group cursor-pointer w-full text-left hover:bg-accent p-2 rounded-md transition-colors"
								onClick={() => onCopy(desc)}
								onKeyDown={(e) => e.key === 'Enter' && onCopy(desc)}
							>
								<Copy size={16} className="opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
								<p className="text-sm text-muted-foreground/90 whitespace-pre-line">{desc}</p>
							</button>
						</div>

						{/* Controls */}
						<div className="divide-y">
							{/* Mode & Title Update */}
							<updateFetcher.Form method="post" action="update">
								<div className="flex gap-3 p-5">
									<Select name="mode" defaultValue={translateComment.mode}>
										<SelectTrigger className="w-[140px]">
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
							<div className="p-5">
								<div className="flex flex-wrap gap-2">
									{!download.author && (
										<downloadInfoFetcher.Form action="/app/downloads/download-info" method="post">
											<input name="id" value={dId} hidden readOnly />
											<LoadingButtonWithState variant="secondary" size="sm" state={downloadInfoFetcher.state} idleText="Download info" />
										</downloadInfoFetcher.Form>
									)}

									{download.author && !download.filePath && (
										<downloadVideoFetcher.Form action="/app/downloads/download-video" method="post">
											<input name="id" value={dId} hidden readOnly />
											<LoadingButtonWithState variant="secondary" size="sm" state={downloadVideoFetcher.state} idleText="Download video" />
										</downloadVideoFetcher.Form>
									)}

									<translateFetcher.Form action="translate" method="post">
										<LoadingButtonWithState variant="secondary" size="sm" state={translateFetcher.state} idleText="Translate" />
									</translateFetcher.Form>

									<transformFetcher.Form action="transform" method="post">
										<LoadingButtonWithState variant="secondary" size="sm" state={transformFetcher.state} idleText="Transform" />
									</transformFetcher.Form>

									<checkSensitiveWordsFetcher.Form action="check-sensitive-words" method="post">
										<LoadingButtonWithState variant="secondary" size="sm" state={checkSensitiveWordsFetcher.state} idleText="Check Sensitive Words" />
									</checkSensitiveWordsFetcher.Form>

									{download.author && download.filePath && (
										<>
											<renderFetcher.Form action="render" method="post">
												<LoadingButtonWithState variant="secondary" size="sm" state={renderFetcher.state} idleText="Render" />
											</renderFetcher.Form>

											<remoteRenderFetcher.Form action="remote-render" method="post">
												<LoadingButtonWithState variant="secondary" size="sm" state={remoteRenderFetcher.state} idleText="Remote Render" />
											</remoteRenderFetcher.Form>
										</>
									)}

									{translateComment.outputFilePath && (
										<Link to="local-download" target="_blank" rel="noopener noreferrer">
											<Button variant="secondary" size="sm">
												Download Local
											</Button>
										</Link>
									)}

									<Link to="cover">
										<Button variant="secondary" size="sm">
											Cover
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Right Column - Comments */}
				<div className="bg-background border rounded-xl h-full overflow-hidden flex flex-col">
					<div className="px-5 py-4 border-b bg-muted/5">
						<h3 className="font-medium text-lg">Comments</h3>
					</div>
					<div className="flex-1 overflow-y-auto p-5">
						{translateComment.comments?.length ? (
							<Comments comments={translateComment.comments ?? []} />
						) : (
							<div className="flex flex-col gap-4 items-center justify-center h-full">
								<p className="text-muted-foreground/90">No comments available</p>
								<downloadCommentsFetcher.Form action="download-comments" method="post">
									<LoadingButtonWithState variant="secondary" state={downloadCommentsFetcher.state} idleText="Download comments" />
								</downloadCommentsFetcher.Form>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
