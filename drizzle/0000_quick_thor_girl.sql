CREATE TABLE `downloads` (
	`id` text,
	`link` text NOT NULL,
	`type` text NOT NULL,
	`author` text,
	`title` text,
	`view_count_text` text,
	`like_count_text` text,
	`download_url` text,
	`comment_count_text` text,
	`translated_title` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `downloads_id_unique` ON `downloads` (`id`);--> statement-breakpoint
CREATE INDEX `downloads_id_idx` ON `downloads` (`id`);--> statement-breakpoint
CREATE TABLE `translate_comments` (
	`id` text,
	`content` text NOT NULL,
	`author` text NOT NULL,
	`likes` integer,
	`author_thumbnail` text,
	`published_time` text,
	`translated_content` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `translate_comments_id_unique` ON `translate_comments` (`id`);--> statement-breakpoint
CREATE INDEX `translate_comments_id_idx` ON `translate_comments` (`id`);