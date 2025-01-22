const words = ['习', 'XI', 'dengxiao', '毛主席', '共产', '天安', 'Mainland China', 'mainland China', 'Tianan', 'Taiwan', 'CCP']

export function checkSensitiveWords(text: string) {
	return words.some((word) => text.includes(word))
}
