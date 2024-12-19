import { readFile } from 'node:fs/promises'
import path from 'node:path'
import type { LoaderFunctionArgs } from '@remix-run/node'
import { eq } from 'drizzle-orm'
import invariant from 'tiny-invariant'
import { db, schema } from '~/lib/drizzle'
import { execCommand } from '~/utils/exec'
import { createDownloadDir } from '~/utils/file'

async function downloadYoutubeAudio({ link, id, downloadId }: { link: string; id: string; downloadId: string }) {
	const dir = await createDownloadDir(downloadId)
	const fileName = `${downloadId}.wav`
	const audioFilePath = path.join(dir, fileName)
	await execCommand(`cd ${dir} && yt-dlp -f "ba" --extract-audio --audio-format wav --postprocessor-args "ffmpeg:-ar 16000" ${link} --output "${downloadId}.%(ext)s"`)

	await db
		.update(schema.translateVideos)
		.set({
			audioFilePath,
		})
		.where(eq(schema.translateVideos.id, id))
}

async function parseDownloadAudio({ id, downloadId }: { id: string; downloadId: string }) {
	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, downloadId),
	})
	invariant(download, 'download not found')

	const { type, link } = download

	switch (type) {
		case 'youtube':
			await downloadYoutubeAudio({ link, id, downloadId })
			break

		default:
			break
	}
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { id } = params
	invariant(id, 'id is required')

	const where = eq(schema.translateVideos.id, id)
	const translateVideo = await db.query.translateVideos.findFirst({
		where,
	})
	invariant(translateVideo, 'translateVideo not found')

	const { source, downloadId } = translateVideo

	switch (source) {
		case 'download':
			invariant(downloadId, 'downloadId is required')
			await parseDownloadAudio({ id, downloadId })
			break

		default:
			break
	}

	const newTranslateVideo = await db.query.translateVideos.findFirst({
		where,
	})

	invariant(newTranslateVideo, 'newTranslateVideo not found')

	const { audioFilePath } = newTranslateVideo

	invariant(audioFilePath, 'audioFilePath is required')

	const buffer = await readFile(audioFilePath)

	return new Response(buffer, {
		status: 200,
		headers: {
			'Content-Type': 'audio/wav',
			'Content-Disposition': `attachment; filename="audio-${id}.wav"`,
			'Content-Length': buffer.length.toString(),
		},
	})
}
