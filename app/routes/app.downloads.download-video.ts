import path from 'node:path'
import type { ActionFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { downloadFile } from '~/utils/download'
import { execCommand } from '~/utils/exec'
import { createOperationDir } from '~/utils/file'

async function downloadTiktokInfo({ id, downloadUrl }: { id: string; downloadUrl: string | null }) {
	if (!downloadUrl) {
		throw new Error('downloadUrl is required')
	}

	const dir = await createOperationDir(id)
	const filePath = path.join(dir, `${id}.mp4`)

	await downloadFile(downloadUrl, filePath)
	await db
		.update(schema.downloads)
		.set({
			filePath,
		})
		.where(eq(schema.downloads.id, id))
}

async function downloadYoutubeInfo({ id, link, highQuality }: { id: string; link: string; highQuality: boolean }) {
	const dir = await createOperationDir(id)
	const fileName = `${id}.%(ext)s`
	const filePath = path.join(dir, `${id}.mp4`)

	const qualityFilter = highQuality ? 'bv*[height<=1080][ext=webm]+ba[ext=webm]/b[ext=webm]' : 'bv*[height<=720][ext=webm]+ba[ext=webm]/b[ext=webm]'

	await execCommand(`cd ${dir} && yt-dlp '${link}' -f '${qualityFilter} / bv*+ba/b' --merge-output-format mp4 -o '${fileName}'`)

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

	const highQuality = !!formData.get('highQuality')

	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, id),
	})

	if (!download) {
		throw new Error('id is not correct')
	}

	const { type, downloadUrl, link } = download

	switch (type) {
		case 'tiktok':
			await downloadTiktokInfo({ id, downloadUrl })
			break

		case 'youtube':
			await downloadYoutubeInfo({ id, link, highQuality })
			break

		default:
			break
	}

	return {}
}
