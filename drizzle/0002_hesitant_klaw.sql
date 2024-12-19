CREATE TABLE `translate_videos` (
	`id` text NOT NULL,
	`source` text NOT NULL,
	`download_id` text,
	`upload_file_path` text,
	`asr_words` text DEFAULT '[]',
	`transcripts` text DEFAULT '[]'
);
--> statement-breakpoint
CREATE UNIQUE INDEX `translate_videos_id_unique` ON `translate_videos` (`id`);--> statement-breakpoint
CREATE INDEX `translate_videos_id_idx` ON `translate_videos` (`id`);