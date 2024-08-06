CREATE TABLE `thumb` (
	`id` integer PRIMARY KEY NOT NULL,
	`video_id` integer NOT NULL,
	`uri` text NOT NULL,
	`created_at` numeric NOT NULL,
	`update_at` numeric NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `thumb_id_unique` ON `thumb` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `thumb_video_id_unique` ON `thumb` (`video_id`);