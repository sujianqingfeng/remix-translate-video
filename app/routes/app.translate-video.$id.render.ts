import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { webpackOverride } from '~/remotion/webpack-override'
import { createDownloadDir } from '~/utils/file'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'

const entryPoint = path.join(process.cwd(), 'app', 'remotion', 'translate-videos', 'index.ts')

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const index = formData.get('index')
	invariant(typeof index === 'string', 'index is required')

	const indexNum = Number.parseInt(index, 10)
	invariant(!Number.isNaN(indexNum), 'index must be a number')

	const where = eq(schema.translateVideos.id, id)

	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})
	invariant(translateVideo, 'translateVideo not found')

	const { transcripts } = translateVideo

	const bundled = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
	})

	const inputProps = {
		transcripts,
		playVideoFileName: 0,
	}

	const composition = await selectComposition({
		serveUrl: bundled,
		id: 'TranslateVideos',
		inputProps,
	})

	composition.durationInFrames = 1000
	composition.fps = 30

	const dir = await createDownloadDir(id)
	const outputPath = path.join(dir, 'output.mp4')

	await renderMedia({
		codec: 'h264',
		composition,
		serveUrl: bundled,
		inputProps,
		outputLocation: outputPath,
		concurrency: 2,
		onProgress: throttleRenderOnProgress,
	})

	return { success: true }
}
