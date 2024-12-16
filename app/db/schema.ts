import { createId } from '@paralleldrive/cuid2'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export type Comment = {
	content: string
	author: string
	likes: number
	authorThumbnail: string
	publishedTime: string
	translatedContent?: string
}

export const downloads = sqliteTable(
	'downloads',
	{
		id: text()
			.$defaultFn(() => createId())
			.unique(),
		link: text('link').notNull(),
		type: text({ enum: ['youtube', 'tiktok'] }).notNull(),
		author: text('author'),
		title: text('title'),
		viewCountText: text('view_count_text'),
		likeCountText: text('like_count_text'),
		downloadUrl: text('download_url'),
		filePath: text('file_path'),
		commentCountText: text('comment_count_text'),
	},
	(t) => [index('downloads_id_idx').on(t.id)],
)

export const translateComments = sqliteTable(
	'translate_comments',
	{
		id: text()
			.$defaultFn(() => createId())
			.unique(),
		translatedTitle: text('translated_title'),
		downloadId: text('download_id').notNull(),
		comments: text({ mode: 'json' }).$type<Comment[]>().default([]),
		commentPullAt: integer('comment_pull_at', { mode: 'timestamp_ms' }),
	},
	(t) => [index('translate_comments_id_idx').on(t.id)],
)
