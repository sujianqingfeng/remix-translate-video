import createDeepSeek from './deep-seek'

const apiKey = process.env.DEEP_SEEK_API_KEY

if (!apiKey) {
	throw new Error('DEEP_SEEK_API_KEY is not set')
}

const deepSeek = createDeepSeek({ apiKey })

export function translate(text: string) {
	return deepSeek.generateText({
		system:
			'You are a helpful assistant that translates text from English to Chinese.',
		prompt: text,
	})
}
