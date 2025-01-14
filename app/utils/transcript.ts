import type { Sentence, SentenceWord, Transcript } from '~/types'

type SentenceSegmentationOptions = {
	words: SentenceWord[]
	maxSentenceLength?: number
}

// 先组装成长句，同时处理科学计数法、小数和特殊缩写
export function assembleLongSentences(words: SentenceWord[]) {
	const sentences: SentenceWord[][] = []
	let currentSentence: typeof words = []
	const sentenceEndMarks = /[.!?。！？]/
	const specialAbbreviations = ['u.s', 'd.c']

	for (let i = 0; i < words.length; i++) {
		const word = words[i]
		const nextWord = words[i + 1]
		const prevWord = words[i - 1]

		// 处理科学计数法和小数
		if ((word.word === ',' || word.word === '.') && prevWord?.word?.match(/\d+/) && nextWord?.word?.match(/\d+/)) {
			// 合并数字
			if (currentSentence.length > 0) {
				const lastWord = currentSentence[currentSentence.length - 1]
				lastWord.word = `${lastWord.word}${word.word}${nextWord.word}`
				lastWord.end = nextWord.end
				i++ // 跳过下一个数字
				continue
			}
		}

		// 处理特殊缩写
		if (word.word === '.' && prevWord && nextWord) {
			const prevTwoChars = prevWord.word.toLowerCase()
			const nextTwoChars = nextWord.word.toLowerCase()
			const possibleAbbr = `${prevTwoChars}.${nextTwoChars}`

			if (specialAbbreviations.some((abbr) => possibleAbbr.includes(abbr))) {
				if (currentSentence.length > 0) {
					const lastWord = currentSentence[currentSentence.length - 1]
					lastWord.word = `${lastWord.word}.${nextWord.word}`
					lastWord.end = nextWord.end
					i++ // 跳过下一个字符
					continue
				}
			}
		}

		currentSentence.push(word)

		// 检查是否是句子结尾，但要排除特殊缩写的情况
		if (sentenceEndMarks.test(word.word)) {
			const isPartOfAbbreviation = specialAbbreviations.some((abbr) => {
				const lastFewWords = currentSentence
					.slice(-2)
					.map((w) => w.word)
					.join('')
					.toLowerCase()
				return lastFewWords.includes(abbr)
			})

			if (!isPartOfAbbreviation || i === words.length - 1) {
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

// 当Transcript的text长度超过maxSentenceLength时，进行分成两个Transcript
// 需要处理start和end，text，其他不用处理
// 返回新的Transcript数组

export function processTranslatedLongTranscripts(transcripts: Transcript[], maxSentenceLength = 70) {
	const result: Transcript[] = []

	for (const transcript of transcripts) {
		// 分别处理英文和中文文本
		const englishText = transcript.text
		const chineseText = transcript.textInterpretation || ''

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
				textInterpretation: chineseText.slice(0, splitIndex + 1).trim(),
				start: transcript.start,
				end: transcript.end,
				textLiteralTranslation: transcript.textLiteralTranslation,
				words: transcript.words,
			}

			const secondPart: Transcript = {
				text: englishText,
				textInterpretation: chineseText.slice(splitIndex + 1).trim(),
				start: transcript.start,
				end: transcript.end,
				textLiteralTranslation: transcript.textLiteralTranslation,
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
			textInterpretation: chineseText.slice(0, chineseSplitIndex).trim(),
			start: transcript.start,
			end: splitTime,
			textLiteralTranslation: transcript.textLiteralTranslation,
			words: words.slice(0, wordCount),
		}

		const secondPart: Transcript = {
			text: englishText.slice(splitIndex + 1).trim(),
			textInterpretation: chineseText.slice(chineseSplitIndex).trim(),
			start: splitTime,
			end: transcript.end,
			textLiteralTranslation: transcript.textLiteralTranslation,
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
