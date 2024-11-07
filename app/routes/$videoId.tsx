import fsp from 'node:fs/promises'
import path from 'node:path'
import type {
	ActionFunctionArgs,
	LoaderFunctionArgs,
	MetaFunction,
} from '@remix-run/node'
import { Form, json, useFetcher, useLoaderData } from '@remix-run/react'
import { Player } from '@remotion/player'
import { HttpsProxyAgent } from 'https-proxy-agent'
import { Languages, Trash } from 'lucide-react'
import invariant from 'tiny-invariant'
import { Button } from '~/components/ui/button'
import { PROXY } from '~/constants'
import type { Comment } from '~/types'
import { getOriginalVideoFile, getOut, getVideoComment } from '~/utils/video'
import { getYoutubeComments } from '~/utils/youtube-comments'
import { TranslateCommentVideo } from '../../src-remotion/TranslateCommentVideo'

export const meta: MetaFunction = () => {
	return [
		{ title: 'Translate Youtube Comments' },
		{ name: 'description', content: 'Translate Youtube Comments' },
	]
}

async function copyOriginalVideoToPublic(videoId: string) {
	const originalVideoFile = await getOriginalVideoFile(videoId)

	if (!originalVideoFile) throw new Error('Video file not found')

	const publicDir = path.join(process.cwd(), 'public')

	const originalFileName = path.basename(originalVideoFile)

	const destPath = path.join(publicDir, originalFileName)
	await fsp.copyFile(originalVideoFile, destPath)

	return {
		originalFileName,
	}
}

export const loader = async ({ params, request }: LoaderFunctionArgs) => {
	invariant(params.videoId, 'videoId is required')

	const videoId = params.videoId

	const { outDir, commentFile, titleFile } = getOut(videoId)
	await fsp.mkdir(outDir, { recursive: true })

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

	let title = 'Unknown Title'
	try {
		const titleStr = await fsp.readFile(titleFile, 'utf-8')
		const titleObj = JSON.parse(titleStr)
		title = titleObj.translatedTitle
	} catch (error) {
		console.log('no title file')
	}

	const { originalFileName } = await copyOriginalVideoToPublic(videoId)

	return json({
		videoId,
		comments,
		title,
		videoUrl: originalFileName,
	})
}

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData()
	const intent = formData.get('intent')
	const commentContent = formData.get('commentContent')

	if (intent === 'delete' && commentContent) {
		const videoId = params.videoId
		invariant(videoId, 'videoId is required')

		const { commentFile } = getOut(videoId)

		// 读取现有评论
		const commentsStr = await fsp.readFile(commentFile, 'utf-8')
		const comments: Comment[] = JSON.parse(commentsStr)

		// 过滤掉要删除的评论
		const newComments = comments.filter(
			(comment) => comment.content !== commentContent,
		)

		// 保存更新后的评论
		await fsp.writeFile(commentFile, JSON.stringify(newComments))

		return json({ success: true })
	}

	return json({ success: false })
}

export default function VideoCommentPage() {
	const { videoId, comments, title, videoUrl } = useLoaderData<typeof loader>()
	const fetcher = useFetcher()
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
				<Form method="post" action="render">
					<input type="hidden" name="videoUrl" value={videoUrl} />
					<Button type="submit">render</Button>
				</Form>
			</div>

			<div className="overflow-y-auto">
				<div className="text-xl p-2 flex justify-between items-center">
					<p className="text-sm">videoId : {videoId}</p>
					<Form method="post" action="translate">
						<button type="submit" className="cursor-pointer">
							<Languages />
						</button>
					</Form>
				</div>

				<div>
					{comments.map((comment) => {
						return (
							<div key={comment.content} className="p-2">
								<p className="text-sm flex items-center justify-between gap-1">
									{comment.author}

									<fetcher.Form method="post">
										<input type="hidden" name="intent" value="delete" />
										<input
											type="hidden"
											name="commentContent"
											value={comment.content}
										/>
										<button
											type="submit"
											className="cursor-pointer hover:text-red-500"
										>
											<Trash size={16} />
										</button>
									</fetcher.Form>
								</p>
								<p className="text-md">{comment.content}</p>
								<p className="text-md">{comment.translatedContent}</p>
							</div>
						)
					})}
				</div>
			</div>
		</div>
	)
}
