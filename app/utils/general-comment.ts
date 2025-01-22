import fs from 'node:fs'
import { copyFile } from 'node:fs/promises'
import path from 'node:path'
import { PROXY, PUBLIC_DIR } from '~/constants'
import { LandscapeGeneralComment } from '~/remotion/general-comment/LandscapeGeneralComment'
import { PortraitGeneralComment } from '~/remotion/general-comment/PortraitGeneralComment'
import { VerticalGeneralComment } from '~/remotion/general-comment/VerticalGeneralComment'
import type { Comment, GeneralCommentTypeTextInfo } from '~/types'
import { downloadFile } from './download'
import { ensurePublicDir, getPublicAssetPath } from './file'

export type VideoMode = 'landscape' | 'portrait' | 'vertical'

// Video configuration based on mode
export const getVideoConfig = (mode: VideoMode) => {
	switch (mode) {
		case 'portrait':
			return {
				width: 1080,
				height: 1920,
			}
		case 'vertical':
			return {
				width: 1080,
				height: 1350,
			}
		default:
			return {
				width: 1920,
				height: 1080,
			}
	}
}

// Calculate video durations
export const calculateDurations = (comment: {
	fps: number
	coverDurationInSeconds: number
	secondsForEvery30Words: number
	typeInfo: GeneralCommentTypeTextInfo
	comments: Comment[]
}) => {
	const fps = comment.fps
	const coverDurationInSeconds = comment.coverDurationInSeconds
	const secondsForEvery30Words = comment.secondsForEvery30Words

	// Calculate content duration
	const contentWords = [comment.typeInfo.content, comment.typeInfo.contentZh].filter(Boolean).join(' ').split(/\s+/).length
	const contentDurationInSeconds = Math.ceil((contentWords / 30) * secondsForEvery30Words)

	// Calculate comment durations
	const commentDurations = comment.comments.map((c) => {
		const words = [c.content, c.translatedContent].filter(Boolean).join(' ').split(/\s+/).length
		return Math.ceil((words / 30) * secondsForEvery30Words)
	})

	// Calculate total duration
	const totalDurationInSeconds = coverDurationInSeconds + contentDurationInSeconds + commentDurations.reduce((acc, curr) => acc + curr, 0)

	return {
		fps,
		coverDurationInSeconds,
		contentDurationInSeconds,
		commentDurations,
		totalDurationInSeconds,
	}
}

// Get composition ID based on mode
export const getCompositionId = (mode: VideoMode) => {
	return mode === 'portrait' ? 'PortraitGeneralComment' : mode === 'vertical' ? 'VerticalGeneralComment' : 'LandscapeGeneralComment'
}

// Prepare input props for the video
export const prepareVideoProps = (comment: any, durations: ReturnType<typeof calculateDurations>) => {
	const typeInfo = comment.typeInfo as GeneralCommentTypeTextInfo
	return {
		title: typeInfo.title || '',
		content: typeInfo.content || '',
		contentZh: typeInfo.contentZh || '',
		author: comment.author,
		images: typeInfo.images || [],
		comments: comment.comments || [],
		fps: durations.fps,
		coverDurationInSeconds: durations.coverDurationInSeconds,
		contentDurationInSeconds: durations.contentDurationInSeconds,
		commentDurations: durations.commentDurations,
	}
}

function isLocalPath(url: string) {
	return url.startsWith('/assets/downloads/')
}

export const ensurePublicAssets = async (typeInfo: GeneralCommentTypeTextInfo, comments: Comment[]) => {
	const newTypeInfo = { ...typeInfo }
	const newComments = [...comments]

	// Handle images in typeInfo
	if (newTypeInfo.images) {
		const newImages = await Promise.all(
			newTypeInfo.images.map(async (image) => {
				if (image.startsWith('http')) {
					return image
				}

				// Copy local file to public directory
				const fileName = path.basename(image)
				const publicPath = getPublicAssetPath(path.dirname(image), fileName)
				const publicFilePath = await ensurePublicDir(publicPath)
				await copyFile(image, publicFilePath)
				return `/${publicPath}`
			}),
		)
		newTypeInfo.images = newImages
	}

	// Handle video in typeInfo
	if (newTypeInfo.video && !newTypeInfo.video.url.startsWith('http')) {
		const fileName = path.basename(newTypeInfo.video.url)
		const publicPath = getPublicAssetPath(path.dirname(newTypeInfo.video.url), fileName)
		const publicFilePath = await ensurePublicDir(publicPath)
		await copyFile(newTypeInfo.video.url, publicFilePath)
		newTypeInfo.video.url = `/${publicPath}`
	}

	// Handle media in comments
	for (const comment of newComments) {
		if (comment.media) {
			for (const media of comment.media) {
				if (!media.url.startsWith('http')) {
					const fileName = path.basename(media.url)
					const publicPath = getPublicAssetPath(path.dirname(media.url), fileName)
					const publicFilePath = await ensurePublicDir(publicPath)
					await copyFile(media.url, publicFilePath)
					media.url = `/${publicPath}`
				}
			}
		}
	}

	return { typeInfo: newTypeInfo, comments: newComments }
}
