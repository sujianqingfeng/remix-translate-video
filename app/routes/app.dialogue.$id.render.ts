import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { webpackOverride } from '~/remotion/webpack-override'
import { buildDialogueRenderData } from '~/utils/dialogue'
import { createOperationDir } from '~/utils/file'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'

const entryPoint = path.join(process.cwd(), 'app', 'remotion', 'dialogue', 'index.ts')

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.dialogues.id, id)
	const dialogue = await db.query.dialogues.findFirst({
		where,
	})
	invariant(dialogue, 'dialogue not found')

	const { remotionDialogues, totalDurationInFrames, compositionWidth, compositionHeight } = buildDialogueRenderData({
		dialogues: dialogue.dialogues,
		fps: dialogue.fps,
	})

	const inputProps = {
		dialogues: remotionDialogues,
	}

	const bundled = await bundle({
		entryPoint,
		webpackOverride,
		onProgress: bundleOnProgress,
	})

	const composition = await selectComposition({
		serveUrl: bundled,
		id: 'Dialogue',
		inputProps,
	})

	composition.durationInFrames = totalDurationInFrames
	composition.fps = dialogue.fps
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
		.update(schema.dialogues)
		.set({
			outputFilePath: outputPath,
		})
		.where(eq(schema.dialogues.id, id))

	return {}
}
