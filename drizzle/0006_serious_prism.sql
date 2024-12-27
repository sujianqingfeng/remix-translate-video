ALTER TABLE `short_texts` ADD `word_transcripts` text DEFAULT '[]';--> statement-breakpoint
ALTER TABLE `short_texts` ADD `sentence_transcripts` text DEFAULT '[]';--> statement-breakpoint
ALTER TABLE `short_texts` ADD `direction` integer DEFAULT 0 NOT NULL;