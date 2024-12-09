import { spawn } from 'node:child_process'
import fsp from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { Transcript } from '~/types'
import { getTranslateVideoFullId, getTranslateVideoOut } from '~/utils/translate-video'

import { tryGetYoutubeDownloadFile } from '~/utils/youtube'

// 生成 SRT 格式字幕，为英文和中文添加不同的样式标签
function generateSRT(transcripts: Transcript[]): string {
	return transcripts
		.map((transcript, index) => {
			const startTime = formatSRTTime(transcript.start)
			const endTime = formatSRTTime(transcript.end)

			return `${index + 1}
${startTime} --> ${endTime}
${transcript.text}
${transcript.textLiteralTranslation || ''}

`
		})
		.join('')
}

// 格式化时间为 SRT 格式 (00:00:00,000)
function formatSRTTime(seconds: number): string {
	const date = new Date(seconds * 1000)
	const hh = String(Math.floor(seconds / 3600)).padStart(2, '0')
	const mm = String(date.getMinutes()).padStart(2, '0')
	const ss = String(date.getSeconds()).padStart(2, '0')
	const ms = String(date.getMilliseconds()).padStart(3, '0')

	return `${hh}:${mm}:${ss},${ms}`
}

export async function action({ params }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const { transcriptsFile, outDir } = getTranslateVideoOut(id)
	const transcripts: Transcript[] = JSON.parse(await fsp.readFile(transcriptsFile, 'utf-8'))

	const maybePlayVideoFile = await tryGetYoutubeDownloadFile(outDir)
	invariant(maybePlayVideoFile, 'Video file not found')

	const fullId = getTranslateVideoFullId(id)
	const outputPath = path.join(process.cwd(), `out/${fullId}/output.mp4`)

	// 生成合并的 SRT 字幕文件
	const combined = generateSRT(transcripts)
	const combinedSrtPath = path.join(process.cwd(), `out/${fullId}/combined.srt`)
	await fsp.writeFile(combinedSrtPath, combined)

	const escapedCombinedSrtPath = combinedSrtPath.replace(/\\/g, '/').replace(/:/g, '\\:').replace(/'/g, "'\\\\''")

	// 背景
	// `subtitles='${escapedCombinedSrtPath}':force_style='FontName=Microsoft YaHei,FontSize=16,Alignment=2,BorderStyle=4,MarginV=20,PrimaryColour=&HFFFFFF,BackColour=&H1A000000'`,

	// 使用 FFmpeg 渲染带字幕的视频，只使用一个字幕文件
	await new Promise((resolve, reject) => {
		const ffmpeg = spawn('ffmpeg', [
			'-y',
			'-threads',
			'2',
			'-i',
			maybePlayVideoFile,
			'-vf',
			`subtitles='${escapedCombinedSrtPath}':force_style='FontSize=17,Alignment=2,BorderStyle=1,Outline=0.5,Shadow=0,MarginV=20,PrimaryColour=&HFFFFFF,OutlineColour=&H404040'`,
			'-c:v',
			'libx264',
			'-preset',
			'slow',
			'-crf',
			'30',
			'-maxrate',
			'4M',
			'-bufsize',
			'3M',
			'-c:a',
			'aac',
			'-b:a',
			'128k',
			'-movflags',
			'+faststart',
			outputPath,
		])

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

	// 验证输出文件是否存在且大小正常
	try {
		const stats = await fsp.stat(outputPath)
		if (stats.size === 0) {
			throw new Error('Output file is empty')
		}
		console.log('Output file size:', stats.size)
	} catch (error) {
		console.error('Output file validation failed:', error)
		throw error
	}

	return { success: true }
}
