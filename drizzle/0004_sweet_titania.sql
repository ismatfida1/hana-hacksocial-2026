CREATE TABLE `hana_uploads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`fileName` varchar(255) NOT NULL,
	`mimeType` varchar(120) NOT NULL,
	`sizeBytes` int NOT NULL,
	`storageKey` varchar(500) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `hana_uploads_id` PRIMARY KEY(`id`),
	CONSTRAINT `hana_uploads_storageKey_unique` UNIQUE(`storageKey`)
);
