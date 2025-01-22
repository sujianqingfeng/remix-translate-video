import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { Comment, GeneralCommentTypeTextInfo } from '~/types'

export const generalComments = sqliteTable('general_comments', {
	id: text('id').primaryKey(),
	type: text('type', { enum: ['text'] }).notNull(),
	author: text('author').notNull(),
	typeInfo: text('type_info', { mode: 'json' }).$type<GeneralCommentTypeTextInfo>(),
	comments: text('comments', { mode: 'json' }).$type<Comment[]>(),
	fps: integer('fps').default(30),
	coverDurationInSeconds: integer('cover_duration_in_seconds').default(3),
	secondsForEvery30Words: integer('seconds_for_every_30_words').default(5),
	source: text('source', { enum: ['twitter', 'youtube'] }).notNull(),
	audioPath: text('audio_path'),
})
