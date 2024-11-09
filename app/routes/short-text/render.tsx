import path from 'node:path'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { webpackOverride } from '~/remotion/webpack-override'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'
import { getShortTexts, getTotalDurationInFrames } from '~/utils/short-text'

const str =
	'crowded, colleagues, experiences, journey, subway, classmates, knowledge'

const littleDifficultWords = str.split(',').map((word) => word.trim())

const entryPoint = path.join(
	process.cwd(),
	'app',
	'remotion',
	'short-texts',
	'index.ts',
)

export async function action({ request, params }: ActionFunctionArgs) {
	const texts = await getShortTexts()
	const totalDurationInFrames = getTotalDurationInFrames(texts)

	const inputProps = {
		texts,
		littleDifficultWords,
	}

	const bundled = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
	})

	const composition = await selectComposition({
		serveUrl: bundled,
		id: 'ShortTexts',
		inputProps,
	})

	composition.durationInFrames = totalDurationInFrames

	await renderMedia({
		codec: 'h264',
		composition,
		serveUrl: bundled,
		inputProps,
		outputLocation: 'out/short-text/output.mp4',
		onProgress: throttleRenderOnProgress,
	})

	return json({ success: true })
}
