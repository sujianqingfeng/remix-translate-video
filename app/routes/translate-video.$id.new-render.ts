import { spawn } from 'node:child_process'
import fsp from 'node:fs/promises'
import path from 'node:path'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { Transcript } from '~/types'
import {
	getTranslateVideoFullId,
	getTranslateVideoOut,
} from '~/utils/translate-video'

import { tryGetYoutubeDownloadFile } from '~/utils/youtube'

// 生成 SRT 格式字幕，为英文和中文添加不同的样式标签
function generateSRT(
	transcripts: Transcript[],
	videoWidth: number,
): {
	combined: string
	chineseLines: number[]
} {
	const maxCharsPerLine = Math.floor((videoWidth * 0.9) / (videoWidth / 40))

	function wrapText(text: string | undefined): { text: string; lines: number } {
		if (!text) return { text: '', lines: 0 }
		if (text.length <= maxCharsPerLine) return { text, lines: 1 }

		const lines: string[] = []
		let remaining = text

		// 最多两行，直接按照字数切分
		for (
			let lineCount = 0;
			lineCount < 2 && remaining.length > 0;
			lineCount++
		) {
			if (remaining.length <= maxCharsPerLine) {
				lines.push(remaining)
				break
			}

			// 直接按照最大字符数切分
			lines.push(remaining.slice(0, maxCharsPerLine))
			remaining = remaining.slice(maxCharsPerLine)
		}

		// 如果还有剩余文本，添加到最后一行
		if (remaining.length > 0) {
			lines[lines.length - 1] += remaining
		}

		return { text: lines.join('\n'), lines: lines.length }
	}

	const chineseLines: number[] = []
	const combined = transcripts
		.map((transcript, index) => {
			const startTime = formatSRTTime(transcript.start)
			const endTime = formatSRTTime(transcript.end)
			const { text: chineseText, lines } = wrapText(
				transcript.textInterpretation,
			)
			chineseLines[index] = lines

			// 合并英文和中文字幕，用换行符分隔
			return `${index + 1}
${startTime} --> ${endTime}
${transcript.text}
${chineseText}

`
		})
		.join('')

	return { combined, chineseLines }
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

export async function action({ params, request }: ActionFunctionArgs) {
	const id = params.id
	invariant(id, 'id is required')

	const { transcriptsFile, outDir } = getTranslateVideoOut(id)
	const transcripts: Transcript[] = JSON.parse(
		await fsp.readFile(transcriptsFile, 'utf-8'),
	)

	const maybePlayVideoFile = await tryGetYoutubeDownloadFile(outDir)
	invariant(maybePlayVideoFile, 'Video file not found')

	const fullId = getTranslateVideoFullId(id)
	const srtPath = path.join(process.cwd(), `out/${fullId}/subtitles.srt`)
	const outputPath = path.join(process.cwd(), `out/${fullId}/output.mp4`)

	// 获取视频尺寸
	const getVideoSize = async (
		videoPath: string,
	): Promise<{ width: number; height: number }> => {
		return new Promise((resolve, reject) => {
			const ffprobe = spawn('ffprobe', [
				'-v',
				'error',
				'-select_streams',
				'v:0',
				'-show_entries',
				'stream=width,height',
				'-of',
				'json',
				videoPath,
			])

			let output = ''
			ffprobe.stdout.on('data', (data) => {
				output += data.toString()
			})

			ffprobe.on('close', (code) => {
				if (code === 0) {
					const { streams } = JSON.parse(output)
					resolve({
						width: streams[0].width,
						height: streams[0].height,
					})
				} else {
					reject(new Error('Failed to get video size'))
				}
			})
		})
	}

	// 获取视频尺寸
	const videoSize = await getVideoSize(maybePlayVideoFile)

	// 生成合并的 SRT 字幕文件
	const { combined, chineseLines } = generateSRT(transcripts, videoSize.width)
	const combinedSrtPath = path.join(process.cwd(), `out/${fullId}/combined.srt`)
	await fsp.writeFile(combinedSrtPath, combined)

	const escapedCombinedSrtPath = combinedSrtPath
		.replace(/\\/g, '/')
		.replace(/:/g, '\\:')
		.replace(/'/g, "'\\\\''")

	// 使用 FFmpeg 渲染带字幕的视频，只使用一个字幕文件
	await new Promise((resolve, reject) => {
		const ffmpeg = spawn('ffmpeg', [
			'-y',
			'-threads',
			'3',
			'-i',
			maybePlayVideoFile,
			'-vf',
			`subtitles='${escapedCombinedSrtPath}':force_style='FontName=Microsoft YaHei,FontSize=14,Alignment=2,BorderStyle=0,Outline=0,Shadow=0,MarginV=20,PrimaryColour=&HFFFFFF'`,
			'-c:v',
			'libx264',
			'-preset',
			'medium',
			'-crf',
			'18',
			'-maxrate',
			'4M',
			'-bufsize',
			'4M',
			'-c:a',
			'aac',
			'-b:a',
			'192k',
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

	return json({ success: true })
}
