CREATE TABLE `citizens` (
  `id` int PRIMARY KEY NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255),
  `birthday` timestamp
);

CREATE TABLE `worker` (
  `id` int PRIMARY KEY NOT NULL,
  `sign` varchar(255) NOT NULL,
  `admin` boolean NOT NULL
);

CREATE TABLE `appointments` (
  `customer` int,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `official` int NOT NULL,
  `note` varchar(255),
  PRIMARY KEY (`date`, `official`)
);

CREATE TABLE `couples` (
  `partner1` int NOT NULL,
  `partner2` int,
  `child_amount` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`partner1`, `partner2`, `date`)
);

CREATE TABLE `donation` (
  `amount` int NOT NULL,
  `recipiant` int NOT NULL,
  `donator` int,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reason` varchar(255),
  `purpose` varchar(255),
  PRIMARY KEY (`amount`, `recipiant`, `donator`, `date`)
);

CREATE TABLE `process` (
  `id` int PRIMARY KEY NOT NULL,
  `type` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `customer` int,
  `official` int
);

CREATE TABLE `note` (
  `process` int NOT NULL,
  `text` text NOT NULL,
  `fromUser` boolean NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`process`, `fromUser`, `date`)
);

CREATE TABLE `statusUpdates` (
  `process` int NOT NULL,
  `status` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`process`, `status`)
);

CREATE TABLE `file` (
  `path` varchar(255) PRIMARY KEY NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `process` int
);

CREATE TABLE `contactrequest` (
  `id` int PRIMARY KEY  NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255),
  `message` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `processTypes` (
  `id` int PRIMARY KEY NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL
);

CREATE TABLE `forms` (
  `id` int PRIMARY KEY NOT NULL,
  `path` varchar(255),
  `adddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` int,
  `target` varchar(255),
  `descr` varchar(255) NOT NULL
);

CREATE TABLE `blogEntry` (
  `id` int PRIMARY KEY NOT NULL,
  `adddate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `type` int,
  `target` varchar(255),
  `descr` text NOT NULL,
  `imagePath` varchar(255)
);

CREATE TABLE `income` (
  `recipiant` int NOT NULL,
  `amount` int NOT NULL,
  `descr` varchar(255),
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`recipiant`, `amount`, `date`)
);

CREATE TABLE `companies` (
  `id` int PRIMARY KEY NOT NULL,
  `name` varchar(255) NOT NULL,
  `rep` int NOT NULL
);

CREATE TABLE `faultyEvents` (
  `id` int(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `content` text NOT NULL,
  `failTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `eventId` int(11) NOT NULL
);

ALTER TABLE `appointments` ADD FOREIGN KEY (`customer`) REFERENCES `citizens` (`id`);

ALTER TABLE `appointments` ADD FOREIGN KEY (`official`) REFERENCES `worker` (`id`);

ALTER TABLE `worker` ADD FOREIGN KEY (`id`) REFERENCES `citizens` (`id`);

ALTER TABLE `couples` ADD FOREIGN KEY (`partner1`) REFERENCES `citizens` (`id`);

ALTER TABLE `couples` ADD FOREIGN KEY (`partner2`) REFERENCES `citizens` (`id`);

ALTER TABLE `donation` ADD FOREIGN KEY (`recipiant`) REFERENCES `companies` (`id`);

ALTER TABLE `donation` ADD FOREIGN KEY (`donator`) REFERENCES `citizens` (`id`);

ALTER TABLE `note` ADD FOREIGN KEY (`process`) REFERENCES `process` (`id`);

ALTER TABLE `process` ADD FOREIGN KEY (`customer`) REFERENCES `citizens` (`id`);

ALTER TABLE `process` ADD FOREIGN KEY (`official`) REFERENCES `worker` (`id`);

ALTER TABLE `statusUpdates` ADD FOREIGN KEY (`process`) REFERENCES `process` (`id`);

ALTER TABLE `process` ADD FOREIGN KEY (`type`) REFERENCES `processTypes` (`id`);

ALTER TABLE `file` ADD FOREIGN KEY (`process`) REFERENCES `process` (`id`);

ALTER TABLE `income` ADD FOREIGN KEY (`recipiant`) REFERENCES `citizens` (`id`);

ALTER TABLE `companies` ADD FOREIGN KEY (`rep`) REFERENCES `citizens` (`id`);

