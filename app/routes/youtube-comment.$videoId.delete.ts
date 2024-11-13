import fsp from 'node:fs/promises'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { YoutubeComment } from '~/types'
import { getYoutubeCommentOut } from '~/utils/youtube'

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData()
	const commentContent = formData.get('commentContent')

	if (commentContent) {
		const videoId = params.videoId
		invariant(videoId, 'videoId is required')

		const { commentFile } = getYoutubeCommentOut(videoId)

		const commentsStr = await fsp.readFile(commentFile, 'utf-8')
		const comments: YoutubeComment[] = JSON.parse(commentsStr)

		const newComments = comments.filter(
			(comment) => comment.content !== commentContent,
		)

		await fsp.writeFile(commentFile, JSON.stringify(newComments))

		return json({ success: true })
	}

	return json({ success: false })
}
