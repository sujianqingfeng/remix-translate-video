import fsp from 'node:fs/promises'
import path from 'node:path'
import {
	OUT_DIR,
	YOUTUBE_COMMENTS_FILE,
	YOUTUBE_INFO_FILE,
	YOUTUBE_MAYBE_ORIGINAL_DOWNLOAD_FILES,
	YOUTUBE_ORIGINAL_HTML_FILE,
} from '~/constants'
import type { RemotionVideoComment, YoutubeComment } from '~/types'
import { fileExist } from '../file'

export function getYoutubeCommentOut(videoId: string) {
	const outDir = path.join(process.cwd(), OUT_DIR, videoId)

	return {
		outDir,
		get commentFile() {
			return path.join(outDir, YOUTUBE_COMMENTS_FILE)
		},
		get infoFile() {
			return path.join(outDir, YOUTUBE_INFO_FILE)
		},
		get originalHtmlFile() {
			return path.join(outDir, YOUTUBE_ORIGINAL_HTML_FILE)
		},
	}
}

export function generateRemotionVideoComment(
	comments: YoutubeComment[],
	fps = 60,
	durationInSeconds = 5,
) {
	const remotionVideoComments: RemotionVideoComment[] = comments.map(
		(comment, i) => {
			return {
				...comment,
				durationInFrames: fps * durationInSeconds,
				form: fps * durationInSeconds * i,
			}
		},
	)
	return remotionVideoComments
}

export async function tryGetYoutubeDownloadFile(videoId: string) {
	let originalVideoFile = ''
	const { outDir } = getYoutubeCommentOut(videoId)

	for (const file of YOUTUBE_MAYBE_ORIGINAL_DOWNLOAD_FILES) {
		const filePath = path.join(outDir, file)
		if (await fileExist(filePath)) {
			originalVideoFile = filePath
			break
		}
	}

	return originalVideoFile
}

export function generateYoutubeUrlByVideoId(videoId: string) {
	return `https://www.youtube.com/watch?v=${videoId}`
}

export function parseYoutubeTitle(html: string) {
	const startIndex = html.indexOf('videoPrimaryInfoRenderer')
	const end = startIndex + 200
	const str = html.slice(startIndex, end)
	const titleMatch = str.match(/"text":"([^"]+)"/)
	const title = titleMatch ? titleMatch[1] : 'Unknown Title'
	return title
}

interface TimeMatches {
	second?: RegExpMatchArray | null
	minute?: RegExpMatchArray | null
	hour?: RegExpMatchArray | null
	day?: RegExpMatchArray | null
	week?: RegExpMatchArray | null
	month?: RegExpMatchArray | null
	year?: RegExpMatchArray | null
}

export function parseYoutubeDateTime(html: string): string | null {
	try {
		// 尝试从 HTML 中提取日期相关信息
		const dateTextMatch = html.match(/"dateText":\{"simpleText":"([^"]+)"\}/)
		const relativeDateMatch = html.match(
			/"relativeDateText":\{"simpleText":"([^"]+)"\}/,
		)

		const dateText = dateTextMatch?.[1] || ''
		const relativeText = relativeDateMatch?.[1] || ''

		// 处理中文日期格式 (例如: "2024年11月6日")
		const chineseDatePattern = /(\d{4})年(\d{1,2})月(\d{1,2})日/
		const chineseMatch = dateText.match(chineseDatePattern)
		if (chineseMatch) {
			const [_, year, month, day] = chineseMatch
			const date = new Date(Number(year), Number(month) - 1, Number(day))
			date.setHours(0, 0, 0, 0)
			return formatDateTime(date)
		}

		// 处理英文标准日期格式
		const englishDatePattern = /([A-Za-z]+)\s+(\d+),?\s+(\d{4})/
		const englishMatch = dateText.match(englishDatePattern)
		if (englishMatch) {
			const months: { [key: string]: number } = {
				jan: 0,
				january: 0,
				feb: 1,
				february: 1,
				mar: 2,
				march: 2,
				apr: 3,
				april: 3,
				may: 4,
				jun: 5,
				june: 5,
				jul: 6,
				july: 6,
				aug: 7,
				august: 7,
				sep: 8,
				september: 8,
				oct: 9,
				october: 9,
				nov: 10,
				november: 10,
				dec: 11,
				december: 11,
			}

			const month = months[englishMatch[1].toLowerCase()]
			const day = Number(englishMatch[2])
			const year = Number(englishMatch[3])

			if (month !== undefined) {
				const date = new Date(year, month, day)
				date.setHours(0, 0, 0, 0)
				return formatDateTime(date)
			}
		}

		// 处理相对时间格式
		const timePatterns = {
			second: /(\d+)\s*(秒|seconds?)\s*(前|ago)/i,
			minute: /(\d+)\s*(分钟|minutes?)\s*(前|ago)/i,
			hour: /(\d+)\s*(小时|hours?)\s*(前|ago)/i,
			day: /(\d+)\s*(天|days?)\s*(前|ago)/i,
			week: /(\d+)\s*(周|weeks?)\s*(前|ago)/i,
			month: /(\d+)\s*(个?月|months?)\s*(前|ago)/i,
			year: /(\d+)\s*(年|years?)\s*(前|ago)/i,
		}

		for (const [unit, pattern] of Object.entries(timePatterns)) {
			const match = dateText.match(pattern) || relativeText.match(pattern)
			if (match) {
				const amount = Number(match[1])
				const now = new Date()
				const date = new Date(now)

				switch (unit) {
					case 'second':
						date.setSeconds(date.getSeconds() - amount)
						break
					case 'minute':
						date.setMinutes(date.getMinutes() - amount)
						break
					case 'hour':
						date.setHours(date.getHours() - amount)
						break
					case 'day':
						date.setDate(date.getDate() - amount)
						break
					case 'week':
						date.setDate(date.getDate() - amount * 7)
						break
					case 'month':
						date.setMonth(date.getMonth() - amount)
						break
					case 'year':
						date.setFullYear(date.getFullYear() - amount)
						break
				}

				return formatDateTime(date)
			}
		}

		return null
	} catch (error) {
		console.error('Failed to parse YouTube date:', error)
		return null
	}
}

function formatDateTime(date: Date): string {
	const year = date.getFullYear()
	const month = String(date.getMonth() + 1).padStart(2, '0')
	const day = String(date.getDate()).padStart(2, '0')
	const hours = String(date.getHours()).padStart(2, '0')
	const minutes = String(date.getMinutes()).padStart(2, '0')
	const seconds = String(date.getSeconds()).padStart(2, '0')

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export function parseYoutubeViewCount(html: string) {
	const startIndex = html.indexOf('videoPrimaryInfoRenderer')
	const end = startIndex + 500
	const str = html.slice(startIndex, end)
	const viewCountMatch =
		str.match(
			/"viewCount":\{"videoViewCountRenderer":\{"viewCount":\{"simpleText":"[^"]*?([0-9,]+)[^"]*?"\}/,
		) ||
		str.match(/"simpleText":"([0-9,]+)(?:次|views)"/) ||
		str.match(/"simpleText":"观看次数：([0-9,]+)"/) ||
		str.match(/"simpleText":"收看次數：([0-9,]+)次"/)
	const viewCount = viewCountMatch ? viewCountMatch[1].replace(/,/g, '') : '0'
	return +viewCount
}
