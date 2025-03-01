import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import type { AiModel } from '~/utils/ai'
import { translate } from '~/utils/translate'

export const action = async ({ params, request }: ActionFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const formData = await request.formData()
	const model = (formData.get('model') as AiModel) || 'deepseek'

	// 获取视频数据
	const where = eq(schema.translateVideos.id, id)
	const translateVideo = await db.query.translateVideos.findFirst({ where })
	invariant(translateVideo, 'translateVideo not found')

	// 处理标题翻译
	let titleZh = translateVideo.titleZh
	if (translateVideo.title && !titleZh) {
		titleZh = await translate(translateVideo.title, model)
	}

	// 更新数据库
	await db
		.update(schema.translateVideos)
		.set({
			titleZh,
		})
		.where(where)

	return { success: true }
}
