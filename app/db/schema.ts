import { createId } from '@paralleldrive/cuid2'
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import type { AsrWord, Comment, Dialogue, FillInBlankSentence, GeneralCommentTypeTextInfo, LittleDifficultWord, SentenceTranscript, Transcript, WordTranscript } from '~/types'

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
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.notNull()
			.$defaultFn(() => new Date()),
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
		secondsForEvery30Words: integer('seconds_for_every_30_words').notNull().default(3),
		fps: integer('fps').notNull().default(30),
		outputFilePath: text('output_file_path'),
		sourceFilePath: text('source_file_path'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.notNull()
			.$defaultFn(() => new Date()),
	},
	(t) => [index('translate_comments_id_idx').on(t.id)],
)

export const generalComments = sqliteTable(
	'general_comments',
	{
		id: text()
			.notNull()
			.$defaultFn(() => createId())
			.unique(),

		type: text('type', { enum: ['text'] }).notNull(),
		author: text('author').notNull(),
		typeInfo: text('type_info', { mode: 'json' }).$type<GeneralCommentTypeTextInfo>().notNull(),
		source: text('source', { enum: ['twitter', 'youtube', 'tiktok', 'manual'] })
			.notNull()
			.$default(() => 'manual'),

		comments: text({ mode: 'json' }).$type<Comment[]>().default([]),
		commentPullAt: integer('comment_pull_at', { mode: 'timestamp_ms' }),
		jobId: text('job_id'),

		coverDurationInSeconds: integer('cover_duration_in_seconds').notNull().default(3),
		secondsForEvery30Words: integer('seconds_for_every_30_words').notNull().default(3),
		fps: integer('fps').notNull().default(30),
		outputFilePath: text('output_file_path'),
		sourceFilePath: text('source_file_path'),
		audioPath: text('audio_path'),
		publicAudioPath: text('public_audio_path'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.notNull()
			.$defaultFn(() => new Date()),
	},
	(t) => [index('general_comments_id_idx').on(t.id)],
)

export const translateVideos = sqliteTable(
	'translate_videos',
	{
		id: text()
			.notNull()
			.$defaultFn(() => createId())
			.unique(),
		title: text('title').default(''),
		titleZh: text('title_zh').default(''),
		source: text('source', { enum: ['download', 'upload'] }).notNull(),
		downloadId: text('download_id'),
		uploadFilePath: text('upload_file_path'),
		audioFilePath: text('audio_file_path'),
		asrWords: text('asr_words', { mode: 'json' }).$type<AsrWord[]>().default([]),
		transcripts: text('transcripts', { mode: 'json' }).$type<Transcript[]>().default([]),
		outputFilePath: text('output_file_path'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.notNull()
			.$defaultFn(() => new Date()),
	},
	(t) => [index('translate_videos_id_idx').on(t.id)],
)

export const shortTexts = sqliteTable(
	'short_texts',
	{
		id: text()
			.notNull()
			.$defaultFn(() => createId())
			.unique(),

		fps: integer('fps').notNull().default(120),

		title: text('title').notNull(),
		titleZh: text('title_zh').notNull(),
		shortText: text('short_text').notNull(),
		shortTextZh: text('short_text_zh').notNull(),
		littleDifficultWords: text('little_difficult_words', { mode: 'json' }).$type<LittleDifficultWord[]>().default([]),

		wordTranscripts: text('word_transcripts', { mode: 'json' }).$type<WordTranscript[]>().default([]),
		sentenceTranscripts: text('sentence_transcripts', { mode: 'json' }).$type<SentenceTranscript[]>().default([]),

		direction: integer('direction').notNull().default(0),

		audioFilePath: text('audio_file_path'),
		coverFilePath: text('cover_file_path'),
		outputFilePath: text('output_file_path'),
		jobId: text('job_id'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.notNull()
			.$defaultFn(() => new Date()),
	},
	(t) => [index('short_texts_id_idx').on(t.id)],
)

export const fillInBlanks = sqliteTable(
	'fill_in_blanks',
	{
		id: text()
			.notNull()
			.$defaultFn(() => createId())
			.unique(),
		fps: integer('fps').notNull().default(60),
		sentences: text('sentences', { mode: 'json' }).notNull().$type<FillInBlankSentence[]>().default([]),
		outputFilePath: text('output_file_path'),
		jobId: text('job_id'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.notNull()
			.$defaultFn(() => new Date()),
	},
	(t) => [index('fill_in_blank_id_idx').on(t.id)],
)

export const dialogues = sqliteTable(
	'dialogues',
	{
		id: text()
			.notNull()
			.$defaultFn(() => createId())
			.unique(),
		dialogues: text('dialogues', { mode: 'json' }).notNull().$type<Dialogue[]>().default([]),
		fps: integer('fps').notNull().default(40),
		outputFilePath: text('output_file_path'),
		jobId: text('job_id'),
		createdAt: integer('created_at', { mode: 'timestamp_ms' })
			.notNull()
			.$defaultFn(() => new Date()),
	},
	(t) => [index('dialogues_id_idx').on(t.id)],
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
