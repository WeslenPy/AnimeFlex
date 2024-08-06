ALTER TABLE `anime` ADD `created_at` numeric NOT NULL;--> statement-breakpoint
ALTER TABLE `anime` ADD `update_at` numeric NOT NULL;--> statement-breakpoint
ALTER TABLE `favorites` ADD `created_at` numeric NOT NULL;--> statement-breakpoint
ALTER TABLE `favorites` ADD `update_at` numeric NOT NULL;--> statement-breakpoint
ALTER TABLE `history` ADD `created_at` numeric NOT NULL;--> statement-breakpoint
ALTER TABLE `history` ADD `update_at` numeric NOT NULL;--> statement-breakpoint
ALTER TABLE `offline` ADD `created_at` numeric NOT NULL;--> statement-breakpoint
ALTER TABLE `offline` ADD `update_at` numeric NOT NULL;--> statement-breakpoint
ALTER TABLE `search` ADD `created_at` numeric NOT NULL;--> statement-breakpoint
ALTER TABLE `search` ADD `update_at` numeric NOT NULL;