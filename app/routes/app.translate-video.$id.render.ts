import { spawn } from 'node:child_process'
import fsp from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { TRANSLATE_VIDEO_COMBINED_SRT_FILE } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { createOperationDir } from '~/utils/file'
import { generateASS, generateFFmpegCommand } from '~/utils/transcript'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.translateVideos.id, id)

	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})
	invariant(translateVideo, 'translateVideo not found')

	const { transcripts, downloadId, source, uploadFilePath } = translateVideo

	let filePath = uploadFilePath || ''
	if (source === 'download' && downloadId) {
		const download = await db.query.downloads.findFirst({
			where: eq(schema.downloads.id, downloadId),
		})
		invariant(download, 'download not found')
		filePath = download.filePath || ''
	}

	const operationDir = await createOperationDir(id)
	const outputPath = path.join(operationDir, `${id}-output.mp4`)

	// 生成合并的 SRT 字幕文件
	const combined = generateASS(transcripts ?? [])
	const combinedSrtFile = path.join(operationDir, TRANSLATE_VIDEO_COMBINED_SRT_FILE)
	await fsp.writeFile(combinedSrtFile, combined)

	const escapedCombinedSrtPath = combinedSrtFile.replace(/\\/g, '/').replace(/:/g, '\\:').replace(/'/g, "'\\\\''")

	await new Promise((resolve, reject) => {
		const cmd = generateFFmpegCommand(filePath, escapedCombinedSrtPath)

		const ffmpeg = spawn('ffmpeg', cmd.concat(outputPath))

		// 收集错误输出
		let stderr = ''
		ffmpeg.stderr.on('data', (data) => {
			stderr += data.toString()
			console.log('FFmpeg progress:', data.toString())
		})

		ffmpeg.on('error', (error) => {
			reject(new Error(`FFmpeg process error: ${error.message}`))
		})

		ffmpeg.on('close', (code) => {
			if (code === 0) {
				console.log('FFmpeg finished successfully')
				resolve(null)
			} else {
				console.error('FFmpeg stderr:', stderr)
				reject(new Error(`FFmpeg process exited with code ${code}\n${stderr}`))
			}
		})
	})

	await db.update(schema.translateVideos).set({
		outputFilePath: outputPath,
	})

	return { success: true }
}
