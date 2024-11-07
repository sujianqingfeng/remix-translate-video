import fsp from 'node:fs/promises'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { getOriginalVideoFile } from '~/utils/video'

export async function loader({ params }: LoaderFunctionArgs) {
	const videoId = params.videoId

	if (!videoId) throw new Error('videoId is required')

	const originalVideoFile = await getOriginalVideoFile(videoId)

	if (!originalVideoFile) throw new Error('Video file not found')

	const stream = await fsp.readFile(originalVideoFile)

	return new Response(stream, {
		headers: {
			'Content-Type': 'video/mp4',
			'Content-Length': stream.length.toString(),
			'Cross-Origin-Resource-Policy': 'cross-origin',
		},
	})
}
