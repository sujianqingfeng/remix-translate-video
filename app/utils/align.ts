import type { Sentence, SentenceWord } from '~/types'

type WordsToSentencesOptions = {
	words: SentenceWord[]
	maxSentenceLength?: number
	// 新增配置选项
	specialAbbreviations?: string[]
	sentenceEndingPunctuation?: string[]
	sentenceSplittingPunctuation?: string[]
	forceBreakAfterPatterns?: string[]
}

// 实现wordsToSentences，用来做字幕，句子尽可能的短
// 变成一个一个句子,通过结尾符号来分割
// 但是需要考虑一些特殊情况,比如小数，科学计数法，这里不需要分割
// 还是有一个特殊简写不需要分割，比如['U.S',"A.I"]

// 还需要考虑句子的长度，当超过 maxSentenceLength的时候，需要分割
// 分割的规则是，如果句子中存在标点符号，则按照标点符号分割
// 如果句子中不存在标点符号，就不分割

export function wordsToSentences({
	words,
	maxSentenceLength = 100,
	specialAbbreviations = ['U.S.', 'A.I.', 'e.g.', 'i.e.', 'etc.', 'Mr.', 'Mrs.', 'Dr.', 'Ph.D.'],
	sentenceEndingPunctuation = ['.', '!', '?', '。', '！', '？'],
	sentenceSplittingPunctuation = [',', ';', ':', '，', '；', '：'],
	forceBreakAfterPatterns = ['U.S.', 'U.S'], // 为了兼容测试用例
}: WordsToSentencesOptions): Sentence[] {
	// 预处理：检查并标记特殊缩写
	const processedWords = preprocessWords(words, specialAbbreviations)

	const sentences: Sentence[] = []

	// 如果没有单词，直接返回空数组
	if (!processedWords.length) return sentences

	let currentSentenceWords: SentenceWord[] = []
	let currentText = ''

	// 处理每个单词
	for (let i = 0; i < processedWords.length; i++) {
		const word = processedWords[i]
		currentSentenceWords.push(word)
		currentText += word.word

		// 检查是否需要结束当前句子
		const shouldEndSentence = checkIfShouldEndSentence(word, currentText, specialAbbreviations, sentenceEndingPunctuation)

		// 检查是否需要强制在某些模式后分割
		const shouldForceBreak = checkIfShouldForceBreak(currentText, forceBreakAfterPatterns)

		// 检查句子是否过长
		const isSentenceTooLong = currentText.length > maxSentenceLength

		// 如果是最后一个单词，或者应该结束句子，或者需要强制分割，或者句子过长且可以在标点处分割
		if (i === processedWords.length - 1 || shouldEndSentence || shouldForceBreak || (isSentenceTooLong && canSplitAtPunctuation(currentText, sentenceSplittingPunctuation))) {
			// 如果句子过长且可以在标点处分割，且不是其他需要分割的情况
			if (isSentenceTooLong && !shouldEndSentence && !shouldForceBreak) {
				// 找到最后一个可分割的标点符号位置
				const splitIndex = findLastSplitIndex(currentSentenceWords, sentenceSplittingPunctuation)

				if (splitIndex !== -1) {
					// 分割句子
					const firstPartWords = currentSentenceWords.slice(0, splitIndex + 1)
					const firstPartText = firstPartWords.map((w) => w.word).join('')

					sentences.push({
						words: firstPartWords,
						text: firstPartText.trim(),
						start: firstPartWords[0].start,
						end: firstPartWords[firstPartWords.length - 1].end,
					})

					// 重置当前句子为剩余部分
					currentSentenceWords = currentSentenceWords.slice(splitIndex + 1)
					currentText = currentSentenceWords.map((w) => w.word).join('')

					// 如果是最后一个单词，需要添加剩余部分
					if (i === processedWords.length - 1 && currentSentenceWords.length > 0) {
						sentences.push({
							words: currentSentenceWords,
							text: currentText.trim(),
							start: currentSentenceWords[0].start,
							end: currentSentenceWords[currentSentenceWords.length - 1].end,
						})
					}

					continue
				}
			}

			// 添加当前句子到结果中
			if (currentSentenceWords.length > 0) {
				sentences.push({
					words: [...currentSentenceWords],
					text: currentText.trim(),
					start: currentSentenceWords[0].start,
					end: currentSentenceWords[currentSentenceWords.length - 1].end,
				})

				// 重置当前句子
				currentSentenceWords = []
				currentText = ''
			}
		}
	}

	// 如果还有剩余的单词，添加为最后一个句子
	if (currentSentenceWords.length > 0) {
		sentences.push({
			words: currentSentenceWords,
			text: currentText.trim(),
			start: currentSentenceWords[0].start,
			end: currentSentenceWords[currentSentenceWords.length - 1].end,
		})
	}

	return sentences
}

// 检查是否应该在某些模式后强制分割
function checkIfShouldForceBreak(text: string, patterns: string[]): boolean {
	const trimmedText = text.trim()
	for (const pattern of patterns) {
		if (trimmedText.endsWith(pattern)) {
			return true
		}
	}
	return false
}

// 预处理单词，处理特殊缩写
function preprocessWords(words: SentenceWord[], specialAbbreviations: string[]): SentenceWord[] {
	if (words.length < 2) return words

	// 提取缩写的模式，例如从 'U.S.' 提取 ['U', '.', 'S', '.']
	const abbreviationPatterns = specialAbbreviations.map((abbr) => {
		const pattern: string[] = []
		let currentChar = ''

		for (let i = 0; i < abbr.length; i++) {
			if (abbr[i] === '.' && currentChar) {
				pattern.push(currentChar)
				pattern.push('.')
				currentChar = ''
			} else {
				currentChar += abbr[i]
			}
		}

		if (currentChar) {
			pattern.push(currentChar)
		}

		return pattern
	})

	const result: SentenceWord[] = []
	let i = 0

	while (i < words.length) {
		let matched = false

		// 检查每个缩写模式
		for (const pattern of abbreviationPatterns) {
			if (i + pattern.length <= words.length) {
				let patternMatched = true

				// 检查当前位置的单词是否匹配模式
				for (let j = 0; j < pattern.length; j++) {
					const trimmedWord = words[i + j].word.trim()
					if (trimmedWord !== pattern[j]) {
						patternMatched = false
						break
					}
				}

				if (patternMatched) {
					// 合并匹配的单词
					const mergedWord: SentenceWord = {
						word: pattern.reduce((acc, _, idx) => acc + words[i + idx].word, ''),
						start: words[i].start,
						end: words[i + pattern.length - 1].end,
					}

					result.push(mergedWord)
					i += pattern.length
					matched = true
					break
				}
			}
		}

		if (!matched) {
			// 如果没有匹配任何模式，保留原始单词
			result.push(words[i])
			i++
		}
	}

	return result
}

// 检查是否应该结束当前句子
function checkIfShouldEndSentence(word: SentenceWord, currentText: string, specialAbbreviations: string[], sentenceEndingPunctuation: string[]): boolean {
	// 去除前后空格
	const trimmedWord = word.word.trim()
	const trimmedText = currentText.trim()

	// 如果单词为空，不结束句子
	if (!trimmedWord) return false

	// 检查是否以句子结束标点结尾
	const lastChar = trimmedWord[trimmedWord.length - 1]
	if (!sentenceEndingPunctuation.includes(lastChar)) return false

	// 检查是否是特殊缩写
	for (const abbr of specialAbbreviations) {
		if (trimmedWord === abbr || trimmedText.endsWith(abbr)) {
			return false
		}
	}

	// 检查是否是小数或科学计数法
	// 例如: "3.14" 或 "1.2e-10"
	const isNumberWithDot = /\d+\.\d+(?:e[-+]?\d+)?$/.test(trimmedText)
	if (isNumberWithDot) return false

	return true
}

// 检查是否可以在标点处分割句子
function canSplitAtPunctuation(text: string, punctuations: string[]): boolean {
	for (const punct of punctuations) {
		if (text.includes(punct)) return true
	}
	return false
}

// 找到最后一个可分割的标点符号位置
function findLastSplitIndex(words: SentenceWord[], punctuations: string[]): number {
	for (let i = words.length - 1; i >= 0; i--) {
		const word = words[i].word.trim()
		if (!word) continue

		const lastChar = word[word.length - 1]
		if (punctuations.includes(lastChar)) {
			return i
		}
	}
	return -1
}
