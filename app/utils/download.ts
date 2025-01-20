import fs from 'node:fs'
import { ProxyAgent, fetch } from 'undici'

const CHUNK_SIZE = 1024 * 1024 * 5 // 5MB per chunk
const MAX_RETRIES = 3
const CONCURRENT_CHUNKS = 3

interface DownloadChunk {
	start: number
	end: number
	retry?: number
}

interface DownloadOptions {
	proxy?: string
}

/**
 * 获取文件大小
 */
async function getFileSize(url: string, options?: DownloadOptions): Promise<number> {
	const fetchOptions: any = { method: 'HEAD' }
	if (options?.proxy) {
		fetchOptions.dispatcher = new ProxyAgent({ uri: options.proxy })
	}
	const response = await fetch(url, fetchOptions)
	const contentLength = response.headers.get('content-length')
	return contentLength ? Number.parseInt(contentLength, 10) : 0
}

/**
 * 下载指定范围的数据
 */
async function downloadChunk(url: string, chunk: DownloadChunk, options?: DownloadOptions): Promise<Buffer> {
	const fetchOptions: any = {
		headers: {
			Range: `bytes=${chunk.start}-${chunk.end}`,
		},
	}
	if (options?.proxy) {
		fetchOptions.dispatcher = new ProxyAgent({ uri: options.proxy })
	}
	const response = await fetch(url, fetchOptions)

	if (!response.ok) {
		throw new Error(`Failed to download chunk: ${response.status} ${response.statusText}`)
	}

	const arrayBuffer = await response.arrayBuffer()
	return Buffer.from(arrayBuffer)
}

type ChunkDownloadResult = Promise<void>

/**
 * 通过URL下载文件（支持分段下载）
 * @param url 文件的URL地址
 * @param filePath 保存的文件名
 * @param options 下载选项，包括代理设置
 * @returns Promise<boolean> 下载是否成功
 */
export async function downloadFile(url: string, filePath: string, options?: DownloadOptions): Promise<boolean> {
	try {
		// 获取文件大小
		const fileSize = await getFileSize(url, options)
		if (!fileSize) {
			throw new Error('Could not determine file size')
		}

		// 创建文件写入流
		const writeStream = fs.createWriteStream(filePath)

		// 计算分块
		const chunks: DownloadChunk[] = []
		for (let start = 0; start < fileSize; start += CHUNK_SIZE) {
			chunks.push({
				start,
				end: Math.min(start + CHUNK_SIZE - 1, fileSize - 1),
			})
		}

		// 并行下载chunks
		while (chunks.length > 0) {
			const currentChunks = chunks.splice(0, CONCURRENT_CHUNKS)
			const chunkPromises: ChunkDownloadResult[] = currentChunks.map(async (chunk) => {
				let lastError: unknown = null
				for (let retry = 0; retry < MAX_RETRIES; retry++) {
					try {
						const buffer = await downloadChunk(url, chunk, options)
						// 确保在正确的位置写入数据
						await new Promise<void>((resolve, reject) => {
							writeStream.write(buffer, (error) => {
								if (error) reject(error)
								else resolve()
							})
						})
						return
					} catch (error) {
						lastError = error
						console.error(`Chunk download failed (${chunk.start}-${chunk.end}), retry ${retry + 1}/${MAX_RETRIES}`)
						if (retry < MAX_RETRIES - 1) {
							await new Promise<void>((resolve) => setTimeout(resolve, 1000 * (retry + 1)))
						}
					}
				}
				throw lastError
			})

			await Promise.all(chunkPromises)
		}

		// 关闭写入流
		await new Promise<void>((resolve, reject) => {
			writeStream.end((err: unknown) => {
				if (err) reject(err)
				else resolve()
			})
		})

		return true
	} catch (error) {
		console.error('download file failed:', error)
		return false
	}
}
