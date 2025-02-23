import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { r1 } from '~/utils/ai'

export const action = async ({ params }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const translateComment = await db.query.translateComments.findFirst({
		where: eq(schema.translateComments.id, id),
	})
	invariant(translateComment, 'translateComment not found')

	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, translateComment.downloadId),
	})
	invariant(download, 'download not found')

	const system = '我需要一个发布视频的标题，视频内容主要是翻译评论，你需要根据标题和一些评论信息，给我一个吸引人的标题。'

	const generatedTitle = await r1.generateText({
		system,
		prompt: `标题：${translateComment.translatedTitle || download.title || ''} 评论：${translateComment.comments?.map((item) => item.translatedContent).join('\n')}`,
		maxTokens: 3000,
	})

	return { title: generatedTitle }
}
