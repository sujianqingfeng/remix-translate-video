import fs from 'node:fs'
import path from 'node:path'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import LoadingButtonWithState from '~/components/LoadingButtonWithState'
import Comments from '~/components/business/translate-comment/Comments'
import { PUBLIC_DIR } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { PortraitTranslateComment, TranslateComment, VerticalTranslateComment } from '~/remotion'
import { copyFileToPublic } from '~/utils/file'
import { buildTranslateCommentRemotionRenderData } from '~/utils/translate-comment'

type Mode = (typeof schema.translateComments.$inferSelect)['mode']
function getRemotionTemplateComponent(mode: Mode) {
	const componentMap = {
		landscape: TranslateComment,
		portrait: PortraitTranslateComment,
		vertical: VerticalTranslateComment,
	}
	return componentMap[mode]
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const translateComment = await db.query.translateComments.findFirst({
		where: eq(schema.translateComments.id, id),
	})

	if (!translateComment) {
		throw new Error('id is not correct')
	}

	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, translateComment.downloadId),
	})

	if (!download) {
		throw new Error('download is not correct')
	}

	if (download.filePath) {
		const fileName = path.basename(download.filePath)
		const destPath = path.join(PUBLIC_DIR, fileName)
		if (!fs.existsSync(destPath)) {
			await copyFileToPublic({
				filePath: download.filePath,
			})
		}
	}

	const render = await buildTranslateCommentRemotionRenderData({
		mode: translateComment.mode,
		fps: translateComment.fps,
		secondsForEvery30Words: translateComment.secondsForEvery30Words,
		coverDurationInSeconds: translateComment.coverDurationInSeconds,
		comments: translateComment.comments ?? [],
	})

	return { dId: translateComment.downloadId, id, download, render, translateComment }
}

export default function TranslateCommentPage() {
	const { dId, download, render, translateComment } = useLoaderData<typeof loader>()
	const downloadInfoFetcher = useFetcher()
	const downloadVideoFetcher = useFetcher()
	const downloadCommentsFetcher = useFetcher()

	return (
		<div className="w-full h-full flex gap-2">
			<div className="flex flex-col gap-2 flex-1">
				<div>
					<Player
						component={getRemotionTemplateComponent(translateComment.mode)}
						inputProps={{
							comments: render.remotionVideoComments,
							title: translateComment.translatedTitle || '',
							videoSrc: '',
							viewCount: download.viewCountText || '',
							coverDuration: translateComment.coverDurationInSeconds,
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
				<div className="flex gap-2">
					<downloadInfoFetcher.Form action="/app/downloads/download-info" method="post">
						<input name="id" value={dId} hidden readOnly />
						<LoadingButtonWithState state={downloadInfoFetcher.state} idleText="Download info" />
					</downloadInfoFetcher.Form>

					<downloadVideoFetcher.Form action="/app/downloads/download-video" method="post">
						<input name="id" value={dId} hidden readOnly />
						<LoadingButtonWithState state={downloadVideoFetcher.state} idleText="Download video" />
					</downloadVideoFetcher.Form>
				</div>
			</div>
			<div className="w-[400px] h-full overflow-y-auto">
				{translateComment.comments?.length ? (
					<Comments comments={translateComment.comments ?? []} />
				) : (
					<div>
						<p> No comments</p>
						<downloadCommentsFetcher.Form action="download-comments" method="post">
							<LoadingButtonWithState state={downloadCommentsFetcher.state} idleText="Download comments" />
						</downloadCommentsFetcher.Form>
					</div>
				)}
			</div>
		</div>
	)
}
