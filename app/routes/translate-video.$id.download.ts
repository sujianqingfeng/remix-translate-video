import type { ActionFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { execCommand } from '~/utils/exec'
import { getTranslateVideoOut } from '~/utils/translate-video'
import { generateYoutubeUrlByVideoId } from '~/utils/youtube'

export async function action({ params }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const { outDir } = getTranslateVideoOut(id)
	const youtubeUrl = generateYoutubeUrlByVideoId(id)

	// 下载视频
	await execCommand(`cd ${outDir} && yt-dlp ${youtubeUrl} --output "original.%(ext)s"`)

	// 单独下载音频，格式为 wav，采样率 16kHz
	await execCommand(`cd ${outDir} && yt-dlp -f "ba" --extract-audio --audio-format wav --postprocessor-args "ffmpeg:-ar 16000" ${youtubeUrl} --output "audio.%(ext)s"`)

	return { success: true }
}
