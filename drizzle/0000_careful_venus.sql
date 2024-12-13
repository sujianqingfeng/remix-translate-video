CREATE TABLE `downloads` (
	`id` text,
	`link` text NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `downloads_id_unique` ON `downloads` (`id`);--> statement-breakpoint
CREATE INDEX `id_idx` ON `downloads` (`id`);