import { type ChildProcess, spawn } from 'node:child_process'
import fsp from 'node:fs/promises'
import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ request, params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const model = formData.get('model')
	invariant(model === 'whisper-large' || model === 'whisper-medium', 'Invalid model')

	const where = eq(schema.subtitleTranslations.id, id)
	const subtitleTranslation = await db.query.subtitleTranslations.findFirst({
		where,
	})
	invariant(subtitleTranslation, 'subtitleTranslation not found')
	invariant(subtitleTranslation.audioFilePath, 'audioFilePath is required')

	const whisperProjectPath = process.env.WHISPER_PROJECT_PATH
	invariant(whisperProjectPath, 'WHISPER_PROJECT_PATH is required')

	const whisperCliPath = path.join(whisperProjectPath, 'build/bin/whisper-cli')

	// Select model based on user choice
	const modelPath = model === 'whisper-large' ? path.join(whisperProjectPath, 'models/ggml-large-v3-turbo-q8_0.bin') : path.join(whisperProjectPath, 'models/ggml-medium.bin')

	const resultPath = `${subtitleTranslation.audioFilePath}.json`

	await new Promise<void>((resolve, reject) => {
		const whisperCmd = spawn(whisperCliPath, ['-m', modelPath, '-f', subtitleTranslation.audioFilePath as string, '-ml', '1', '-oj'], {
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

	await db
		.update(schema.subtitleTranslations)
		.set({
			withTimeWords: words,
		})
		.where(where)

	return {
		success: true,
		message: `ASR conversion completed successfully using ${model} model`,
		wordCount: words.length,
	}
}
