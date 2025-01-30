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
		// 优先使用本地路径
		images: typeInfo.localImages || typeInfo.images || [],
		comments: comment.comments || [],
		fps: durations.fps,
		coverDurationInSeconds: durations.coverDurationInSeconds,
		contentDurationInSeconds: durations.contentDurationInSeconds,
		commentDurations: durations.commentDurations,
		audioPath: comment.audioPath,
		publicAudioPath: comment.publicAudioPath,
	}
}

function isLocalPath(url: string) {
	return url.startsWith('/assets/downloads/')
}

export const ensurePublicAssets = async (id: string, typeInfo: GeneralCommentTypeTextInfo, comments: Comment[]) => {
	const newTypeInfo = { ...typeInfo }
	const newComments = [...comments]

	// Handle images in typeInfo
	if (newTypeInfo.images) {
		const newLocalImages = await Promise.all(
			newTypeInfo.images.map(async (image, index) => {
				// 处理远程图片
				if (image.startsWith('http')) {
					try {
						const extension = path.extname(image) || '.png'
						const fileName = `image-${index}${extension}`
						const publicPath = getPublicAssetPath(id, fileName)
						const publicFilePath = await ensurePublicDir(publicPath)

						// 下载远程图片
						await downloadFile(image, publicFilePath, { proxy: PROXY })
						return publicPath
					} catch (error) {
						console.error('Failed to download image:', error)
						return null
					}
				}

				// 处理本地图片
				const extension = path.extname(image)
				const fileName = `image-${index}${extension}`
				const publicPath = getPublicAssetPath(id, fileName)
				const publicFilePath = await ensurePublicDir(publicPath)
				await copyFile(image, publicFilePath)
				return publicPath
			}),
		)
		// 保留原始图片路径，同时添加本地路径
		newTypeInfo.localImages = newLocalImages.filter(Boolean) as string[]
	}

	// Handle video in typeInfo
	if (newTypeInfo.video && !newTypeInfo.video.url.startsWith('http')) {
		const extension = path.extname(newTypeInfo.video.url)
		const fileName = `video${extension}`
		const publicPath = getPublicAssetPath(id, fileName)
		const publicFilePath = await ensurePublicDir(publicPath)
		await copyFile(newTypeInfo.video.url, publicFilePath)
		newTypeInfo.video.localUrl = publicPath
	}

	// Handle media in comments
	for (const [commentIndex, comment] of newComments.entries()) {
		if (comment.media) {
			const newMedia = await Promise.all(
				comment.media.map(async (media, mediaIndex) => {
					const newMedia = { ...media }

					// 处理远程资源
					if (media.url.startsWith('http')) {
						try {
							const extension = path.extname(media.url) || (media.type === 'video' ? '.mp4' : '.png')
							const fileName = `comment-${commentIndex}-media-${mediaIndex}${extension}`
							const publicPath = getPublicAssetPath(id, fileName)
							const publicFilePath = await ensurePublicDir(publicPath)

							// 下载远程资源
							await downloadFile(media.url, publicFilePath, { proxy: PROXY })
							newMedia.localUrl = publicPath
						} catch (error) {
							console.error('Failed to download media:', error)
							return media
						}
					} else {
						// 处理本地资源
						const extension = path.extname(media.url)
						const fileName = `comment-${commentIndex}-media-${mediaIndex}${extension}`
						const publicPath = getPublicAssetPath(id, fileName)
						const publicFilePath = await ensurePublicDir(publicPath)
						await copyFile(media.url, publicFilePath)
						newMedia.localUrl = publicPath
					}

					return newMedia
				}),
			)
			comment.media = newMedia
		}

		// 处理评论作者头像
		if (comment.authorThumbnail && comment.authorThumbnail.startsWith('http')) {
			try {
				const extension = path.extname(comment.authorThumbnail) || '.png'
				const fileName = `comment-${commentIndex}-author${extension}`
				const publicPath = getPublicAssetPath(id, fileName)
				const publicFilePath = await ensurePublicDir(publicPath)

				// 下载远程头像
				await downloadFile(comment.authorThumbnail, publicFilePath, { proxy: PROXY })
				comment.authorThumbnail = publicPath
			} catch (error) {
				console.error('Failed to download author thumbnail:', error)
			}
		}
	}

	return { typeInfo: newTypeInfo, comments: newComments }
}
