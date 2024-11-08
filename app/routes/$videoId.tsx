import fsp from 'node:fs/promises'
import path from 'node:path'
import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { json, useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { Languages } from 'lucide-react'
import invariant from 'tiny-invariant'
import { CommentsList } from '~/components/business/CommentsList'
import { Button } from '~/components/ui/button'
import { PROXY } from '~/constants'
import { TranslateCommentVideo } from '~/remotion/translate-comments/TranslateCommentVideo'
import type { Comment } from '~/types'
import { getOriginalVideoFile, getOut, getVideoComment } from '~/utils/video'
import { getYoutubeComments } from '~/utils/youtube-comments'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Translate Youtube Comments' },
		{ name: 'description', content: 'Translate Youtube Comments' },
	]
}

async function copyOriginalVideoToPublic(videoId: string) {
	const originalVideoFile = await getOriginalVideoFile(videoId)

	if (!originalVideoFile) {
		return {
			originalFileName: '',
		}
	}

	const publicDir = path.join(process.cwd(), 'public')

	const originalFileName = path.basename(originalVideoFile)

	const destPath = path.join(publicDir, originalFileName)
	await fsp.copyFile(originalVideoFile, destPath)

	return {
		originalFileName,
	}
}

async function fetchComments({
	videoId,
	commentFile,
	titleFile,
}: { videoId: string; commentFile: string; titleFile: string }) {
	let comments: Comment[] = []
	try {
		const str = await fsp.readFile(commentFile, 'utf-8')
		comments = JSON.parse(str)
	} catch (e) {
		console.log('no comments file')
	}

	if (comments.length === 0) {
		const { comments: youtubeComments, title } = await getYoutubeComments({
			videoId,
			agent: new HttpsProxyAgent(PROXY),
		})

		comments = youtubeComments
		await fsp.writeFile(commentFile, JSON.stringify(comments))
		await fsp.writeFile(
			titleFile,
			JSON.stringify({
				title,
			}),
		)
	}

	return { comments }
}

async function fetchTitle({ titleFile }: { titleFile: string }) {
	let title = 'Unknown Title'
	try {
		const titleStr = await fsp.readFile(titleFile, 'utf-8')
		const titleObj = JSON.parse(titleStr)
		title = titleObj.translatedTitle
	} catch (error) {
		console.log('no title file')
	}

	return { title }
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	invariant(params.videoId, 'videoId is required')

	const videoId = params.videoId

	const { outDir, commentFile, titleFile } = getOut(videoId)
	await fsp.mkdir(outDir, { recursive: true })

	const { comments } = await fetchComments({ videoId, commentFile, titleFile })
	const { title } = await fetchTitle({ titleFile })
	const { originalFileName } = await copyOriginalVideoToPublic(videoId)

	return json({
		videoId,
		comments,
		title,
		videoUrl: originalFileName,
	})
}

export default function VideoCommentPage() {
	const { videoId, comments, title, videoUrl } = useLoaderData<typeof loader>()
	const renderFetcher = useFetcher()
	const translateFetcher = useFetcher()
	const { videoComments, totalDurationInFrames } = getVideoComment(comments)

	return (
		<div className="p-4 h-screen w-full flex justify-center gap-2">
			<div className="flex flex-col gap-2">
				<Player
					component={TranslateCommentVideo}
					inputProps={{
						comments: videoComments,
						title,
						videoSrc: videoUrl,
					}}
					durationInFrames={totalDurationInFrames}
					compositionWidth={1280}
					compositionHeight={720}
					fps={30}
					style={{
						width: 1280,
						height: 720,
					}}
					controls
				/>

				<p>{title}</p>
				<renderFetcher.Form method="post" action="render">
					<input type="hidden" name="videoUrl" value={videoUrl} />
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

				<CommentsList comments={comments} />
			</div>
		</div>
	)
}
