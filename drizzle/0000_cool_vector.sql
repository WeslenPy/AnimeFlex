CREATE TABLE `anime` (
	`id` integer PRIMARY KEY NOT NULL,
	`anime_id` integer NOT NULL,
	`video_id` integer,
	`name` text NOT NULL,
	`image` text NOT NULL,
	`title` text
);
--> statement-breakpoint
CREATE TABLE `favorites` (
	`id` integer PRIMARY KEY NOT NULL,
	`anime_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `history` (
	`id` integer PRIMARY KEY NOT NULL,
	`anime_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `offline` (
	`id` integer PRIMARY KEY NOT NULL,
	`anime_id` integer NOT NULL,
	`path` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `search` (
	`id` integer PRIMARY KEY NOT NULL,
	`searchable` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `anime_id_unique` ON `anime` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `anime_anime_id_unique` ON `anime` (`anime_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `favorites_id_unique` ON `favorites` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `favorites_anime_id_unique` ON `favorites` (`anime_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `history_id_unique` ON `history` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `history_anime_id_unique` ON `history` (`anime_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `offline_id_unique` ON `offline` (`id`);--> statement-breakpoint
CREATE UNIQUE INDEX `offline_anime_id_unique` ON `offline` (`anime_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `search_id_unique` ON `search` (`id`);