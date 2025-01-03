CREATE TABLE `dialogues` (
	`id` text NOT NULL,
	`dialogues` text DEFAULT '[]' NOT NULL,
	`fps` integer DEFAULT 60 NOT NULL,
	`output_file_path` text,
	`job_id` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dialogues_id_unique` ON `dialogues` (`id`);--> statement-breakpoint
CREATE INDEX `dialogues_id_idx` ON `dialogues` (`id`);