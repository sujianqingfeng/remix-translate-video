import { type ChildProcess, spawn } from 'node:child_process'
import fsp from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { processSentenceSegmentation } from '~/utils/transcript'
import { trimPunctuation } from '~/utils/transcript'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.translateVideos.id, id)
	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})
	invariant(translateVideo, 'translateVideo not found')
	invariant(translateVideo.audioFilePath, 'audioFilePath is required')

	const whisperProjectPath = process.env.WHISPER_PROJECT_PATH
	invariant(whisperProjectPath, 'WHISPER_PROJECT_PATH is required')

	const whisperCliPath = path.join(whisperProjectPath, 'build/bin/whisper-cli')
	const modelPath = path.join(whisperProjectPath, 'models/ggml-medium.bin')
	const resultPath = `${translateVideo.audioFilePath}.json`

	await new Promise<void>((resolve, reject) => {
		const whisperCmd = spawn(whisperCliPath, ['-m', modelPath, '-f', translateVideo.audioFilePath as string, '-ml', '1', '-oj'], {
			stdio: ['ignore', 'pipe', 'pipe'],
		}) as ChildProcess

		let stderr = ''

		if (whisperCmd.stderr) {
			whisperCmd.stderr.on('data', (data: Buffer) => {
				const output = data.toString()
				stderr += output
				console.log(output)
			})
		}

		if (whisperCmd.stdout) {
			whisperCmd.stdout.on('data', (data: Buffer) => {
				console.log(data.toString())
			})
		}

		whisperCmd.on('error', (error: Error) => {
			reject(new Error(`process error: ${error.message}`))
		})

		whisperCmd.on('close', (code: number | null) => {
			if (code === 0) {
				console.log('Whisper finished successfully')
				resolve()
			} else {
				console.error('Whisper stderr:', stderr)
				reject(new Error(`Whisper process exited with code ${code}\n${stderr}`))
			}
		})
	})

	const text = await fsp.readFile(resultPath, 'utf-8')
	const data = JSON.parse(text)

	const words = data.transcription.map((item: any) => ({
		word: item.text,
		start: item.offsets.from / 1000,
		end: item.offsets.to / 1000,
	}))

	const segments = processSentenceSegmentation({ words })

	// 去除句子两边的符号 和 words
	const transcripts = segments.map(({ text, start, end, words }) => {
		const textResult = trimPunctuation(text)
		return {
			text: textResult,
			start: start,
			end: end,
			words,
		}
	})

	await db
		.update(schema.translateVideos)
		.set({
			asrWords: words,
			transcripts,
		})
		.where(where)

	return { success: true }
}
