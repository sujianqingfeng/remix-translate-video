import { createId } from '@paralleldrive/cuid2'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export type Comment = {
	content: string
	author: string
	likes: string
	authorThumbnail: string
	publishedTime: string
	translatedContent?: string
}

export type CompositionInfo = {
	fps: number
	durationInFrames: number
	width: number
	height: number
}

export const downloads = sqliteTable(
	'downloads',
	{
		id: text()
			.notNull()
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
			.notNull()
			.$defaultFn(() => createId())
			.unique(),
		translatedTitle: text('translated_title'),
		downloadId: text('download_id').notNull(),
		comments: text({ mode: 'json' }).$type<Comment[]>().default([]),
		commentPullAt: integer('comment_pull_at', { mode: 'timestamp_ms' }),
		jobId: text('job_id'),
		mode: text('mode', { enum: ['landscape', 'portrait', 'vertical'] })
			.notNull()
			.$default(() => 'landscape'),
		coverDurationInSeconds: integer('cover_duration_in_seconds').notNull().default(3),
		secondsForEvery30Words: integer('seconds_for_every_30_words').notNull().default(5),
		fps: integer('fps').notNull().default(30),
	},
	(t) => [index('translate_comments_id_idx').on(t.id)],
)

export const tasks = sqliteTable(
	'tasks',
	{
		id: text()
			.notNull()
			.$defaultFn(() => createId())
			.unique(),
		type: text('type', { enum: ['render-comments', 'render-short-texts', 'synthetic-subtitle'] }).notNull(),
		jobId: text('job_id').notNull(),
		status: text('status', { enum: ['pending', 'active', 'completed', 'failed'] })
			.notNull()
			.default('pending'),
		progress: integer('progress').notNull().default(0),
		desc: text('desc'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.notNull()
			.$defaultFn(() => new Date()),
	},
	(t) => [index('tasks_id_idx').on(t.id)],
)

export const translateVideos = sqliteTable(
	'translate_videos',
	{
		id: text()
			.notNull()
			.$defaultFn(() => createId())
			.unique(),
		source: text('source', { enum: ['download', 'upload'] }).notNull(),
		downloadId: text('download_id'),
		filePath: text('file_path'),
		asrResult: text('asr_result', { mode: 'json' }).$type<any[]>().default([]),
		transcripts: text('transcripts', { mode: 'json' }).$type<any[]>().default([]),
	},
	(t) => [index('translate_videos_id_idx').on(t.id)],
)
