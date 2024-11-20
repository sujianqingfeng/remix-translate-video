import fsp from 'node:fs/promises'
import { type ActionFunctionArgs, json, redirect } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { getYoutubeCommentOut } from '~/utils/translate-comment'

export async function action({ params, request }: ActionFunctionArgs) {
	invariant(params.videoId, 'missing videoId')

	const formData = await request.formData()
	const mode = formData.get('mode')

	const videoId = params.videoId
	const { infoFile } = getYoutubeCommentOut(videoId)

	const infoStr = await fsp.readFile(infoFile, 'utf-8')
	const info = JSON.parse(infoStr)

	await fsp.writeFile(
		infoFile,
		JSON.stringify(
			{
				...info,
				mode,
			},
			null,
			2,
		),
	)

	return json({ success: true })
}
