import fsp from 'node:fs/promises'
import { fetch } from 'undici'

/**
 * 通过URL下载文件
 * @param url 文件的URL地址
 * @param filename 保存的文件名
 * @returns Promise<boolean> 下载是否成功
 */
export async function downloadFile(
	url: string,
	filename: string,
): Promise<boolean> {
	try {
		const response = await fetch(url)

		if (!response.ok) {
			throw new Error(
				`download failed: ${response.status} ${response.statusText}`,
			)
		}

		const arrayBuffer = await response.arrayBuffer()
		const buffer = Buffer.from(arrayBuffer)

		await fsp.writeFile(filename, buffer)

		return true
	} catch (error) {
		console.error('download file failed:', error)
		return false
	}
}
