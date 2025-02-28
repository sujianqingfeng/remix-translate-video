import type { Sentence, SentenceWord, Transcript } from '~/types'

type SentenceSegmentationOptions = {
	words: SentenceWord[]
	maxSentenceLength?: number
}

// 配置常量
const SENTENCE_END_MARKS_PATTERN = /[.!?。！？]/
const NUMBER_PATTERN = /\d+/
const SPECIAL_ABBREVIATIONS = new Set(['u.s', 'd.c', 'U.S', 'i.e', 'A.I.', 'a.m', 'p.m', 'e.g', 'i.v'])

// 检查是否是数字
function isNumber(text: string | undefined): boolean {
	if (!text) return false
	return NUMBER_PATTERN.test(text)
}

// 检查是否是数字相关的点号或逗号
function isNumberRelatedMark(word: SentenceWord, prevWord: SentenceWord | undefined, nextWord: SentenceWord | undefined): boolean {
	return (word.word === '.' || word.word === ',') && isNumber(prevWord?.word) && isNumber(nextWord?.word)
}

// 检查是否是特殊缩写的一部分
function isPartOfSpecialAbbreviation(word: SentenceWord, words: SentenceWord[], currentIndex: number): boolean {
	if (word.word !== '.') return false

	// 获取当前点号前后的上下文
	const contextWords: string[] = []
	let leftIndex = currentIndex - 1
	let rightIndex = currentIndex + 1

	// 向左收集单词，直到遇到空格或达到列表开头
	while (leftIndex >= 0) {
		const leftWord = words[leftIndex].word
		if (leftWord.trim() === '') break
		contextWords.unshift(leftWord.toLowerCase())
		leftIndex--
	}

	// 向右收集单词，直到遇到空格或达到列表结尾
	while (rightIndex < words.length) {
		const rightWord = words[rightIndex].word
		if (rightWord.trim() === '') break
		contextWords.push(rightWord.toLowerCase())
		rightIndex++
	}

	// 将点号插入到适当位置
	contextWords.splice(currentIndex - leftIndex - 1, 0, '.')

	// 构建可能的缩写
	const possibleAbbr = contextWords.join('')

	// 检查是否匹配任何特殊缩写
	return Array.from(SPECIAL_ABBREVIATIONS).some((abbr) => {
		// 完全匹配
		if (possibleAbbr === abbr) return true
		// 部分匹配（缩写可能是更大字符串的一部分）
		if (possibleAbbr.includes(abbr)) return true
		// 缩写可能是possibleAbbr的一部分（处理不完整的缩写）
		if (abbr.includes(possibleAbbr)) return true
		return false
	})
}

// 检查是否是特殊缩写内部的点
function isInternalAbbreviationDot(word: SentenceWord, words: SentenceWord[], currentIndex: number): boolean {
	if (word.word !== '.') return false

	// 获取当前点号前后的上下文
	const contextWords: string[] = []
	let leftIndex = currentIndex - 1
	let rightIndex = currentIndex + 1

	// 向左收集单词，直到遇到空格或达到列表开头
	while (leftIndex >= 0) {
		const leftWord = words[leftIndex].word
		if (leftWord.trim() === '') break
		contextWords.unshift(leftWord.toLowerCase())
		leftIndex--
	}

	// 向右收集单词，直到遇到空格或达到列表结尾
	while (rightIndex < words.length) {
		const rightWord = words[rightIndex].word
		if (rightWord.trim() === '') break
		contextWords.push(rightWord.toLowerCase())
		rightIndex++
	}

	// 将点号插入到适当位置
	contextWords.splice(currentIndex - leftIndex - 1, 0, '.')

	// 构建可能的缩写
	const possibleAbbr = contextWords.join('')

	// 检查是否匹配任何特殊缩写
	return Array.from(SPECIAL_ABBREVIATIONS).some((abbr) => abbr.includes(possibleAbbr))
}

// 合并单词
function mergeWords(target: SentenceWord, connector: string, source: SentenceWord): void {
	target.word = `${target.word}${connector}${source.word}`
	target.end = source.end
}

// 先组装成长句，同时处理科学计数法、小数和特殊缩写
export function assembleLongSentences(words: SentenceWord[]) {
	if (!Array.isArray(words) || words.length === 0) {
		return []
	}

	const sentences: SentenceWord[][] = []
	let currentSentence: typeof words = []

	for (let i = 0; i < words.length; i++) {
		const word = words[i]
		const nextWord = words[i + 1]
		const prevWord = words[i - 1]

		// 处理科学计数法和小数
		if (isNumberRelatedMark(word, prevWord, nextWord)) {
			if (currentSentence.length > 0 && nextWord) {
				mergeWords(currentSentence[currentSentence.length - 1], word.word, nextWord)
				i++ // 跳过下一个数字
				continue
			}
		}

		// 处理特殊缩写
		if (isPartOfSpecialAbbreviation(word, words, i)) {
			if (currentSentence.length > 0 && nextWord) {
				mergeWords(currentSentence[currentSentence.length - 1], '.', nextWord)
				i++ // 跳过下一个字符
				continue
			}
		}

		currentSentence.push(word)

		// 检查是否是句子结尾
		if (SENTENCE_END_MARKS_PATTERN.test(word.word)) {
			const isNumberRelated = isNumberRelatedMark(word, prevWord, nextWord)
			const isInternalDot = isInternalAbbreviationDot(word, words, i)

			if ((!isNumberRelated && !isInternalDot) || i === words.length - 1) {
				sentences.push(currentSentence)
				currentSentence = []
			}
		} else if (i === words.length - 1) {
			sentences.push(currentSentence)
		}
	}

	return sentences
}

// 创建句子对象
function createSentence(words: SentenceWord[]): Sentence {
	return {
		words,
		text: words.map((w) => w.word).join(''),
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

export function processSentenceSegmentation({ words, maxSentenceLength = 70 }: SentenceSegmentationOptions) {
	// 1. 组装长句（已包含科学计数法、小数和特殊缩写的处理）
	const longSentences = assembleLongSentences(words)

	// 2. 处理每个长句
	const sentences: Sentence[] = []
	for (const longSentence of longSentences) {
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

type ProcessTranscriptOptions = {
	maxEnglishLength?: number
	maxChineseLength?: number
}

// 找到最近的单词边界
function findNearestWordBoundary(text: string, targetIndex: number): number {
	// 如果目标位置已经是空格，直接返回
	if (text[targetIndex]?.trim() === '') {
		return targetIndex
	}

	let leftIndex = targetIndex
	let rightIndex = targetIndex

	// 向左搜索最近的单词边界
	while (leftIndex > 0 && text[leftIndex - 1]?.trim() !== '') {
		leftIndex--
	}

	// 向右搜索最近的单词边界
	while (rightIndex < text.length && text[rightIndex]?.trim() !== '') {
		rightIndex++
	}

	// 返回距离目标位置最近的边界
	return targetIndex - leftIndex <= rightIndex - targetIndex ? leftIndex : rightIndex
}

export function processTranslatedLongTranscripts(transcripts: Transcript[], options: ProcessTranscriptOptions = {}) {
	const { maxEnglishLength = 70, maxChineseLength = 35 } = options
	const result: Transcript[] = []

	for (const transcript of transcripts) {
		const englishText = transcript.text
		const chineseText = transcript.textInterpretation || ''

		// 分别判断中英文长度
		if (englishText.length <= maxEnglishLength && (!chineseText || chineseText.length <= maxChineseLength)) {
			result.push(transcript)
			continue
		}

		// 使用标点符号作为分割依据
		const splitRegex = /([.!?。！？][\s]*)/g
		const englishSentences = englishText.split(splitRegex).filter(Boolean)

		// 只有当中文超过长度限制时才分割中文
		const shouldSplitChinese = chineseText.length > maxChineseLength
		const chineseSentences = shouldSplitChinese ? chineseText.split(/([。！？][\s]*)/g).filter(Boolean) : [chineseText]

		// 如果没有找到合适的分割点，回退到使用逗号分号
		if (englishSentences.length <= 1) {
			const fallbackRegex = /([,;，；][\s]*)/g
			const englishParts = englishText.split(fallbackRegex).filter(Boolean)
			const chineseParts = shouldSplitChinese ? chineseText.split(/([，；][\s]*)/g).filter(Boolean) : [chineseText]

			if (englishParts.length > 1) {
				const midPoint = Math.ceil(englishParts.length / 2)
				const firstEnglish = englishParts.slice(0, midPoint).join('')
				const secondEnglish = englishParts.slice(midPoint).join('')

				const chineseMidPoint = shouldSplitChinese ? Math.ceil(chineseParts.length / 2) : 1
				const firstChinese = shouldSplitChinese ? chineseParts.slice(0, chineseMidPoint).join('') : chineseText
				const secondChinese = shouldSplitChinese ? chineseParts.slice(chineseMidPoint).join('') : chineseText

				// 计算分割时间点
				const words = transcript.words || []
				const splitRatio = firstEnglish.length / englishText.length
				const splitWordIndex = Math.floor(words.length * splitRatio)
				const splitTime = words[splitWordIndex - 1]?.end || transcript.end

				const firstPart: Transcript = {
					text: firstEnglish.trim(),
					textInterpretation: firstChinese.trim(),
					start: transcript.start,
					end: splitTime,
					textLiteralTranslation: transcript.textLiteralTranslation,
					words: words.slice(0, splitWordIndex),
				}

				const secondPart: Transcript = {
					text: secondEnglish.trim(),
					textInterpretation: secondChinese.trim(),
					start: splitTime,
					end: transcript.end,
					textLiteralTranslation: transcript.textLiteralTranslation,
					words: words.slice(splitWordIndex),
				}

				result.push(firstPart)
				result.push(...processTranslatedLongTranscripts([secondPart], options))
			} else {
				// 如果实在没有合适的分割点，找到最近的单词边界
				const targetSplitIndex = Math.floor(englishText.length / 2)
				const splitIndex = findNearestWordBoundary(englishText, targetSplitIndex)
				const chineseSplitIndex = shouldSplitChinese ? Math.floor(chineseText.length / 2) : chineseText.length

				const words = transcript.words || []
				const splitRatio = splitIndex / englishText.length
				const splitWordIndex = Math.floor(words.length * splitRatio)
				const splitTime = words[splitWordIndex - 1]?.end || transcript.end

				const firstPart: Transcript = {
					text: englishText.slice(0, splitIndex).trim(),
					textInterpretation: shouldSplitChinese ? chineseText.slice(0, chineseSplitIndex).trim() : chineseText,
					start: transcript.start,
					end: splitTime,
					textLiteralTranslation: transcript.textLiteralTranslation,
					words: words.slice(0, splitWordIndex),
				}

				const secondPart: Transcript = {
					text: englishText.slice(splitIndex).trim(),
					textInterpretation: shouldSplitChinese ? chineseText.slice(chineseSplitIndex).trim() : chineseText,
					start: splitTime,
					end: transcript.end,
					textLiteralTranslation: transcript.textLiteralTranslation,
					words: words.slice(splitWordIndex),
				}

				result.push(firstPart)
				result.push(...processTranslatedLongTranscripts([secondPart], options))
			}
		} else {
			// 使用句号等标点符号作为分割点
			const midPoint = Math.ceil(englishSentences.length / 2)
			const firstEnglish = englishSentences.slice(0, midPoint).join('')
			const secondEnglish = englishSentences.slice(midPoint).join('')

			const chineseMidPoint = shouldSplitChinese ? Math.ceil(chineseSentences.length / 2) : 1
			const firstChinese = shouldSplitChinese ? chineseSentences.slice(0, chineseMidPoint).join('') : chineseText
			const secondChinese = shouldSplitChinese ? chineseSentences.slice(chineseMidPoint).join('') : chineseText

			const words = transcript.words || []
			const splitRatio = firstEnglish.length / englishText.length
			const splitWordIndex = Math.floor(words.length * splitRatio)
			const splitTime = words[splitWordIndex - 1]?.end || transcript.end

			const firstPart: Transcript = {
				text: firstEnglish.trim(),
				textInterpretation: firstChinese.trim(),
				start: transcript.start,
				end: splitTime,
				textLiteralTranslation: transcript.textLiteralTranslation,
				words: words.slice(0, splitWordIndex),
			}

			const secondPart: Transcript = {
				text: secondEnglish.trim(),
				textInterpretation: secondChinese.trim(),
				start: splitTime,
				end: transcript.end,
				textLiteralTranslation: transcript.textLiteralTranslation,
				words: words.slice(splitWordIndex),
			}

			result.push(firstPart)
			result.push(...processTranslatedLongTranscripts([secondPart], options))
		}
	}

	return result
}

// 去除句子两边的符号
export function trimPunctuation(sentence: string): string {
	const punctuationRegex = /^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu
	return sentence.replace(punctuationRegex, '')
}

// 生成 ASS 格式字幕
export function generateASS(transcripts: Transcript[]): string {
	const header = `[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
ScaledBorderAndShadow: yes

[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Default,Microsoft YaHei,60,&HFFFFFF,&HFFFFFF,&H000000,&H40000000,0,0,0,0,100,100,0,0,4,1,0,2,0,0,100,1

[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text`

	const events = transcripts
		.map((transcript) => {
			const start = formatASSTime(transcript.start)
			const end = formatASSTime(transcript.end)
			const text = transcript.text
			const translation = transcript.textInterpretation || ''

			return `Dialogue: 0,${start},${end},Default,,0,0,0,,{\\1a&H00&\\2a&H00&\\3a&H00&\\4a&H40&}${text}\\N${translation}`
		})
		.join('\n')

	return `${header}\n\n${events}`
}

// 格式化时间为 ASS 格式 (0:00:00.00)
function formatASSTime(seconds: number): string {
	const hours = Math.floor(seconds / 3600)
	const minutes = Math.floor((seconds % 3600) / 60)
	const secs = seconds % 60
	return `${hours}:${String(minutes).padStart(2, '0')}:${String(Math.floor(secs)).padStart(2, '0')}.${String(Math.floor((secs % 1) * 100)).padStart(2, '0')}`
}

export function generateFFmpegCommand(videoPath: string, escapedSrtPath: string) {
	return [
		'-y',
		// Limit CPU usage
		'-threads',
		'2',
		'-thread_queue_size',
		'512',
		'-filter_threads',
		'2',
		'-filter_complex_threads',
		'2',
		// Input file
		'-i',
		videoPath,
		// Subtitle filter (for ASS format, we don't need force_style as styles are defined in the ASS file)
		'-vf',
		`ass='${escapedSrtPath}'`,
		// Video encoding settings with CPU optimization
		'-c:v',
		'libx264',
		'-preset',
		'faster',
		'-crf',
		'30',
		// Additional CPU optimization for x264
		'-x264-params',
		'ref=2:me=dia:subme=4:trellis=0',
		// Copy audio stream without re-encoding
		'-c:a',
		'copy',
	]
}

export function alignWords(words: SentenceWord[], sentences: string[]): Sentence[] {
	if (!words.length || !sentences.length) {
		return []
	}

	const result: Sentence[] = []

	// 构建完整的转录文本
	const fullTranscript = words.map((w) => w.word).join('')

	// 规范化文本以便于匹配
	const normalizeText = (text: string) => {
		return text.replace(/\s+/g, ' ').trim().toLowerCase()
	}

	// 为每个句子找到在完整转录文本中的位置
	let startSearchIndex = 0

	for (const sentence of sentences) {
		if (!sentence.trim()) {
			continue
		}

		// 尝试在转录文本中找到句子
		const normalizedSentence = normalizeText(sentence)
		const normalizedTranscript = normalizeText(fullTranscript.substring(startSearchIndex))

		// 使用模糊匹配查找句子在转录文本中的位置
		let sentenceStartIndex = findBestMatch(normalizedSentence, normalizedTranscript)

		if (sentenceStartIndex === -1) {
			// 如果找不到匹配，尝试使用句子的前半部分
			const halfSentence = normalizedSentence.substring(0, Math.floor(normalizedSentence.length / 2))
			sentenceStartIndex = normalizedTranscript.indexOf(halfSentence)

			// 如果还是找不到，跳过这个句子
			if (sentenceStartIndex === -1) {
				continue
			}
		}

		// 调整为全局索引
		sentenceStartIndex += startSearchIndex

		// 找到句子结束的位置
		let sentenceEndIndex = sentenceStartIndex
		let wordCount = 0
		let sentenceLength = 0

		// 找到包含句子的单词范围
		let startWordIndex = -1
		let endWordIndex = -1
		let currentPosition = 0

		for (let i = 0; i < words.length; i++) {
			const word = words[i]
			const prevPosition = currentPosition
			currentPosition += word.word.length

			// 找到起始单词
			if (prevPosition <= sentenceStartIndex && currentPosition > sentenceStartIndex && startWordIndex === -1) {
				startWordIndex = i
			}

			// 累计句子长度
			if (startWordIndex !== -1) {
				wordCount++
				sentenceLength += word.word.length

				// 检查是否已经覆盖了足够的文本
				if (
					sentenceLength >= normalizedSentence.length * 0.8 ||
					(wordCount > 5 && normalizeText(fullTranscript.substring(sentenceStartIndex, currentPosition)).includes(normalizedSentence))
				) {
					endWordIndex = i
					sentenceEndIndex = currentPosition
					break
				}
			}

			// 如果已经处理了太多单词但还没找到匹配，设置一个上限
			if (startWordIndex !== -1 && wordCount > 30) {
				endWordIndex = i
				sentenceEndIndex = currentPosition
				break
			}
		}

		// 如果找到了单词范围
		if (startWordIndex !== -1 && endWordIndex !== -1) {
			const sentenceWords = words.slice(startWordIndex, endWordIndex + 1)

			// 创建句子对象
			result.push({
				words: sentenceWords,
				text: sentence,
				start: sentenceWords[0].start,
				end: sentenceWords[sentenceWords.length - 1].end,
			})

			// 更新下一次搜索的起始位置
			startSearchIndex = sentenceEndIndex
		}
	}

	// 处理剩余的单词
	const lastWordIndex = result.length > 0 ? words.indexOf(result[result.length - 1].words[result[result.length - 1].words.length - 1]) + 1 : 0

	if (lastWordIndex < words.length && result.length > 0) {
		const remainingWords = words.slice(lastWordIndex)
		const lastSentence = result[result.length - 1]
		lastSentence.words = [...lastSentence.words, ...remainingWords]
		lastSentence.end = remainingWords[remainingWords.length - 1].end
	}

	return result
}

// 辅助函数：找到最佳匹配位置
function findBestMatch(needle: string, haystack: string): number {
	// 直接匹配
	const directIndex = haystack.indexOf(needle)
	if (directIndex !== -1) {
		return directIndex
	}

	// 尝试模糊匹配
	// 1. 移除所有标点符号后匹配
	const cleanNeedle = needle.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
	const cleanHaystack = haystack.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
	const cleanIndex = cleanHaystack.indexOf(cleanNeedle)
	if (cleanIndex !== -1) {
		// 找到对应的原始索引
		let originalIndex = 0
		let cleanCounter = 0
		while (cleanCounter < cleanIndex && originalIndex < haystack.length) {
			if (!/[.,\/#!$%\^&\*;:{}=\-_`~()]/.test(haystack[originalIndex])) {
				cleanCounter++
			}
			originalIndex++
		}
		return originalIndex
	}

	// 2. 尝试匹配前几个单词
	const needleWords = needle.split(/\s+/)
	if (needleWords.length > 3) {
		const firstFewWords = needleWords.slice(0, 3).join(' ')
		return haystack.indexOf(firstFewWords)
	}

	return -1
}
