import type { LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { ShortText } from '~/types'
import { readFileJson } from '~/utils/file'
import { downloadTaskOutput } from '~/utils/remote-render'
import { getShortTextOut } from '~/utils/short-text'

// 添加 loader 函数处理 GET 请求
export async function loader({ params }: LoaderFunctionArgs) {
	const { key } = params
	invariant(key, 'key is required')

	const { infoFile } = getShortTextOut(key)

	const info = await readFileJson<ShortText>(infoFile)

	if (!info.jobId) {
		throw new Error('jobId is not found')
	}

	const buffer = await downloadTaskOutput(info.jobId)

	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Type': 'video/mp4',
			'Content-Disposition': `attachment; filename="video-${key}.mp4"`,
		},
	})
}
