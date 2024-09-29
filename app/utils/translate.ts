import createDeepSeek from './deep-seek'

const deepSeek = createDeepSeek({ apiKey: process.env.DEEP_SEEK_API_KEY! })

export function translate(text: string) {
  return deepSeek.generateText({
    system:
      'You are a helpful assistant that translates text from English to Chinese.',
    prompt: text
  })
}
