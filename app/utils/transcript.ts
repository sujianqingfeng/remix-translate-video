import type { Sentence, SentenceWord, Transcript } from '~/types'

type SentenceSegmentationOptions = {
	words: SentenceWord[]
	maxSentenceLength?: number
}

// 先组装成长句
export function assembleLongSentences(words: SentenceWord[]) {
	const sentences: SentenceWord[][] = []
	let currentSentence: typeof words = []
	const sentenceEndMarks = /[.!?。！？]/

	for (let i = 0; i < words.length; i++) {
		const word = words[i]
		currentSentence.push(word)

		if (sentenceEndMarks.test(word.word) || i === words.length - 1) {
			sentences.push(currentSentence)
			currentSentence = []
		}
	}

	return sentences
}

// 处理科学计数法中的逗号
export function processScientificNotation(sentence: SentenceWord[]) {
	// 1. 过滤掉空的 word
	const filteredSentence = sentence.filter((w) => w.word.trim() !== '')

	// 2. 处理科学计数法中的逗号
	// 检查前后是否为数字的逗号，如果是则将其与后面的数字合并
	const result: SentenceWord[] = []

	for (let i = 0; i < filteredSentence.length; i++) {
		const current = filteredSentence[i]
		const next = filteredSentence[i + 1]
		const prev = filteredSentence[i - 1]

		// 如果当前是逗号，且前后都是数字，跳过这个逗号
		if (current.word === ',' && prev?.word?.match(/\d+/) && next?.word?.match(/\d+/)) {
			continue
		}

		// 如果当前是数字，且前一个是被跳过的逗号，将当前数字与前一个数字合并
		if (current.word.match(/\d+/) && prev?.word?.match(/\d+/) && filteredSentence[i - 1]?.word?.match(/\d+/)) {
			const lastResult = result[result.length - 1]
			lastResult.word = lastResult.word + current.word
			lastResult.end = current.end
			continue
		}

		result.push(current)
	}

	return result
}

// 创建句子对象
function createSentence(words: SentenceWord[]): Sentence {
	return {
		words,
		text: words.map((w) => w.word).join(' '),
		start: words[0].start,
		end: words[words.length - 1].end,
	}
}

// 根据分隔符切分句子
function splitBySubSentenceMarks(sentence: SentenceWord[]) {
	const subSentences: Sentence[] = []
	let currentSubSentence: typeof sentence = []
	const subSentenceMarks = /[,，;；]/

	for (const word of sentence) {
		currentSubSentence.push(word)

		if (subSentenceMarks.test(word.word) && currentSubSentence.length >= 3) {
			subSentences.push(createSentence(currentSubSentence))
			currentSubSentence = []
		}
	}

	if (currentSubSentence.length > 0) {
		subSentences.push(createSentence(currentSubSentence))
	}

	return subSentences
}

// 计算句子的字符长度
function getSentenceLength(sentence: { start: number; end: number; word: string }[]) {
	return sentence.reduce((length, word) => length + word.word.length, 0)
}

// 检查是否需要合并的特殊缩写
function isSpecialAbbreviation(words: SentenceWord[]): boolean {
	const combinedText = words.map((w) => w.word).join('')
	const abbreviations = ['u.s', 'e.g']
	// 检查组合文本中是否包含任何缩写
	return abbreviations.some((abbr) => combinedText.toLowerCase() === abbr)
}

// 合并包含特殊缩写的句子
export function mergeSentencesWithAbbreviations(sentences: SentenceWord[][]): SentenceWord[][] {
	const result: SentenceWord[][] = []
	let currentSentence: SentenceWord[] = []

	for (let i = 0; i < sentences.length; i++) {
		const sentence = sentences[i]

		if (currentSentence.length === 0) {
			currentSentence = sentence
		} else {
			const lastThreeWords = currentSentence.slice(-2)
			const firstThreeWords = sentence.slice(0, 1)

			// 检查是否需要合并
			if (isSpecialAbbreviation([...lastThreeWords, ...firstThreeWords])) {
				// 合并当前句子到前一个句子
				currentSentence = [...currentSentence, ...sentence]
			} else {
				// 如果不需要合并，将当前累积的句子加入结果，并开始新的句子
				result.push(currentSentence)
				currentSentence = sentence
			}
		}
	}

	// 不要忘记最后一个句子
	if (currentSentence.length > 0) {
		result.push(currentSentence)
	}

	return result
}

export function processSentenceSegmentation({ words, maxSentenceLength = 60 }: SentenceSegmentationOptions) {
	// 1. 组装长句
	const longSentences = assembleLongSentences(words)

	// 2. 处理科学计数法
	const processedLongSentences = longSentences.map(processScientificNotation)

	// 3. 合并包含特殊缩写的句子
	const mergedSentences = mergeSentencesWithAbbreviations(processedLongSentences)

	// 4. 处理每个长句
	const sentences: Sentence[] = []
	for (const longSentence of mergedSentences) {
		// 根据句子字符长度决定是否需要切分
		const sentenceLength = getSentenceLength(longSentence)
		if (sentenceLength > maxSentenceLength) {
			// 检查是否存在子句分隔符
			const hasSubSentenceMarks = longSentence.some((w) => /[,，;；]/.test(w.word))

			if (hasSubSentenceMarks) {
				// 存在分隔符时进行切分
				sentences.push(...splitBySubSentenceMarks(longSentence))
			} else {
				// 不存在分隔符时保持原句
				sentences.push(createSentence(longSentence))
			}
		} else {
			// 句子长度在允许范围内，直接添加
			sentences.push(createSentence(longSentence))
		}
	}

	return sentences
}

// 当Transcript的text长度超过maxSentenceLength时，进行分成两个Transcript
// 需要处理start和end，text，其他不用处理
// 返回新的Transcript数组

export function processTranslatedLongTranscripts(transcripts: Transcript[], maxSentenceLength = 60) {
	const result: Transcript[] = []

	for (const transcript of transcripts) {
		if (transcript.text.length <= maxSentenceLength) {
			result.push(transcript)
			continue
		}

		// 找到所有空格的位置
		const spacePositions: number[] = []
		for (let i = 0; i < transcript.text.length; i++) {
			if (transcript.text[i] === ' ') {
				spacePositions.push(i)
			}
		}

		// 如果没有空格，直接添加原文
		if (spacePositions.length === 0) {
			result.push(transcript)
			continue
		}

		// 找到最接近 maxSentenceLength 的空格位置
		const splitIndex = spacePositions.reduce((prev, curr) => (Math.abs(curr - maxSentenceLength) < Math.abs(prev - maxSentenceLength) ? curr : prev))

		// 计算到这个位置有多少个单词
		const wordCount = transcript.text.slice(0, splitIndex).split(' ').length

		// 从原始的 words 数组中获取分割时间点
		const words = transcript.words || []
		const splitTime = words[wordCount - 1]?.end || transcript.end

		// 分割成两个 Transcript
		const firstPart: Transcript = {
			text: transcript.text.slice(0, splitIndex).trim(),
			start: transcript.start,
			end: splitTime,
			textLiteralTranslation: transcript.textLiteralTranslation,
			textInterpretation: transcript.textInterpretation,
			words: words.slice(0, wordCount),
		}

		const secondPart: Transcript = {
			text: transcript.text.slice(splitIndex + 1).trim(),
			start: splitTime,
			end: transcript.end,
			textLiteralTranslation: transcript.textLiteralTranslation,
			textInterpretation: transcript.textInterpretation,
			words: words.slice(wordCount),
		}

		result.push(firstPart)

		// 递归处理第二部分，以防它仍然太长
		result.push(...processTranslatedLongTranscripts([secondPart], maxSentenceLength))
	}

	return result
}

// 去除句子两边的符号
export function trimPunctuation(sentence: string): string {
	const punctuationRegex = /^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu
	return sentence.replace(punctuationRegex, '')
}
