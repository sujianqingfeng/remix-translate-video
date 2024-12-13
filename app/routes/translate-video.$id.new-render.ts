import { spawn } from 'node:child_process'
import fsp from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { Transcript } from '~/types'
import { getTranslateVideoFullId, getTranslateVideoOut } from '~/utils/translate-video'

import { generateFFmpegCommand, generateSRT } from '~/utils/transcript'
import { tryGetYoutubeDownloadFile } from '~/utils/youtube'

export async function action({ params }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const { transcriptsFile, outDir, combinedSrtFile } = getTranslateVideoOut(id)
	const transcripts: Transcript[] = JSON.parse(await fsp.readFile(transcriptsFile, 'utf-8'))

	const maybePlayVideoFile = await tryGetYoutubeDownloadFile(outDir)
	invariant(maybePlayVideoFile, 'Video file not found')

	const fullId = getTranslateVideoFullId(id)
	const outputPath = path.join(process.cwd(), `out/${fullId}/output.mp4`)

	// 生成合并的 SRT 字幕文件
	const combined = generateSRT(transcripts)
	await fsp.writeFile(combinedSrtFile, combined)

	const escapedCombinedSrtPath = combinedSrtFile.replace(/\\/g, '/').replace(/:/g, '\\:').replace(/'/g, "'\\\\''")

	// 背景
	// `subtitles='${escapedCombinedSrtPath}':force_style='FontName=Microsoft YaHei,FontSize=16,Alignment=2,MarginV=20,PrimaryColour=&HFFFFFF,BorderStyle=4,BackColour=&H1A000000'`,

	// &HFFFFFF
	// 使用 FFmpeg 渲染带字幕的视频，只使用一个字幕文件
	await new Promise((resolve, reject) => {
		const cmd = generateFFmpegCommand(maybePlayVideoFile, escapedCombinedSrtPath)

		const ffmpeg = spawn('ffmpeg', cmd.concat(outputPath))

		// 收集错误输出
		let stderr = ''
		ffmpeg.stderr.on('data', (data) => {
			stderr += data.toString()
			console.log('FFmpeg progress:', data.toString())
		})

		ffmpeg.on('error', (error) => {
			console.error('FFmpeg error:', error)
			reject(new Error(`FFmpeg process error: ${error.message}`))
		})

		ffmpeg.on('close', (code) => {
			if (code === 0) {
				console.log('FFmpeg finished successfully')
				resolve(null)
			} else {
				console.error('FFmpeg failed with code:', code)
				console.error('FFmpeg stderr:', stderr)
				reject(new Error(`FFmpeg process exited with code ${code}\n${stderr}`))
			}
		})
	})

	return { success: true }
}
