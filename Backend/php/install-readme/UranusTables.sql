-- phpMyAdmin SQL Dump

-- NOTE: Use this dump to create a new demo database for mynotebook uranus_notes`
-- For MyNotebook-Uranus new install scripts need to be made.
-- Issues with current scripts: 
--      install.php is missing notes.misc.php
--      stylesheet seems to be missing, style is messed up
--      upgrade.php might be working but it's not updating the config.php to the new format

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

CREATE TABLE IF NOT EXISTS `MyNotebook-uranus_notes` (
  `id` int(4) NOT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `datetime` int(16) NOT NULL,
  `visibility` binary(1) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2062 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

INSERT INTO `MyNotebook-uranus_notes` (`id`, `content`, `datetime`, `visibility`) VALUES
(2056, '<p>sezidghjkdghjk</p>', 1358522756, 0x30),
(2057, '<p>test</p>', 1369299207, 0x30),
(2060, '<p>vsdfbvdfsvdfsvsdfv</p>', 1369299248, 0x30),
(2061, '<p>dfg df gdfg df dfg df g</p>', 1369310516, 0x30);

CREATE TABLE IF NOT EXISTS `MyNotebook-uranus_notetags` (
  `noteid` int(8) NOT NULL,
  `tagid` int(11) NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=2062 DEFAULT CHARSET=utf8;

INSERT INTO `MyNotebook-uranus_notetags` (`noteid`, `tagid`) VALUES
(1796, 2),
(1797, 2),
(1803, 2),
(2052, 5),
(2057, 1),
(2058, 2),
(2059, 3),
(2060, 4),
(2061, 2);


CREATE TABLE IF NOT EXISTS `MyNotebook-uranus_settings` (
  `id` int(2) NOT NULL,
  `name` varchar(25) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `value` varchar(64) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(160) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;

INSERT INTO `MyNotebook-uranus_settings` (`id`, `name`, `value`, `description`) VALUES
(1, 'loginPassword', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'Login password'),
(2, 'encryptionPassword', '', 'Password for note encryption'),
(3, 'allNotesTagName', 'allnotes', 'Name of the tag to display all notes'),
(4, 'newNoteTagName', 'new', 'Default tag when none is specified'),
(5, 'defaultTags', 'new test', 'Tags already selected after login'),
(6, 'editNoteOnDoubleClick', '1', 'Edit a note by double clicking it');


CREATE TABLE IF NOT EXISTS `MyNotebook-uranus_tags` (
  `id` int(8) NOT NULL,
  `tagname` varchar(40) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

INSERT INTO `MyNotebook-uranus_tags` (`id`, `tagname`) VALUES
(1, 'allnotes'),
(2, 'new'),
(3, 'sfhsdfh'),
(4, 'zukzujtzj'),
(5, 'test');

ALTER TABLE `MyNotebook-uranus_notes`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `MyNotebook-uranus_notetags`
  ADD PRIMARY KEY (`noteid`,`tagid`);

ALTER TABLE `MyNotebook-uranus_settings`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `MyNotebook-uranus_tags`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `MyNotebook-uranus_notes`
  MODIFY `id` int(4) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2062;
ALTER TABLE `MyNotebook-uranus_notetags`
  MODIFY `noteid` int(8) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=2062;
ALTER TABLE `MyNotebook-uranus_settings`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=7;
ALTER TABLE `MyNotebook-uranus_tags`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=6;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
