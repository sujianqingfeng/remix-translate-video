type SentenceSegmentationOptions = {
	words: { start: number; end: number; word: string }[]
	maxSentenceLength?: number
}

type Sentence = {
	words: { start: number; end: number; word: string }[]
	text: string
}

// 先通过一些断句符号组装成一个一个长句
// 然后处理每个长句里面存在一些科学计数的逗号去掉，相应对应的word里面的逗号也要去掉
// 然后遍历这些长句，如果长度超过 maxSentenceLength，则将句子通过一些逗号之类的子句符号切分成多个子句，如果不存在子句符号，就不切分
export function processSentenceSegmentation({
	words,
	maxSentenceLength = 20,
}: SentenceSegmentationOptions) {
	const sentences: Sentence[] = []
	let currentSentence: typeof words = []

	// 定义句子结束的标点符号
	const sentenceEndMarks = /[.!?。！？]/
	// 定义可以用来分割子句的标点符号
	const subSentenceMarks = /[,，;；]/

	// 1. 先组装成长句
	for (let i = 0; i < words.length; i++) {
		const word = words[i]
		currentSentence.push(word)

		// 检查是否是句子结尾
		if (sentenceEndMarks.test(word.word) || i === words.length - 1) {
			// 2. 处理科学计数法中的逗号
			const processedSentence = currentSentence.map((w) => ({
				...w,
				word: w.word.replace(/(\d+),(\d{3})/g, '$1$2'),
			}))

			// 3. 如果句子过长，检查是否存在子句分隔符
			if (processedSentence.length > maxSentenceLength) {
				// 检查是否存在子句分隔符
				const hasSubSentenceMarks = processedSentence.some((w) =>
					subSentenceMarks.test(w.word),
				)

				if (hasSubSentenceMarks) {
					// 存在子句分隔符时才进行切分
					let subSentence: typeof words = []
					for (const w of processedSentence) {
						subSentence.push(w)

						if (subSentenceMarks.test(w.word) && subSentence.length >= 3) {
							sentences.push({
								words: subSentence,
								text: subSentence.map((w) => w.word).join(' '),
							})
							subSentence = []
						}
					}
					// 添加剩余的词作为最后一个子句
					if (subSentence.length > 0) {
						sentences.push({
							words: subSentence,
							text: subSentence.map((w) => w.word).join(' '),
						})
					}
				} else {
					// 不存在子句分隔符时，保持原句不切分
					sentences.push({
						words: processedSentence,
						text: processedSentence.map((w) => w.word).join(' '),
					})
				}
			} else {
				// 句子长度在允许范围内，直接添加
				sentences.push({
					words: processedSentence,
					text: processedSentence.map((w) => w.word).join(' '),
				})
			}

			currentSentence = []
		}
	}

	return sentences
}
