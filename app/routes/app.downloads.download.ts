import { parseWithZod } from '@conform-to/zod'
import { type ActionFunctionArgs, data } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import type { SubmissionReply } from '~/api/types'
import { db, schema } from '~/lib/drizzle'
import { downloadTiktok } from '~/utils/tiktok'
export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()
	const submission = parseWithZod(formData, {
		schema: z.object({
			id: z.string().uuid(),
		}),
	})

	if (submission.status !== 'success') {
		return data<SubmissionReply>({ submissionReply: submission.reply() })
	}

	const { id } = submission.value

	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, id),
	})

	if (!download) {
		throw new Error('id is not correct')
	}

	const { type, link } = download

	switch (type) {
		case 'tiktok':
			downloadTiktok(link)
			break

		case 'youtube':
			break

		default:
			break
	}

	return {}
}
