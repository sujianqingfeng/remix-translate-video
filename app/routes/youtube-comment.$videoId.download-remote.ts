import type { LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { YoutubeInfo } from '~/types'
import { readFileJson } from '~/utils/file'
import { downloadRenderOutput } from '~/utils/remotion'
import { getYoutubeCommentOut } from '~/utils/translate-comment'

// 添加 loader 函数处理 GET 请求
export async function loader({ params }: LoaderFunctionArgs) {
	const videoId = params.videoId
	invariant(videoId, 'videoId is required')

	const { infoFile } = getYoutubeCommentOut(videoId)

	const shortText = await readFileJson<YoutubeInfo>(infoFile)

	if (!shortText.renderId) {
		throw new Error('renderId is not found')
	}

	const buffer = await downloadRenderOutput(shortText.renderId)

	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Type': 'video/mp4',
			'Content-Disposition': `attachment; filename="video-${videoId}.mp4"`,
		},
	})
}
