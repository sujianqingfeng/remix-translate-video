import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { downloadFile } from '~/utils/download'
import { createDownloadDir } from '~/utils/file'

async function downloadTiktokInfo({ id, downloadUrl }: { id: string; downloadUrl: string | null }) {
	if (!downloadUrl) {
		throw new Error('downloadUrl is required')
	}

	const dir = await createDownloadDir(id)
	const filePath = path.join(dir, `${id}.mp4`)

	await downloadFile(downloadUrl, filePath)
	await db
		.update(schema.downloads)
		.set({
			filePath,
		})
		.where(eq(schema.downloads.id, id))
}

export const action = async ({ request }: ActionFunctionArgs) => {
	const formData = await request.formData()

	const id = formData.get('id')?.toString() ?? null

	invariant(id, 'id is required')

	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, id),
	})

	if (!download) {
		throw new Error('id is not correct')
	}

	const { type, downloadUrl } = download

	switch (type) {
		case 'tiktok':
			await downloadTiktokInfo({ id, downloadUrl })
			break

		case 'youtube':
			break

		default:
			break
	}

	return {}
}
