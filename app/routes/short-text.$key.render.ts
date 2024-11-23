import path from 'node:path'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import invariant from 'tiny-invariant'
import { SHORT_TEXT_AUDIO_FILE } from '~/constants'
import { webpackOverride } from '~/remotion/webpack-override'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'
import { buildRemotionRenderData } from '~/utils/short-text'

const entryPoint = path.join(process.cwd(), 'app', 'remotion', 'short-texts', 'index.ts')

export async function action({ request, params }: ActionFunctionArgs) {
	const { key } = params
	invariant(key, 'key is required')

	const formData = await request.formData()
	const fps = formData.get('fps')

	invariant(fps, 'fps is required')

	const { totalDurationInFrames, wordTranscripts, shortText, audioDuration, sentenceTranscript } = await buildRemotionRenderData({
		key,
		fps: +fps,
	})

	const inputProps = {
		wordTranscripts,
		littleDifficultWords: shortText.words.map((word) => word.word),
		playAudioName: SHORT_TEXT_AUDIO_FILE,
		title: shortText.title,
		titleZh: shortText.titleZh,
		shortTextZh: shortText.shortTextZh,
		audioDuration,
		sentenceTranscript,
		direction: shortText.direction,
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

	const width = shortText.direction ? 1920 : 1080
	const height = shortText.direction ? 1080 : 1920

	composition.durationInFrames = totalDurationInFrames
	composition.fps = +fps
	composition.width = width
	composition.height = height

	await renderMedia({
		codec: 'h264',
		composition,
		serveUrl: bundled,
		inputProps,
		outputLocation: `out/${key}/output.mp4`,
		onProgress: throttleRenderOnProgress,
	})

	return json({ success: true })
}
