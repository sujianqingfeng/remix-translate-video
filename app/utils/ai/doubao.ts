import { createOpenAI } from '@ai-sdk/openai'
import type { Schema } from '@ai-sdk/ui-utils'
import { type CoreMessage, generateText as aiGenerateText, generateObject } from 'ai'
import type { z } from 'zod'

const API_BASE_URL = 'https://ark.cn-beijing.volces.com/api/v3'

function createDouBao({ apiKey }: { apiKey: string }) {
	const openai = createOpenAI({
		baseURL: API_BASE_URL,
		apiKey,
	})

	return {
		generateText: async ({
			system,
			prompt,
			maxTokens,
			messages,
		}: {
			system?: string
			prompt?: string
			maxTokens?: number
			messages?: Array<CoreMessage>
		}) => {
			const { text } = await aiGenerateText({
				model: openai('ep-20241218181113-m6g9m'),
				system,
				prompt,
				maxTokens,
				messages,
			})
			return text
		},
		generateObject: async <OBJECT>({
			system,
			prompt,
			schema,
			messages,
		}: {
			system?: string
			prompt?: string
			messages?: Array<CoreMessage>
			schema: z.Schema<OBJECT, z.ZodTypeDef, any> | Schema<OBJECT>
		}) => {
			const { object } = await generateObject({
				model: openai('ep-20241218181113-m6g9m'),
				schema,
				system,
				prompt,
				messages,
			})

			return object
		},
	}
}

export default createDouBao
