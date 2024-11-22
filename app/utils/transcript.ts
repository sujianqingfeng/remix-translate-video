type SentenceSegmentationOptions = {
	words: { start: number; end: number; word: string }[]
	maxSentenceLength?: number
}

type Sentence = {
	words: { start: number; end: number; word: string }[]
	text: string
	start: number // 句子开始时间
	end: number // 句子结束时间
}

// 先组装成长句
function assembleLongSentences(
	words: { start: number; end: number; word: string }[],
) {
	const sentences: { start: number; end: number; word: string }[][] = []
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
function processScientificNotation(
	sentence: { start: number; end: number; word: string }[],
) {
	return sentence.map((w) => ({
		...w,
		word: w.word.replace(/(\d+),(\d{3})/g, '$1$2'),
	}))
}

// 创建句子对象
function createSentence(
	words: { start: number; end: number; word: string }[],
): Sentence {
	return {
		words,
		text: words.map((w) => w.word).join(' '),
		start: words[0].start,
		end: words[words.length - 1].end,
	}
}

// 根据分隔符切分句子
function splitBySubSentenceMarks(
	sentence: { start: number; end: number; word: string }[],
) {
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
function getSentenceLength(
	sentence: { start: number; end: number; word: string }[],
) {
	return sentence.reduce((length, word) => length + word.word.length, 0)
}

export function processSentenceSegmentation({
	words,
	maxSentenceLength = 60,
}: SentenceSegmentationOptions) {
	// 1. 组装长句
	const longSentences = assembleLongSentences(words)

	// 2. 处理每个长句
	const sentences: Sentence[] = []
	for (const longSentence of longSentences) {
		// 处理科学计数法中的逗号
		const processedSentence = processScientificNotation(longSentence)

		// 3. 根据句子字符长度决定是否需要切分
		const sentenceLength = getSentenceLength(processedSentence)
		if (sentenceLength > maxSentenceLength) {
			// 检查是否存在子句分隔符
			const hasSubSentenceMarks = processedSentence.some((w) =>
				/[,，;；]/.test(w.word),
			)

			if (hasSubSentenceMarks) {
				// 存在分隔符时进行切分
				sentences.push(...splitBySubSentenceMarks(processedSentence))
			} else {
				// 不存在分隔符时保持原句
				sentences.push(createSentence(processedSentence))
			}
		} else {
			// 句子长度在允许范围内，直接添加
			sentences.push(createSentence(processedSentence))
		}
	}

	return sentences
}

// 去除句子两边的符号
export function trimPunctuation(sentence: string): string {
	const punctuationRegex = /^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu
	return sentence.replace(punctuationRegex, '')
}
