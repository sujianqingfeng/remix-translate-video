import { eq } from 'drizzle-orm'
import { db, schema } from '~/lib/drizzle'

export async function getTranslateCommentAndDownloadInfo(id: string) {
	const translateComment = await db.query.translateComments.findFirst({
		where: eq(schema.translateComments.id, id),
	})

	if (!translateComment) {
		throw new Error('id is not correct')
	}

	const download = await db.query.downloads.findFirst({
		where: eq(schema.downloads.id, translateComment.downloadId),
	})

	if (!download) {
		throw new Error('download is not correct')
	}

	return {
		translateComment,
		download,
	}
}
