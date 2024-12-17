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

// 检查是否需要合并的特殊缩写
function isSpecialAbbreviation(words: SentenceWord[], abbreviation: string): boolean {
	const combinedText = words
		.map((w) => w.word)
		.join('')
		.toLowerCase()
		.trim()
	// 检查组合文本中是否包含任何缩写
	return combinedText.includes(abbreviation)
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
			const abbreviations = ['u.s', 'd.c.']

			const isSpecial = abbreviations.some((abbr) => {
				const lastWords = currentSentence.slice(-2)
				const firstWords = sentence.slice(0, abbr.length - 1)
				return isSpecialAbbreviation([...lastWords, ...firstWords], abbr)
			})
			// 检查是否需要合并
			if (isSpecial) {
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
		// 分别处理英文和中文文本
		const englishText = transcript.text
		const chineseText = transcript.textLiteralTranslation || ''

		// 如果英文和中文都不超长，直接添加
		if (englishText.length <= maxSentenceLength && (!chineseText || chineseText.length <= maxSentenceLength)) {
			result.push(transcript)
			continue
		}

		// 找到英文的分割点
		const spacePositions: number[] = []
		for (let i = 0; i < englishText.length; i++) {
			if (englishText[i] === ' ') {
				spacePositions.push(i)
			}
		}

		// 如果没有空格且英文不超长，使用中文分割点
		if (spacePositions.length === 0 && englishText.length <= maxSentenceLength) {
			// 查找中文分割点（标点符号）
			const chinesePuncPositions: number[] = []
			const chinesePuncRegex = /[，。！？；]/
			for (let i = 0; i < chineseText.length; i++) {
				if (chinesePuncRegex.test(chineseText[i])) {
					chinesePuncPositions.push(i)
				}
			}

			// 找到最接近中间的中文分割点
			const midPoint = Math.floor(chineseText.length / 2)
			const splitIndex = chinesePuncPositions.reduce((prev, curr) => (Math.abs(curr - midPoint) < Math.abs(prev - midPoint) ? curr : prev), chinesePuncPositions[0] || midPoint)

			// 分割成两个 Transcript
			const firstPart: Transcript = {
				text: englishText,
				textLiteralTranslation: chineseText.slice(0, splitIndex + 1).trim(),
				start: transcript.start,
				end: transcript.end,
				textInterpretation: transcript.textInterpretation,
				words: transcript.words,
			}

			const secondPart: Transcript = {
				text: englishText,
				textLiteralTranslation: chineseText.slice(splitIndex + 1).trim(),
				start: transcript.start,
				end: transcript.end,
				textInterpretation: transcript.textInterpretation,
				words: transcript.words,
			}

			result.push(firstPart, secondPart)
			continue
		}

		// 使用英文空格分割
		const splitIndex = spacePositions.reduce(
			(prev, curr) => (Math.abs(curr - maxSentenceLength) < Math.abs(prev - maxSentenceLength) ? curr : prev),
			spacePositions[0] || maxSentenceLength,
		)

		// 计算到这个位置有多少个单词
		const wordCount = englishText.slice(0, splitIndex).split(' ').length
		const words = transcript.words || []
		const splitTime = words[wordCount - 1]?.end || transcript.end

		// 根据英文分割比例来分割中文
		const chineseSplitIndex = Math.floor((splitIndex / englishText.length) * chineseText.length)

		// 分割成两个 Transcript
		const firstPart: Transcript = {
			text: englishText.slice(0, splitIndex).trim(),
			textLiteralTranslation: chineseText.slice(0, chineseSplitIndex).trim(),
			start: transcript.start,
			end: splitTime,
			textInterpretation: transcript.textInterpretation,
			words: words.slice(0, wordCount),
		}

		const secondPart: Transcript = {
			text: englishText.slice(splitIndex + 1).trim(),
			textLiteralTranslation: chineseText.slice(chineseSplitIndex).trim(),
			start: splitTime,
			end: transcript.end,
			textInterpretation: transcript.textInterpretation,
			words: words.slice(wordCount),
		}

		result.push(firstPart)
		result.push(...processTranslatedLongTranscripts([secondPart], maxSentenceLength))
	}

	return result
}

// 去除句子两边的符号
export function trimPunctuation(sentence: string): string {
	const punctuationRegex = /^[^\p{L}\p{N}]+|[^\p{L}\p{N}]+$/gu
	return sentence.replace(punctuationRegex, '')
}

// 生成 SRT 格式字幕，为英文和中文添加不同的样式标签
export function generateSRT(transcripts: Transcript[]): string {
	return transcripts
		.map((transcript, index) => {
			const startTime = formatSRTTime(transcript.start)
			const endTime = formatSRTTime(transcript.end)

			return `${index + 1}
${startTime} --> ${endTime}
${transcript.text}
${transcript.textLiteralTranslation || ''}

`
		})
		.join('')
}

// 格式化时间为 SRT 格式 (00:00:00,000)
function formatSRTTime(seconds: number): string {
	const date = new Date(seconds * 1000)
	const hh = String(Math.floor(seconds / 3600)).padStart(2, '0')
	const mm = String(date.getMinutes()).padStart(2, '0')
	const ss = String(date.getSeconds()).padStart(2, '0')
	const ms = String(date.getMilliseconds()).padStart(3, '0')

	return `${hh}:${mm}:${ss},${ms}`
}

export function generateFFmpegCommand(videoPath: string, escapedSrtPath: string) {
	return [
		'-y',
		'-threads',
		'2',
		'-i',
		videoPath,
		'-vf',
		`subtitles='${escapedSrtPath}':force_style='FontName=Microsoft YaHei,FontSize=17,Alignment=2,BorderStyle=0,Outline=0.4,Shadow=0,MarginV=20,PrimaryColour=&H00FFFF,BackColour=&H80000000,BorderColour=&H80000000'`,
		'-c:v',
		'libx264',
		'-preset',
		'medium',
		'-crf',
		'30',
		'-c:a',
		'copy',
	]
}
