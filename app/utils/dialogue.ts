import path from 'node:path'
import type { Dialogue } from '~/types'

export function buildDialogueRenderData({ dialogues, fps }: { dialogues: Dialogue[]; fps: number }) {
	const sentenceDurationInFrames = fps * 6
	const remotionDialogues = dialogues.map((dialogue, index) => {
		return {
			...dialogue,
			publicAudioPath: dialogue.audioFilePath ? `/${path.basename(dialogue.audioFilePath)}` : undefined,
			durationInFrames: sentenceDurationInFrames,
			form: index * sentenceDurationInFrames,
		}
	})

	const totalDurationInFrames = remotionDialogues.length * sentenceDurationInFrames

	return {
		remotionDialogues,
		totalDurationInFrames,
		compositionWidth: 1920,
		compositionHeight: 1080,
		playWidth: 1080,
		playHeight: 720,
	}
}
