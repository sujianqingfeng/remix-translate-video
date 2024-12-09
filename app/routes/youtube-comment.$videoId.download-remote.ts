import type { LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { YoutubeInfo } from '~/types'
import { readFileJson } from '~/utils/file'
import { downloadTaskOutput } from '~/utils/remote-render'
import { getYoutubeCommentOut } from '~/utils/translate-comment'

// 添加 loader 函数处理 GET 请求
export async function loader({ params }: LoaderFunctionArgs) {
	const videoId = params.videoId
	invariant(videoId, 'videoId is required')

	const { infoFile } = getYoutubeCommentOut(videoId)
	const info = await readFileJson<YoutubeInfo>(infoFile)

	if (!info.jobId) {
		throw new Error('jobId is not found')
	}

	const buffer = await downloadTaskOutput(info.jobId)

	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Type': 'video/mp4',
			'Content-Disposition': `attachment; filename="video-${videoId}.mp4"`,
		},
	})
}
