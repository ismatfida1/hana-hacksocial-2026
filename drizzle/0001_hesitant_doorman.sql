CREATE TABLE `account_deletion_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `account_deletion_requests_id` PRIMARY KEY(`id`)
);
