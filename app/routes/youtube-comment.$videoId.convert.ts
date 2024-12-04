import fsp from 'node:fs/promises'
import type { ActionFunctionArgs } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { YoutubeComment } from '~/types'
import { getYoutubeCommentOut } from '~/utils/translate-comment'

// 定义转换规则数组，每个元素是[查找词,替换词]
const conversions = [
	['中国', '熊猫'],
	// 可以添加更多转换规则
]

// 转换函数
function convert(text?: string): string {
	if (!text) return ''

	let result = text
	for (const [from, to] of conversions) {
		result = result.replace(new RegExp(from, 'g'), to)
	}
	return result
}

export async function action({ params }: ActionFunctionArgs) {
	invariant(params.videoId, 'missing videoId')

	const videoId = params.videoId
	const { commentFile } = getYoutubeCommentOut(videoId)

	const commentStr = await fsp.readFile(commentFile, 'utf-8')
	const comments: YoutubeComment[] = JSON.parse(commentStr)

	const convertedComments = comments.map((comment) => {
		const convertedContent = convert(comment.translatedContent)
		comment.convertedContent = convertedContent
		return comment
	})
	await fsp.writeFile(commentFile, JSON.stringify(convertedComments, null, 2))

	return { success: true }
}
