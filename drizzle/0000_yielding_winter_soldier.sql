CREATE TABLE `downloads` (
	`id` text NOT NULL,
	`link` text NOT NULL,
	`type` text NOT NULL,
	`author` text,
	`title` text,
	`view_count_text` text,
	`like_count_text` text,
	`download_url` text,
	`file_path` text,
	`comment_count_text` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `downloads_id_unique` ON `downloads` (`id`);--> statement-breakpoint
CREATE INDEX `downloads_id_idx` ON `downloads` (`id`);--> statement-breakpoint
CREATE TABLE `short_texts` (
	`id` text NOT NULL,
	`fps` integer DEFAULT 120 NOT NULL,
	`title` text NOT NULL,
	`title_zh` text NOT NULL,
	`short_text` text NOT NULL,
	`short_text_zh` text NOT NULL,
	`little_difficult_words` text DEFAULT '[]',
	`word_transcripts` text DEFAULT '[]',
	`sentence_transcripts` text DEFAULT '[]',
	`direction` integer DEFAULT 0 NOT NULL,
	`audio_file_path` text,
	`cover_file_path` text,
	`output_file_path` text,
	`job_id` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `short_texts_id_unique` ON `short_texts` (`id`);--> statement-breakpoint
CREATE INDEX `short_texts_id_idx` ON `short_texts` (`id`);--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` text NOT NULL,
	`type` text NOT NULL,
	`job_id` text NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`progress` integer DEFAULT 0 NOT NULL,
	`desc` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `tasks_id_unique` ON `tasks` (`id`);--> statement-breakpoint
CREATE INDEX `tasks_id_idx` ON `tasks` (`id`);--> statement-breakpoint
CREATE TABLE `translate_comments` (
	`id` text NOT NULL,
	`translated_title` text,
	`download_id` text NOT NULL,
	`comments` text DEFAULT '[]',
	`comment_pull_at` integer,
	`job_id` text,
	`mode` text NOT NULL,
	`cover_duration_in_seconds` integer DEFAULT 3 NOT NULL,
	`seconds_for_every_30_words` integer DEFAULT 3 NOT NULL,
	`fps` integer DEFAULT 30 NOT NULL,
	`output_file_path` text,
	`source_file_path` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `translate_comments_id_unique` ON `translate_comments` (`id`);--> statement-breakpoint
CREATE INDEX `translate_comments_id_idx` ON `translate_comments` (`id`);--> statement-breakpoint
CREATE TABLE `translate_videos` (
	`id` text NOT NULL,
	`source` text NOT NULL,
	`download_id` text,
	`upload_file_path` text,
	`audio_file_path` text,
	`asr_words` text DEFAULT '[]',
	`transcripts` text DEFAULT '[]',
	`output_file_path` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `translate_videos_id_unique` ON `translate_videos` (`id`);--> statement-breakpoint
CREATE INDEX `translate_videos_id_idx` ON `translate_videos` (`id`);