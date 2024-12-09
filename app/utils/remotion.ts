import fsp from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'
import type { RenderMediaOnProgress } from '@remotion/renderer'
import { RENDER_ZIP_OUTPUT_FILE_NAME } from '~/constants'
import { createRemotionZipArchive } from './file'
import { throttle } from './timer'

export const bundleOnProgress = throttle(
	(progress: number) => {
		console.log(`Webpack bundling progress: ${progress}%`)
	},
	1000,
	{ trailing: true },
)

export const renderOnProgress: RenderMediaOnProgress = ({ progress }) => {
	console.log(`Rendering is ${progress * 100}% complete`)
}

export const throttleRenderOnProgress = throttle(renderOnProgress, 2000, {
	trailing: true,
})

export async function createRenderZipFile(renderInfo: any, bundleDir: string, renderInfoFile: string) {
	const renderInfoStream = new Readable()
	renderInfoStream.push(JSON.stringify(renderInfo))
	renderInfoStream.push(null)

	await fsp.writeFile(renderInfoFile, renderInfoStream)

	// Add zip creation logic here
	const zipPath = path.join(path.dirname(renderInfoFile), RENDER_ZIP_OUTPUT_FILE_NAME)
	await createRemotionZipArchive(bundleDir, renderInfoFile, zipPath)
	return zipPath
}
