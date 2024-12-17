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
	`comment_count_text` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `downloads_id_unique` ON `downloads` (`id`);--> statement-breakpoint
CREATE INDEX `downloads_id_idx` ON `downloads` (`id`);--> statement-breakpoint
CREATE TABLE `translate_comments` (
	`id` text NOT NULL,
	`translated_title` text,
	`download_id` text NOT NULL,
	`comments` text DEFAULT '[]',
	`comment_pull_at` integer,
	`job_id` text,
	`mode` text NOT NULL,
	`cover_duration_in_seconds` integer DEFAULT 3 NOT NULL,
	`seconds_for_every_30_words` integer DEFAULT 5 NOT NULL,
	`fps` integer DEFAULT 30 NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `translate_comments_id_unique` ON `translate_comments` (`id`);--> statement-breakpoint
CREATE INDEX `translate_comments_id_idx` ON `translate_comments` (`id`);