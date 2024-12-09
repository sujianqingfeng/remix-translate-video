import type { LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { readFileJson } from '~/utils/file'
import { downloadTaskOutput } from '~/utils/remote-render'
import { getTranslateVideoOut } from '~/utils/translate-video'

// 添加 loader 函数处理 GET 请求
export async function loader({ params }: LoaderFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const { infoFile } = getTranslateVideoOut(id)
	const info = await readFileJson<any>(infoFile)

	if (!info.jobId) {
		throw new Error('jobId is not found')
	}

	const buffer = await downloadTaskOutput(info.jobId)

	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Type': 'video/mp4',
			'Content-Disposition': `attachment; filename="video-${id}.mp4"`,
		},
	})
}
