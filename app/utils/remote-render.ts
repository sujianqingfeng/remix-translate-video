import { readFile } from 'node:fs/promises'
import { RENDER_ZIP_OUTPUT_FILE_NAME } from '~/constants'

const baseUrl = process.env.REMOTE_REMOTION_RENDER_API_URL
const headers = {
	Authorization: `${process.env.REMOTE_REMOTION_API_KEY}`,
}

export async function uploadRenderZipFile(zipFilePath: string) {
	const zipFile = await readFile(zipFilePath)

	const uploadFormData = new FormData()
	uploadFormData.append('file', new Blob([zipFile], { type: 'application/zip' }), RENDER_ZIP_OUTPUT_FILE_NAME)

	// Send the request with form-data
	const data: any = await fetch(`${baseUrl}/api/upload`, {
		method: 'POST',
		headers,
		body: uploadFormData,
		credentials: 'include',
	}).then((res) => res.json())

	const id = data.id as string

	if (!id) {
		throw new Error('Upload failed')
	}

	return {
		id,
	}
}

export async function addRenderTask(id: string, jobName: string) {
	return await fetch(`${baseUrl}/api/tasks/add-task`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			id,
			fileName: RENDER_ZIP_OUTPUT_FILE_NAME,
			jobName,
		}),
		credentials: 'include',
	}).then((res) => res.json() as Promise<{ id: string; jobId: string }>)
}

export async function taskStatus(jobId: string) {
	return await fetch(`${baseUrl}/api/tasks/${jobId}`, {
		headers,
		credentials: 'include',
	}).then((res) => res.json() as Promise<{ id: string; state: string; progress: number }>)
}

export async function downloadTaskOutput(jobId: string) {
	const buffer = await fetch(`${baseUrl}/api/tasks/${jobId}/download`, {
		headers,
		credentials: 'include',
	}).then((res) => res.arrayBuffer())

	return buffer
}
