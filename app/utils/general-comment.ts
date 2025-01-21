import fs from 'node:fs'
import path from 'node:path'
import { PROXY, PUBLIC_DIR } from '~/constants'
import { LandscapeGeneralComment } from '~/remotion/general-comment/LandscapeGeneralComment'
import { PortraitGeneralComment } from '~/remotion/general-comment/PortraitGeneralComment'
import { VerticalGeneralComment } from '~/remotion/general-comment/VerticalGeneralComment'
import type { GeneralCommentTypeTextInfo } from '~/types'
import { downloadFile } from './download'

export type VideoMode = 'landscape' | 'portrait' | 'vertical'

// Video configuration based on mode
export const getVideoConfig = (mode: VideoMode) => {
	const config = {
		fps: 30,
		...(mode === 'portrait' ? { width: 1080, height: 1920 } : mode === 'vertical' ? { width: 1080, height: 1350 } : { width: 1920, height: 1080 }),
	}
	return config
}

// Calculate video durations
export const calculateDurations = (comment: any) => {
	const typeInfo = comment.typeInfo as GeneralCommentTypeTextInfo
	const fps = comment.fps || 30
	const coverDurationInSeconds = comment.coverDurationInSeconds || 3
	const secondsForEvery30Words = comment.secondsForEvery30Words || 5

	// Content duration
	const contentWords = typeInfo.content?.split(/\s+/).length || 0
	const contentZhWords = typeInfo.contentZh?.length ? Math.ceil(typeInfo.contentZh.length / 2) : 0
	const totalWords = contentWords + contentZhWords
	const contentDurationInSeconds = Math.max(Math.ceil(totalWords / 30) * secondsForEvery30Words, 5)

	// Comment durations
	const getCommentDuration = (comment: any) => {
		const baseSeconds = 5
		const wordCount = (comment.content?.length || 0) + (comment.translatedContent?.length || 0)
		const extraSeconds = Math.ceil(wordCount / 100) * 2
		return baseSeconds + extraSeconds
	}

	const commentsDurationInSeconds = (comment.comments || []).reduce((acc: number, comment: any) => acc + getCommentDuration(comment), 0)

	return {
		fps,
		coverDurationInSeconds,
		secondsForEvery30Words,
		contentDurationInSeconds,
		commentsDurationInSeconds,
		totalDurationInSeconds: coverDurationInSeconds + contentDurationInSeconds + commentsDurationInSeconds,
		commentDurations: (comment.comments || []).map(getCommentDuration),
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

export async function ensurePublicAssets(typeInfo: GeneralCommentTypeTextInfo, comments: any[] | null) {
	if (!comments) return { typeInfo, comments: [] }

	const publicDir = path.join(PUBLIC_DIR, 'assets', 'downloads')
	if (!fs.existsSync(publicDir)) {
		fs.mkdirSync(publicDir, { recursive: true })
	}

	// 处理主内容的媒体
	if (typeInfo.images) {
		const newImages = await Promise.all(
			typeInfo.images.map(async (url) => {
				// 如果已经是本地路径，直接返回
				if (isLocalPath(url)) return url

				const ext = path.extname(url) || '.jpg'
				const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
				const localPath = path.join(publicDir, filename)

				try {
					const success = await downloadFile(url, localPath, { proxy: PROXY })
					return success ? `/assets/downloads/${filename}` : url
				} catch (error) {
					console.error('Failed to download image:', error)
					return url
				}
			}),
		)
		typeInfo.images = newImages
	}

	if (typeInfo.video && !isLocalPath(typeInfo.video.url)) {
		const ext = path.extname(typeInfo.video.url) || '.mp4'
		const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
		const localPath = path.join(publicDir, filename)

		try {
			const success = await downloadFile(typeInfo.video.url, localPath, { proxy: PROXY })
			if (success) {
				typeInfo.video.url = `/assets/downloads/${filename}`
			}
		} catch (error) {
			console.error('Failed to download video:', error)
		}
	}

	// 处理评论中的媒体
	await Promise.all(
		comments.map(async (comment) => {
			if (comment.authorThumbnail && !isLocalPath(comment.authorThumbnail)) {
				const ext = path.extname(comment.authorThumbnail) || '.jpg'
				const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
				const localPath = path.join(publicDir, filename)

				try {
					const success = await downloadFile(comment.authorThumbnail, localPath, { proxy: PROXY })
					if (success) {
						comment.authorThumbnail = `/assets/downloads/${filename}`
					}
				} catch (error) {
					console.error('Failed to download author thumbnail:', error)
				}
			}

			if (comment.media) {
				await Promise.all(
					comment.media.map(async (media: { type: string; url: string }, mediaIndex: number) => {
						if (isLocalPath(media.url)) return

						const ext = path.extname(media.url) || (media.type === 'video' ? '.mp4' : '.jpg')
						const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
						const localPath = path.join(publicDir, filename)

						try {
							const success = await downloadFile(media.url, localPath, { proxy: PROXY })
							if (success) {
								media.url = `/assets/downloads/${filename}`
							}
						} catch (error) {
							console.error('Failed to download media:', error)
						}
					}),
				)
			}
		}),
	)

	return { typeInfo, comments }
}
