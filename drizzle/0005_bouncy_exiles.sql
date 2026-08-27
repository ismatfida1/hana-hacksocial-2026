CREATE TABLE `hana_learner_profiles` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`profile` json NOT NULL,
	`version` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hana_learner_profiles_id` PRIMARY KEY(`id`),
	CONSTRAINT `hana_learner_profiles_userId_unique` UNIQUE(`userId`)
);
--> statement-breakpoint
CREATE TABLE `hana_progress_events` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`roadmapId` int NOT NULL,
	`eventType` varchar(80) NOT NULL,
	`payload` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `hana_progress_events_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `hana_roadmaps` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`profileVersion` int NOT NULL,
	`version` int NOT NULL,
	`status` enum('active','archived') NOT NULL DEFAULT 'active',
	`roadmap` json NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `hana_roadmaps_id` PRIMARY KEY(`id`),
	CONSTRAINT `hana_roadmaps_user_version_uq` UNIQUE(`userId`,`version`)
);
--> statement-breakpoint
CREATE INDEX `hana_learner_profiles_user_id_idx` ON `hana_learner_profiles` (`userId`);--> statement-breakpoint
CREATE INDEX `hana_progress_events_user_roadmap_idx` ON `hana_progress_events` (`userId`,`roadmapId`);--> statement-breakpoint
CREATE INDEX `hana_progress_events_user_created_idx` ON `hana_progress_events` (`userId`,`createdAt`);--> statement-breakpoint
CREATE INDEX `hana_roadmaps_user_status_idx` ON `hana_roadmaps` (`userId`,`status`);