import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { ShortText } from '~/types'
import { readFileJson } from '~/utils/file'
import { downloadRenderOutput } from '~/utils/remotion'
import { getShortTextOut } from '~/utils/short-text'

// 添加 loader 函数处理 GET 请求
export async function loader({ params }: LoaderFunctionArgs) {
	const { key } = params
	invariant(key, 'key is required')

	const { infoFile } = getShortTextOut(key)

	const shortText = await readFileJson<ShortText>(infoFile)

	if (!shortText.renderId) {
		throw new Error('renderId is not found')
	}

	const buffer = await downloadRenderOutput(shortText.renderId)

	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Type': 'video/mp4',
			'Content-Disposition': `attachment; filename="video-${key}.mp4"`,
		},
	})
}
