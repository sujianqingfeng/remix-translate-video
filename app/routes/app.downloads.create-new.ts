import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, data } from '@remix-run/node'
import { downloadsInsertSchema } from '~/api/schema'
import type { SubmissionReply } from '~/api/types'
import { db, schema } from '~/lib/drizzle'

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const submission = parseWithZod(formData, { schema: downloadsInsertSchema })

	if (submission.status !== 'success') {
		return data<SubmissionReply>({ submissionReply: submission.reply() })
	}
	await db.insert(schema.downloads).values(submission.value)
	return { success: true }
}
