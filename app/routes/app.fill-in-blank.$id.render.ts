import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { webpackOverride } from '~/remotion/webpack-override'
import { createOperationDir } from '~/utils/file'
import { buildFillInBlankRenderData } from '~/utils/fill-in-blank'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'

const entryPoint = path.join(process.cwd(), 'app', 'remotion', 'fill-in-blank', 'index.ts')

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.fillInBlanks.id, id)

	const fillInBlank = await db.query.fillInBlanks.findFirst({
		where,
	})
	invariant(fillInBlank, 'fillInBlank not found')

	const { remotionFillInBlankSentences, totalDurationInFrames, compositionWidth, compositionHeight } = buildFillInBlankRenderData({
		sentences: fillInBlank.sentences,
		fps: fillInBlank.fps,
	})

	const inputProps = {
		sentences: remotionFillInBlankSentences,
	}

	const bundled = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
	})

	const composition = await selectComposition({
		serveUrl: bundled,
		id: 'FillInBlank',
		inputProps,
	})

	composition.durationInFrames = totalDurationInFrames
	composition.fps = fillInBlank.fps
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
		.update(schema.fillInBlanks)
		.set({
			outputFilePath: outputPath,
		})
		.where(eq(schema.fillInBlanks.id, id))

	return {}
}
