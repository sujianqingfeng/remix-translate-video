import { parseWithZod } from '@conform-to/zod'
import type { ActionFunctionArgs } from '@remix-run/node'
import { createInsertSchema } from 'drizzle-zod'
import { downloads } from '~/db/schema'
export const downloadsInsertSchema = createInsertSchema(downloads)

export async function action({ request }: ActionFunctionArgs) {
	const formData = await request.formData()
	const submission = parseWithZod(formData, { schema: downloadsInsertSchema })

	if (submission.status !== 'success') {
		return submission.reply()
	}

	return {}
}
