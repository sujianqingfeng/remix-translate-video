import { createOpenAI } from '@ai-sdk/openai'
import type { Schema } from '@ai-sdk/ui-utils'
import { generateText as aiGenerateText, generateObject } from 'ai'
import type { z } from 'zod'

const API_BASE_URL = 'https://api.deepseek.com'

function createDeepSeek({ apiKey }: { apiKey: string }) {
	const openai = createOpenAI({
		baseURL: API_BASE_URL,
		apiKey,
	})

	return {
		generateText: async ({
			system,
			prompt,
			maxTokens,
		}: {
			system: string
			prompt: string
			maxTokens?: number
		}) => {
			const { text } = await aiGenerateText({
				model: openai('deepseek-chat'),
				system,
				prompt,
				maxTokens,
			})
			return text
		},
		generateObject: async <OBJECT>({
			system,
			prompt,
			schema,
			temperature,
		}: {
			system: string
			prompt: string
			schema: z.Schema<OBJECT, z.ZodTypeDef, any> | Schema<OBJECT>
			temperature: number
		}) => {
			const { object } = await generateObject({
				model: openai('deepseek-chat'),
				schema,
				system,
				prompt,
				temperature,
			})

			return object
		},
	}
}

export default createDeepSeek
