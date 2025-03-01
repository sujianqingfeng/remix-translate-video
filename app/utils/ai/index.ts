import createChatGPT from './chatgpt'
import createDeepSeek from './deep-seek'
import createDouBao from './doubao'
import createR1 from './r1'

const chatGPT = createChatGPT({ apiKey: process.env.OPEN_AI_API_KEY || '' })
const deepSeek = createDeepSeek({ apiKey: process.env.DEEP_SEEK_API_KEY || '' })
const r1 = createR1({ apiKey: process.env.R1_API_KEY || '' })
const doubao = createDouBao({ apiKey: process.env.DOU_BAO_API_KEY || '' })

const translatePrompt = '你是一个精通多语言的翻译大师，将文本翻译成中文。如果是中文，就返回原文。保留原文特定的术语(如有)，不要去解释内容和名词。如果内容是空的，就返回空的。'

const MAX_TOKENS = 2000

export { deepSeek, chatGPT, r1, doubao }
