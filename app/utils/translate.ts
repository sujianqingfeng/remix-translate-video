import { chatGPT, deepSeek, r1 } from './ai'

export type AiModel = 'deepseek' | 'openai' | 'r1'

type AiGenerateTextOptions = {
	systemPrompt: string
	prompt: string
	model: AiModel
	maxTokens?: number
}

export async function aiGenerateText({ systemPrompt, prompt, model, maxTokens = 2000 }: AiGenerateTextOptions): Promise<string> {
	const options = {
		system: systemPrompt,
		prompt: prompt,
		maxTokens: maxTokens,
	}

	switch (model) {
		case 'openai': {
			return chatGPT.generateText(options)
		}
		case 'r1': {
			return r1.generateText(options)
		}
		case 'deepseek': {
			return deepSeek.generateText(options)
		}
		default: {
			throw new Error(`Unsupported model: ${model}`)
		}
	}
}
