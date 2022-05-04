-- phpMyAdmin SQL Dump

-- Use this file to create a new database for MyNotebook Uranus. All install scripts do not work

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;



CREATE TABLE IF NOT EXISTS `MyNotebook-uranus_notes` (
  `id` int(6) NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `datetime` int(16) NOT NULL,
  `visibility` binary(1) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `MyNotebook-uranus_notetags` (
  `noteid` int(8) NOT NULL,
  `tagid` int(11) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `MyNotebook-uranus_settings` (
  `id` int(2) NOT NULL,
  `name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `value` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(160) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


CREATE TABLE IF NOT EXISTS `MyNotebook-uranus_tags` (
  `id` int(8) NOT NULL,
  `tagname` varchar(40) CHARACTER SET utf8 NOT NULL,
  `rating` int(4) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


ALTER TABLE `MyNotebook-uranus_notes`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `MyNotebook-uranus_notetags`
  ADD PRIMARY KEY (`noteid`,`tagid`);

ALTER TABLE `MyNotebook-uranus_settings`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `MyNotebook-uranus_tags`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `MyNotebook-uranus_notes`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT;
ALTER TABLE `MyNotebook-uranus_settings`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT;
ALTER TABLE `MyNotebook-uranus_tags`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
