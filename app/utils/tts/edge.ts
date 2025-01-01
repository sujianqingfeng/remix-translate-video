import { EdgeTTS } from 'node-edge-tts'
export async function generateTTS({
	text,
	outPath,
	proxy,
	saveSubtitles = true,
	rate = '-20%',
}: { text: string; outPath: string; proxy: string; saveSubtitles?: boolean; rate?: string }) {
	const tts = new EdgeTTS({
		voice: 'en-US-AnaNeural',
		lang: 'en-US',
		outputFormat: 'audio-24khz-96kbitrate-mono-mp3',
		saveSubtitles,
		proxy,
		timeout: 10000,
		rate,
	})
	await tts.ttsPromise(text, outPath)
}
