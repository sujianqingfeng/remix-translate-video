import { EdgeTTS } from 'node-edge-tts'
export async function generateTTS({ text, outPath, proxy }: { text: string; outPath: string; proxy: string }) {
	const tts = new EdgeTTS({
		voice: 'en-US-AnaNeural',
		lang: 'en-US',
		outputFormat: 'audio-24khz-96kbitrate-mono-mp3',
		saveSubtitles: true,
		proxy,
		timeout: 10000,
		rate: '-20%',
	})
	await tts.ttsPromise(text, outPath)
}
