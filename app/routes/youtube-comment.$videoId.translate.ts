import fsp from 'node:fs/promises'
import { type ActionFunctionArgs, redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import type { YoutubeComment } from '~/types'
import { translate } from '~/utils/ai'
import { getYoutubeCommentOut } from '~/utils/translate-comment'

export async function action({ params }: ActionFunctionArgs) {
	invariant(params.videoId, 'missing videoId')

	const videoId = params.videoId
	const { commentFile, infoFile } = getYoutubeCommentOut(videoId)

	const commentStr = await fsp.readFile(commentFile, 'utf-8')
	const comments: YoutubeComment[] = JSON.parse(commentStr)

	const translatedComments = await Promise.all(
		comments.map(async (comment) => {
			const translated = await translate(comment.content)
			comment.translatedContent = translated
			return comment
		}),
	)
	await fsp.writeFile(commentFile, JSON.stringify(translatedComments, null, 2))

	const infoStr = await fsp.readFile(infoFile, 'utf-8')
	const info = JSON.parse(infoStr)
	const translatedTitle = await translate(info.title)

	await fsp.writeFile(
		infoFile,
		JSON.stringify(
			{
				...info,
				translatedTitle,
				publishTitle: `外网真实评论：${translatedTitle}`,
			},
			null,
			2,
		),
	)

	return redirect(`/youtube-comment/${videoId}`)
}
