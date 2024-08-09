CREATE TABLE `download` (
	`id` integer PRIMARY KEY NOT NULL,
	`video_id` integer NOT NULL,
	`anime_id` integer NOT NULL,
	`title` text NOT NULL,
	`url` text NOT NULL,
	`uri` text DEFAULT '',
	`data` text,
	`progress` numeric DEFAULT '0' NOT NULL,
	`pause` integer DEFAULT false NOT NULL,
	`complete` integer DEFAULT false NOT NULL,
	`created_at` numeric NOT NULL,
	`update_at` numeric NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `download_id_unique` ON `download` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `download_video_id_unique` ON `download` (`video_id`);