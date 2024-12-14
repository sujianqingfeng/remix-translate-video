import { createId } from '@paralleldrive/cuid2'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

type Comment = {
	content: string
	author: string
	likes: number
	authorThumbnail: string
	publishedTime: string
	translatedContent: string
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
		translatedTitle: text('translated_title'),
		comments: text({ mode: 'json' }).$type<Comment[]>().default([]),
	},
	(t) => [index('downloads_id_idx').on(t.id)],
)

export const translateComments = sqliteTable(
	'translate_comments',
	{
		id: text()
			.$defaultFn(() => createId())
			.unique(),

		content: text('content').notNull(),
		author: text('author').notNull(),
		likes: integer('likes'),
		authorThumbnail: text('author_thumbnail'),
		publishedTime: text('published_time'),
		translatedContent: text('translated_content'),
	},
	(t) => [index('translate_comments_id_idx').on(t.id)],
)
