import { type ActionFunctionArgs, json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { execCommand } from '~/utils/exec'
import { getYoutubeCommentOut } from '~/utils/translate-comment'
import { generateYoutubeUrlByVideoId } from '~/utils/youtube'

export async function action({ params }: ActionFunctionArgs) {
	const videoId = params.videoId
	invariant(videoId, 'videoId is required')

	const { outDir } = getYoutubeCommentOut(videoId)
	const youtubeUrl = generateYoutubeUrlByVideoId(videoId)

	await execCommand(
		`cd ${outDir} && yt-dlp ${youtubeUrl} -f "bv*[height<=720][ext=webm]+ba[ext=webm]/b[ext=webm] / bv*+ba/b" -o "original.%(ext)s"`,
	)

	return json({ success: true })
}
