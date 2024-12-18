import { readFile } from 'node:fs/promises'
import { RENDER_ZIP_OUTPUT_FILE_NAME } from '~/constants'

const baseUrl = process.env.REMOTE_REMOTION_RENDER_API_URL
const headers = {
	Authorization: `${process.env.REMOTE_REMOTION_API_KEY}`,
}

const CHUNK_SIZE = 20 * 1024 * 1024

export async function uploadRenderZipFile(zipFilePath: string) {
	const zipFile = await readFile(zipFilePath)
	const totalChunks = Math.ceil(zipFile.length / CHUNK_SIZE)
	let uploadId: string | null = null

	// Initialize multipart upload
	const initResponse = await fetch(`${baseUrl}/api/upload/init`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			fileName: RENDER_ZIP_OUTPUT_FILE_NAME,
			fileSize: zipFile.length,
		}),
		credentials: 'include',
	}).then((res) => res.json())

	uploadId = initResponse.uploadId

	if (!uploadId) {
		throw new Error('Failed to initialize upload')
	}

	// Upload chunks
	const chunks: Array<{ partNumber: number; etag: string }> = []

	for (let i = 0; i < totalChunks; i++) {
		const start = i * CHUNK_SIZE
		const end = Math.min(start + CHUNK_SIZE, zipFile.length)
		const chunk = zipFile.slice(start, end)

		const chunkFormData = new FormData()
		chunkFormData.append('file', new Blob([chunk], { type: 'application/octet-stream' }))
		chunkFormData.append('partNumber', String(i + 1))
		chunkFormData.append('uploadId', uploadId)

		const chunkResponse = await fetch(`${baseUrl}/api/upload/chunk`, {
			method: 'POST',
			headers,
			body: chunkFormData,
			credentials: 'include',
		}).then((res) => res.json())

		if (!chunkResponse.etag) {
			throw new Error(`Failed to upload chunk ${i + 1}`)
		}

		chunks.push({
			partNumber: i + 1,
			etag: chunkResponse.etag,
		})
	}

	// Complete multipart upload
	const completeResponse = await fetch(`${baseUrl}/api/upload/complete`, {
		method: 'POST',
		headers: {
			...headers,
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			uploadId,
			parts: chunks,
			fileName: RENDER_ZIP_OUTPUT_FILE_NAME,
		}),
		credentials: 'include',
	}).then((res) => res.json())

	const id = completeResponse.id

	if (!id) {
		throw new Error('Upload completion failed')
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

export async function downloadTaskOutput(jobId: string): Promise<ReadableStream<Uint8Array>> {
	const response = await fetch(`${baseUrl}/api/tasks/${jobId}/download`, {
		headers,
		credentials: 'include',
	})

	if (!response.ok || !response.body) {
		throw new Error('Download failed')
	}

	return response.body
}
