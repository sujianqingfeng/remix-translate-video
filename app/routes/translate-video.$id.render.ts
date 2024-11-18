import fsp from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import invariant from 'tiny-invariant'
import { webpackOverride } from '~/remotion/webpack-override'
import type { Transcript } from '~/types'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'
import { cleanupRemotionTempFiles } from '~/utils/remotion'
import {
	getTranslateVideoFullId,
	getTranslateVideoOut,
} from '~/utils/translate-video'

const entryPoint = path.join(
	process.cwd(),
	'app',
	'remotion',
	'translate-videos',
	'index.ts',
)

export async function action({ params, request }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const formData = await request.formData()
	const fps = formData.get('fps')
	const totalDurationInFrames = formData.get('totalDurationInFrames')
	const playVideoFileName = formData.get('playVideoFileName')

	invariant(fps, 'fps is required')
	invariant(totalDurationInFrames, 'totalDurationInFrames is required')
	invariant(playVideoFileName, 'playVideoFileName is required')

	const { transcriptsFile } = getTranslateVideoOut(id)
	const transcriptsStr = await fsp.readFile(transcriptsFile, 'utf-8')
	const transcripts: Transcript[] = JSON.parse(transcriptsStr)

	const bundled = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
	})

	const inputProps = {
		transcripts,
		playVideoFileName,
	}

	const composition = await selectComposition({
		serveUrl: bundled,
		id: 'TranslateVideos',
		inputProps,
	})

	composition.durationInFrames = +totalDurationInFrames
	composition.fps = +fps

	try {
		await renderMedia({
			codec: 'h264',
			composition,
			serveUrl: bundled,
			inputProps,
			outputLocation: `out/${getTranslateVideoFullId(id)}/output.mp4`,
			concurrency: 2,
			onProgress: throttleRenderOnProgress,
		})

		return json({ success: true })
	} catch (error) {
		await cleanupRemotionTempFiles()
		throw error
	} finally {
		await cleanupRemotionTempFiles()
	}
}
