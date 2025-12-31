CREATE TABLE `intervals` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`session_id` integer NOT NULL,
	`start_time` integer NOT NULL,
	`end_time` integer,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`mode` text NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	`ended_at` integer,
	`potato_health` integer DEFAULT 100,
	`completed` integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`email` text,
	`focus_duration` integer DEFAULT 1500 NOT NULL,
	`short_break_duration` integer DEFAULT 300 NOT NULL,
	`long_break_duration` integer DEFAULT 900 NOT NULL,
	`vibration` integer DEFAULT 0 NOT NULL,
	`weekly_goal` integer DEFAULT 5 NOT NULL
);
