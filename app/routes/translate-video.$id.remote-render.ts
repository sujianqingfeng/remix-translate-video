import fsp from 'node:fs/promises'
import path from 'node:path'
import { Readable } from 'node:stream'
import type { ActionFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { Transcript } from '~/types'
import { getTranslateVideoOut } from '~/utils/translate-video'

import { TRANSLATE_VIDEO_COMBINED_SRT_FILE } from '~/constants'
import { createFfmpegZipArchive, updateFileJson } from '~/utils/file'
import { addRenderTask, uploadRenderZipFile } from '~/utils/remote-render'
import { generateFFmpegCommand, generateSRT } from '~/utils/transcript'
import { tryGetYoutubeDownloadFile } from '~/utils/youtube'

export async function action({ params }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const { transcriptsFile, outDir, combinedSrtFile, renderInfoFile, renderZipFile, infoFile } = getTranslateVideoOut(id)
	const transcripts: Transcript[] = JSON.parse(await fsp.readFile(transcriptsFile, 'utf-8'))

	const maybePlayVideoFile = await tryGetYoutubeDownloadFile(outDir)
	invariant(maybePlayVideoFile, 'Video file not found')

	const videoFileName = path.basename(maybePlayVideoFile)

	// 生成合并的 SRT 字幕文件
	const combined = generateSRT(transcripts)
	await fsp.writeFile(combinedSrtFile, combined)

	const renderInfo = {
		sourceFileName: videoFileName,
		subtitlesFileName: TRANSLATE_VIDEO_COMBINED_SRT_FILE,
		cmd: generateFFmpegCommand(videoFileName, TRANSLATE_VIDEO_COMBINED_SRT_FILE),
	}

	const renderInfoStream = new Readable()
	renderInfoStream.push(JSON.stringify(renderInfo))
	renderInfoStream.push(null)

	await fsp.writeFile(renderInfoFile, renderInfoStream)

	await createFfmpegZipArchive({
		renderInfoFile,
		sourceFile: maybePlayVideoFile,
		subtitlesFile: combinedSrtFile,
		outputZipPath: renderZipFile,
		...renderInfo,
	})

	const { id: renderId } = await uploadRenderZipFile(renderZipFile)
	const { jobId } = await addRenderTask(renderId, 'synthetic-subtitle')

	await updateFileJson(infoFile, { renderId, jobId })

	return { success: true }
}
