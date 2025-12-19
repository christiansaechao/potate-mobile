CREATE TABLE IF NOT EXISTS  `settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`email` text,
	`focus_duration` integer DEFAULT 1500,
	`short_break_duration` integer DEFAULT 300,
	`long_break_duration` integer DEFAULT 900,
	`vibration` integer DEFAULT 0,
	`weekly_goal` integer DEFAULT 5
);
