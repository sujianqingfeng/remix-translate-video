import path from 'node:path'
import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { bundle } from '@remotion/bundler'
import { renderMedia, selectComposition } from '@remotion/renderer'
import { eq } from 'drizzle-orm'
import { db, schema } from '~/lib/drizzle'
import { webpackOverride } from '~/remotion/webpack-override'
import { createOperationDir } from '~/utils/file'
import { calculateDurations, getCompositionId, getVideoConfig, prepareVideoProps } from '~/utils/general-comment'
import { bundleOnProgress, throttleRenderOnProgress } from '~/utils/remotion'

// Redirect GET requests back to the parent route
export const loader = async ({ params }: LoaderFunctionArgs) => {
	return redirect(`/app/general-comment/${params.id}`)
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const { id } = params
	if (!id) throw new Error('Comment ID is required')

	const formData = await request.formData()
	const mode = formData.get('mode') as 'landscape' | 'portrait' | 'vertical'
	const fps = Number(formData.get('fps'))
	const coverDurationInSeconds = Number(formData.get('coverDurationInSeconds'))
	const secondsForEvery30Words = Number(formData.get('secondsForEvery30Words'))

	// Get the comment
	const comment = await db.query.generalComments.findFirst({
		where: eq(schema.generalComments.id, id),
	})

	if (!comment) throw new Error('Comment not found')

	// Update the comment with new settings
	await db
		.update(schema.generalComments)
		.set({
			fps,
			coverDurationInSeconds,
			secondsForEvery30Words,
		})
		.where(eq(schema.generalComments.id, id))

	const durations = calculateDurations({
		...comment,
		fps,
		coverDurationInSeconds,
		secondsForEvery30Words,
	})
	const videoConfig = getVideoConfig(mode)

	try {
		const entryPoint = path.join(process.cwd(), 'app', 'remotion', 'general-comment', 'index.ts')

		// Bundle the video components
		const bundleLocation = await bundle({
			entryPoint,
			webpackOverride,
			onProgress: bundleOnProgress,
		})

		// Prepare input props for the video
		const inputProps = prepareVideoProps(comment, durations)

		// Select the composition
		const compositionId = getCompositionId(mode)
		const composition = await selectComposition({
			serveUrl: bundleLocation,
			id: compositionId,
			inputProps,
		})

		// Set composition properties
		composition.durationInFrames = durations.totalDurationInSeconds * durations.fps
		composition.fps = durations.fps
		composition.width = videoConfig.width
		composition.height = videoConfig.height

		const dir = await createOperationDir(id)
		const outputPath = path.join(dir, `${id}-output.mp4`)

		// Render the video
		const renderId = await renderMedia({
			composition,
			serveUrl: bundleLocation,
			codec: 'h264',
			outputLocation: outputPath,
			inputProps,
			...videoConfig,
			onProgress: throttleRenderOnProgress,
		})

		return { success: true, renderId }
	} catch (error) {
		console.error('Render error:', error)
		return { success: false, error: 'Failed to render video' }
	}
}
