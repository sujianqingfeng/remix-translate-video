PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_fill_in_blanks` (
	`id` text NOT NULL,
	`fps` integer DEFAULT 60 NOT NULL,
	`sentences` text DEFAULT '[]' NOT NULL,
	`output_file_path` text,
	`job_id` text,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_fill_in_blanks`("id", "fps", "sentences", "output_file_path", "job_id", "created_at") SELECT "id", "fps", "sentences", "output_file_path", "job_id", "created_at" FROM `fill_in_blanks`;--> statement-breakpoint
DROP TABLE `fill_in_blanks`;--> statement-breakpoint
ALTER TABLE `__new_fill_in_blanks` RENAME TO `fill_in_blanks`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `fill_in_blanks_id_unique` ON `fill_in_blanks` (`id`);--> statement-breakpoint
CREATE INDEX `fill_in_blank_id_idx` ON `fill_in_blanks` (`id`);