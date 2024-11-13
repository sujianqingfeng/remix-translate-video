import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { execCommand } from '~/utils/exec'
import { getTranslateVideoOut } from '~/utils/translate-video'
import { generateYoutubeUrlByVideoId } from '~/utils/youtube'

export async function action({ params }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const { outDir } = getTranslateVideoOut(id)
	const youtubeUrl = generateYoutubeUrlByVideoId(id)

	await execCommand(`cd ${outDir} && yt-dlp ${youtubeUrl}`)

	return json({ success: true })
}
