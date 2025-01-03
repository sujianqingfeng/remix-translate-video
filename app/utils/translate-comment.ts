import { commentModeOptions } from '~/config'
import type { schema } from '~/lib/drizzle'
import type { Comment, RemotionVideoComment } from '~/types'

type Mode = (typeof schema.translateComments.$inferSelect)['mode']

export function findModeOption(mode: Mode) {
	const currentModeOption = commentModeOptions.find((it) => it.value === mode)
	if (!currentModeOption) {
		throw new Error('currentModeOption is not found')
	}
	return currentModeOption
}

function generateRemotionTranslateComment(comments: Comment[], fps = 60, secondsForEvery30Words = 5) {
	let currentStartFrame = 0
	const remotionVideoComments: RemotionVideoComment[] = comments.map((comment, i) => {
		const textLength = comment.translatedContent?.length || 0
		const calculatedDuration = Math.max(3, Math.ceil((textLength / 30) * secondsForEvery30Words))
		const durationInFrames = fps * calculatedDuration

		const result = {
			...comment,
			durationInFrames,
			form: currentStartFrame,
		}

		currentStartFrame += durationInFrames
		return result
	})

	return remotionVideoComments
}

export async function buildTranslateCommentRemotionRenderData({
	fps,
	secondsForEvery30Words,
	coverDurationInSeconds,
	mode,
	comments,
}: {
	mode: Mode
	fps: number
	secondsForEvery30Words: number
	coverDurationInSeconds: number
	comments: Comment[]
}) {
	const remotionVideoComments = generateRemotionTranslateComment(comments, fps, secondsForEvery30Words)

	const coverDurationInFrames = coverDurationInSeconds * fps
	const lastComment = remotionVideoComments[remotionVideoComments.length - 1]
	const commentsEndFrame = lastComment ? lastComment.form + lastComment.durationInFrames : 0
	const totalDurationInFrames = coverDurationInFrames + commentsEndFrame

	const { playerHeight, playerWidth, compositionHeight, compositionWidth, compositionId } = findModeOption(mode)

	return {
		remotionVideoComments,
		totalDurationInFrames,
		coverDurationInFrames,
		playerHeight,
		playerWidth,
		compositionHeight,
		compositionWidth,
		compositionId,
		commentsEndFrame,
	}
}
