CREATE TABLE `opportunities` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(200) NOT NULL,
	`type` varchar(80) NOT NULL,
	`detail` text NOT NULL,
	`officialUrl` varchar(500) NOT NULL,
	`deadlineAt` timestamp,
	`eligibility` text NOT NULL,
	`prizeDetails` text,
	`verificationStatus` enum('unverified','verified','unreachable') NOT NULL DEFAULT 'unverified',
	`verifiedAt` timestamp,
	`active` int NOT NULL DEFAULT 1,
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `opportunities_id` PRIMARY KEY(`id`)
);
