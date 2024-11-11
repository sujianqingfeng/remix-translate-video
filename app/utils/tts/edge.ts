import { EdgeTTS } from '@andresaya/edge-tts'

export async function generateTTS({
	text,
	rate = 100,
	outPath,
}: { text: string; rate?: number; outPath: string }) {
	const defaultVoice = 'en-GB-RyanNeural'
	const tts = new EdgeTTS()

	await tts.synthesize(text, defaultVoice, {
		rate: `${rate}%`,
		volume: '0%',
		pitch: '0Hz',
	})

	await tts.toFile(outPath)
}
