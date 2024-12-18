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
CREATE INDEX `tasks_id_idx` ON `tasks` (`id`);