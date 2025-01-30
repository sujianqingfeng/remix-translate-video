import { rm } from 'node:fs/promises'
import path from 'node:path'
import { type ActionFunctionArgs, json } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const id = formData.get('id') as string
	invariant(id, 'id is required')

	// 获取记录信息，以便记录日志
	const comment = await db.query.generalComments.findFirst({
		where: eq(schema.generalComments.id, id),
	})

	if (!comment) {
		return json({ success: false, error: 'Comment not found' })
	}

	try {
		// 删除数据库记录
		await db.delete(schema.generalComments).where(eq(schema.generalComments.id, id))

		// 删除 operations 目录下的文件
		const operationsDir = path.join(process.cwd(), 'operations', id)
		await rm(operationsDir, { recursive: true, force: true })

		// 删除 public 目录下的资源文件
		const publicResourcesDir = path.join(process.cwd(), 'public', 'assets', 'operations', id, 'resources')
		await rm(publicResourcesDir, { recursive: true, force: true })

		// 删除 public 目录下的 id 目录（如果为空）
		const publicIdDir = path.join(process.cwd(), 'public', 'assets', 'operations', id)
		await rm(publicIdDir, { recursive: true, force: true }).catch(() => {
			// 忽略删除目录的错误，因为可能已经被删除
		})

		console.log(`Successfully deleted comment ${id} and its resources`)
		return json({ success: true })
	} catch (error) {
		console.error(`Failed to delete comment ${id}:`, error)
		return json({ success: false, error: 'Failed to delete comment and resources' })
	}
}
