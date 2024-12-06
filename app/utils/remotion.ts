import fsp from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'
import type { RenderMediaOnProgress } from '@remotion/renderer'
import { fetch } from 'undici'
import { REMOTION_ZIP_OUTPUT_FILE_NAME } from '~/constants'
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
	const zipPath = path.join(path.dirname(renderInfoFile), REMOTION_ZIP_OUTPUT_FILE_NAME)
	await createRemotionZipArchive(bundleDir, renderInfoFile, zipPath)
	return zipPath
}

export async function uploadRenderZipFile(zipFilePath: string) {
	const zipFile = await fsp.readFile(zipFilePath)
	// Create FormData and append the zip file
	const uploadFormData = new FormData()
	uploadFormData.append('file', new Blob([zipFile], { type: 'application/zip' }), REMOTION_ZIP_OUTPUT_FILE_NAME)

	const baseUrl = process.env.REMOTE_REMOTION_RENDER_API_URL
	const headers = {
		Authorization: `${process.env.REMOTE_REMOTION_API_KEY}`,
	}

	// Send the request with form-data
	const data: any = await fetch(`${baseUrl}/api/upload`, {
		method: 'POST',
		headers,
		// @ts-ignore - FormData type mismatch between node and browser
		body: uploadFormData,
	}).then((res) => res.json())

	const id = data.id as string

	if (!id) {
		throw new Error('Upload failed')
	}

	const renderData: any = await fetch(`${baseUrl}/api/remotion/render`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id,
			fileName: REMOTION_ZIP_OUTPUT_FILE_NAME,
		}),
	}).then((res) => res.json())

	return renderData
}
