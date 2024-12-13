import { createId } from '@paralleldrive/cuid2'
import { index, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const downloads = sqliteTable(
	'downloads',
	{
		id: text()
			.$defaultFn(() => createId())
			.unique(),
		link: text('link').notNull(),
		type: text({ enum: ['youtube', 'tiktok'] }).notNull(),
	},
	(t) => [index('id_idx').on(t.id)],
)

export const translateComments = sqliteTable(
	'translate_comments',
	{
		id: text()
			.$defaultFn(() => createId())
			.unique(),
	},
	(t) => [index('id_idx').on(t.id)],
)
