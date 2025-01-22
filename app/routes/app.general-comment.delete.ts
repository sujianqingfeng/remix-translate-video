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

	// 删除数据库记录
	await db.delete(schema.generalComments).where(eq(schema.generalComments.id, id))

	// 删除 operations 目录下的文件
	const operationsDir = path.join(process.cwd(), 'operations', id)
	await rm(operationsDir, { recursive: true, force: true })

	// 删除 public 目录下的文件
	const publicDir = path.join(process.cwd(), 'public', 'assets', 'operations', id)
	await rm(publicDir, { recursive: true, force: true })

	return json({ success: true })
}
