CREATE TABLE `short_texts` (
	`id` text NOT NULL,
	`fps` integer DEFAULT 120 NOT NULL,
	`title` text NOT NULL,
	`title_zh` text NOT NULL,
	`short_text` text NOT NULL,
	`short_text_zh` text NOT NULL,
	`little_difficult_words` text DEFAULT '[]',
	`audio_file_path` text,
	`cover_file_path` text,
	`output_file_path` text,
	`job_id` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `short_texts_id_unique` ON `short_texts` (`id`);--> statement-breakpoint
CREATE INDEX `short_texts_id_idx` ON `short_texts` (`id`);