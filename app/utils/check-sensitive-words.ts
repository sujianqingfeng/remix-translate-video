const words = ['习', 'XI', 'dengxiao', '毛主席', '杀', '共产党', '天安门', 'Mainland China', 'mainland China']

export function checkSensitiveWords(text: string) {
	return words.some((word) => text.includes(word))
}
