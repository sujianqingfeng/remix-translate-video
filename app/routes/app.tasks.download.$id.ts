import type { LoaderFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { downloadTaskOutput } from '~/utils/remote-render'

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const id = params.id
	invariant(id, 'id is required')

	const task = await db.query.tasks.findFirst({
		where: eq(schema.tasks.id, id),
	})

	if (!task) {
		throw new Error('task not found')
	}

	// 获取流式响应
	const stream = await downloadTaskOutput(task.jobId)

	// 返回流式响应
	return new Response(stream, {
		status: 200,
		headers: {
			'Content-Type': 'video/mp4',
			'Content-Disposition': `attachment; filename="video-${task.id}.mp4"`,
			'Transfer-Encoding': 'chunked',
		},
	})
}
