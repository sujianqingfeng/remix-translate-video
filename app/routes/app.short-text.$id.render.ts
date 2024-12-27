import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { webpackOverride } from '~/remotion/webpack-override'
import { createOperationDir } from '~/utils/file'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'
import { buildShortRenderData } from '~/utils/short-text'

const entryPoint = path.join(process.cwd(), 'app', 'remotion', 'short-texts', 'index.ts')
export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.shortTexts.id, id)

	const shortText = await db.query.shortTexts.findFirst({
		where,
	})
	invariant(shortText, 'shortText not found')

	const { totalDurationInFrames, audioDuration, shortTextBgFile, shortTextCoverFile, playAudioFile, compositionWidth, compositionHeight } = await buildShortRenderData(shortText)

	const inputProps = {
		wordTranscripts: shortText.wordTranscripts || [],
		littleDifficultWords: shortText.littleDifficultWords?.map((item) => item.word) || [],
		title: shortText.title,
		titleZh: shortText.titleZh,
		audioDuration,
		shortTextZh: shortText.shortTextZh,
		sentenceTranscript: shortText.sentenceTranscripts || [],
		direction: shortText.direction,
		shortTextBgFile,
		shortTextCoverFile,
		playAudioFile,
		isRemoteRender: false,
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
	composition.fps = shortText.fps
	composition.width = compositionWidth
	composition.height = compositionHeight

	const dir = await createOperationDir(id)
	const outputPath = path.join(dir, `${id}-output.mp4`)

	await renderMedia({
		codec: 'h264',
		composition,
		serveUrl: bundled,
		inputProps,
		outputLocation: outputPath,
		onProgress: throttleRenderOnProgress,
	})

	await db
		.update(schema.shortTexts)
		.set({
			outputFilePath: outputPath,
		})
		.where(eq(schema.shortTexts.id, id))

	return {}
}
