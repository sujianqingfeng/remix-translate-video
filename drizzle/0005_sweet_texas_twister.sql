CREATE TABLE `general_comments` (
	`id` text NOT NULL,
	`type` text NOT NULL,
	`author` text NOT NULL,
	`type_info` text NOT NULL,
	`source` text NOT NULL,
	`comments` text DEFAULT '[]',
	`comment_pull_at` integer,
	`job_id` text,
	`cover_duration_in_seconds` integer DEFAULT 3 NOT NULL,
	`seconds_for_every_30_words` integer DEFAULT 3 NOT NULL,
	`fps` integer DEFAULT 30 NOT NULL,
	`output_file_path` text,
	`source_file_path` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `general_comments_id_unique` ON `general_comments` (`id`);--> statement-breakpoint
CREATE INDEX `general_comments_id_idx` ON `general_comments` (`id`);--> statement-breakpoint
PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_dialogues` (
	`id` text NOT NULL,
	`dialogues` text DEFAULT '[]' NOT NULL,
	`fps` integer DEFAULT 40 NOT NULL,
	`output_file_path` text,
	`job_id` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_dialogues`("id", "dialogues", "fps", "output_file_path", "job_id", "created_at") SELECT "id", "dialogues", "fps", "output_file_path", "job_id", "created_at" FROM `dialogues`;--> statement-breakpoint
DROP TABLE `dialogues`;--> statement-breakpoint
ALTER TABLE `__new_dialogues` RENAME TO `dialogues`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `dialogues_id_unique` ON `dialogues` (`id`);--> statement-breakpoint
CREATE INDEX `dialogues_id_idx` ON `dialogues` (`id`);