CREATE DATABASE taskify;
USE taskify;
CREATE TABLE todos (
  id varchar(255),
  `subject` varchar(1000),
  `author` varchar(255),
  `created` datetime,
  `lastModified` datetime,
  `state` BIT,
  `description` text
);