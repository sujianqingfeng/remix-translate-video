import fsp from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { RENDER_INFO_FILE, RENDER_ZIP_OUTPUT_FILE_NAME, TRANSLATE_VIDEO_COMBINED_SRT_FILE } from '~/constants'
import { db, schema } from '~/lib/drizzle'
import { createFfmpegZipArchive, createOperationDir } from '~/utils/file'
import { addRenderTask, uploadRenderZipFile } from '~/utils/remote-render'
import { generateASS, generateFFmpegCommand } from '~/utils/transcript'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.translateVideos.id, id)

	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})
	invariant(translateVideo, 'translateVideo not found')

	const { transcripts, downloadId, source } = translateVideo

	let filePath = ''
	if (source === 'download' && downloadId) {
		const download = await db.query.downloads.findFirst({
			where: eq(schema.downloads.id, downloadId),
		})
		invariant(download, 'download not found')
		filePath = download.filePath || ''
	}

	const operationDir = await createOperationDir(id)

	const renderInfoFilePath = path.join(operationDir, RENDER_INFO_FILE)
	const combinedSrtFile = path.join(operationDir, TRANSLATE_VIDEO_COMBINED_SRT_FILE)

	const renderZipFilePath = path.join(operationDir, RENDER_ZIP_OUTPUT_FILE_NAME)

	// 生成合并的 SRT 字幕文件
	const combined = generateASS(transcripts ?? [])
	await fsp.writeFile(combinedSrtFile, combined)

	const videoFileName = path.basename(filePath)

	const renderInfo = {
		sourceFileName: videoFileName,
		subtitlesFileName: TRANSLATE_VIDEO_COMBINED_SRT_FILE,
		cmd: generateFFmpegCommand(videoFileName, TRANSLATE_VIDEO_COMBINED_SRT_FILE),
	}

	const renderInfoStream = new Readable()
	renderInfoStream.push(JSON.stringify(renderInfo))
	renderInfoStream.push(null)

	await fsp.writeFile(renderInfoFilePath, renderInfoStream)

	await createFfmpegZipArchive({
		renderInfoFile: renderInfoFilePath,
		sourceFile: filePath,
		subtitlesFile: combinedSrtFile,
		outputZipPath: renderZipFilePath,
		...renderInfo,
	})

	const { id: renderId } = await uploadRenderZipFile(renderZipFilePath)
	const { jobId } = await addRenderTask(renderId, 'synthetic-subtitle')

	await db.insert(schema.tasks).values({
		type: 'synthetic-subtitle',
		desc: `synthetic-subtitle for ${translateVideo.id}`,
		status: 'pending',
		jobId,
	})

	return { success: true }
}
