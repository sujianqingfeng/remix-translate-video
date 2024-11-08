import fsp from 'node:fs/promises'
import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { Comment } from '~/types'
import { translate } from '~/utils/translate'
import { getVideoCommentOut, getYoutubeUrlByVideoId } from '~/utils/video'

export async function action({ params }: ActionFunctionArgs) {
	invariant(params.videoId, 'missing videoId')

	const videoId = params.videoId
	const { commentFile, titleFile } = getVideoCommentOut(videoId)

	const commentStr = await fsp.readFile(commentFile, 'utf-8')
	const comments: Comment[] = JSON.parse(commentStr)

	const translatedComments = await Promise.all(
		comments.map(async (comment) => {
			const translated = await translate(comment.content)
			comment.translatedContent = translated
			return comment
		}),
	)
	await fsp.writeFile(commentFile, JSON.stringify(translatedComments, null, 2))

	const titleStr = await fsp.readFile(titleFile, 'utf-8')
	const title = JSON.parse(titleStr).title
	const translatedTitle = await translate(title)
	await fsp.writeFile(
		titleFile,
		JSON.stringify({
			title,
			translatedTitle,
			publishTitle: `外网真实评论：${translatedTitle}`,
			youtubeUrl: getYoutubeUrlByVideoId(videoId),
		}),
	)

	return redirect(`/${videoId}`)
}
