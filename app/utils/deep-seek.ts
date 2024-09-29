import { createOpenAI } from '@ai-sdk/openai'
import { generateText as aiGenerateText } from 'ai'

const API_BASE_URL = 'https://api.deepseek.com'

function createDeepSeek({ apiKey }: { apiKey: string }) {
  const openai = createOpenAI({
    baseURL: API_BASE_URL,
    apiKey
  })

  return {
    generateText: async ({
      system,
      prompt
    }: {
      system: string
      prompt: string
    }) => {
      const { text } = await aiGenerateText({
        model: openai('deepseek-chat'),
        system,
        prompt
      })
      return text
    }
  }
}

export default createDeepSeek
