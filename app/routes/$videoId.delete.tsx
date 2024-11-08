import fsp from 'node:fs/promises'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { Comment } from '~/types'
import { getVideoCommentOut } from '~/utils/video'

export async function action({ request, params }: ActionFunctionArgs) {
	const formData = await request.formData()
	const intent = formData.get('intent')
	const commentContent = formData.get('commentContent')

	if (intent === 'delete' && commentContent) {
		const videoId = params.videoId
		invariant(videoId, 'videoId is required')

		const { commentFile } = getVideoCommentOut(videoId)

		const commentsStr = await fsp.readFile(commentFile, 'utf-8')
		const comments: Comment[] = JSON.parse(commentsStr)

		const newComments = comments.filter(
			(comment) => comment.content !== commentContent,
		)

		await fsp.writeFile(commentFile, JSON.stringify(newComments))

		return json({ success: true })
	}

	return json({ success: false })
}
