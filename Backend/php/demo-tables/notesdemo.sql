
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


-- --------------------------------------------------------

--
-- Table structure for table `MyNotebook_notes`
--

DROP TABLE IF EXISTS `MyNotebook_notes`;
CREATE TABLE `MyNotebook_notes` (
  `id` int(6) NOT NULL,
  `content` text COLLATE utf8_unicode_ci NOT NULL,
  `datetime` int(16) NOT NULL,
  `visibility` binary(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `MyNotebook_notes`
--

INSERT INTO `MyNotebook_notes` (`id`, `content`, `datetime`, `visibility`) VALUES
(1, '<p>Welcome to MyNotebook</p>', 1177104551, 0x30),
(2, '<p>This is an example of a note with \"new\" tag</p>', 1177104604, 0x30),
(3, '<p>I am a note with read Tag</p>', 1177104647, 0x30),
(4, '<p>Read and new</p>', 1177104689, 0x30),
(5, '<p>Yeah, well, do whatever you like the database is reset every hour :P</p>', 1652103734, 0x30),
(6, '<p>Just remember, if you changed it, nobody can access this demo anymore. And people will be sad. Do you really want to make people sad?</p>', 1652104196, 0x30),
(7, '<p>Seriously, changing it causes bad karma .... very, very bad karma</p>', 1652104206, 0x30),
(8, '<p>Did I already mention that the password shouldn\'t be changed? :)</p>\n<p>&nbsp;</p>', 1652104233, 0x30),
(9, '<h1>Welcome to MyNotebook</h1>\n<p>Feel free to play around.</p>\n<h2>What you can do</h2>\n<h3>Create/Edit notes</h3>\n<p>Just click on <em>Create Note </em>or double-click a note to edit it. You can enter any tag you like, if it doesn\'t exist it will be created.</p>\n<h3>Edit/delete tags</h3>\n<p>You can click the small array next to a tag on the right side to delete or rename it</p>\n<h3>Change settings</h3>\n<p>There are a couple of settings, like the tags which are selected by  default, or the name of the tag which shows all notes. Feel free to play  around with that.</p>\n<p>I know it\'s kinda funny to change the password so nobody can access  this demo anymore. But I guess only children do something like that :)</p>\n<p>&nbsp;</p>', 1652104238, 0x30),
(10, '<p>I\'m an old note which was read a long time ago. Well ... actually, I was just created ... anyway, I\'ve got the read tag</p>', 1652104540, 0x30),
(11, '<div class=\"smart-info\">\n<h1 class=\"smart-info-wrap\"><a href=\"https://www.food.com/recipe/ice-cubes-420398\">Ice Cubes</a></h1>\n<p>&nbsp;</p>\n<p>Mix 2 cups of water with 2 tablespoons of water. Add more water to taste. \"I wish there was a Crock-Pot version of this recipe. I work long hours and I just don\'t have the time to invest in this kind of hands-on cooking.\"<br /><br />-hollyluya</p>\n</div>\n<p>&nbsp;</p>', 1652104646, 0x30),
(12, '<h1><a title=\"Kitty Litter Cake\" href=\"https://www.food.com/recipe/lindas-kitty-litter-cake-260567\">Kitty Litter Cake</a></h1>\n<p><br />This may be the only way to prevent your guests from depleting your chocolate supply. \"This is a hit! Once people get over their initial reaction\"<br /><br />-AndreaVT96</p>', 1652104750, 0x30);

-- --------------------------------------------------------

--
-- Table structure for table `MyNotebook_notetags`
--

DROP TABLE IF EXISTS `MyNotebook_notetags`;
CREATE TABLE `MyNotebook_notetags` (
  `noteid` int(8) NOT NULL,
  `tagid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `MyNotebook_notetags`
--

INSERT INTO `MyNotebook_notetags` (`noteid`, `tagid`) VALUES
(1, 1),
(2, 3),
(3, 4),
(4, 3),
(4, 4),
(5, 3),
(5, 5),
(6, 5),
(7, 3),
(7, 5),
(8, 5),
(9, 5),
(10, 4),
(11, 6),
(12, 6);

-- --------------------------------------------------------

--
-- Table structure for table `MyNotebook_settings`
--

DROP TABLE IF EXISTS `MyNotebook_settings`;
CREATE TABLE `MyNotebook_settings` (
  `id` int(2) NOT NULL,
  `name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `value` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(160) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `MyNotebook_settings`
--

INSERT INTO `MyNotebook_settings` (`id`, `name`, `value`, `description`) VALUES
(1, 'loginPassword', '2a97516c354b68848cdbd8f54a226a0a55b21ed138e207ad6c5cbb9c00aa5aea', 'Login password'),
(2, 'encryptionPassword', '', 'Password for note encryption'),
(3, 'allNotesTagName', 'allnotes', 'Name of the tag to display all notes'),
(4, 'newNoteTagName', 'new', 'Default tag when none is specified'),
(5, 'defaultTags', 'new important', 'Tags already selected after login'),
(6, 'editNoteOnDoubleClick', '1', 'Allow editing note by double clicking it');

-- --------------------------------------------------------

--
-- Table structure for table `MyNotebook_tags`
--

DROP TABLE IF EXISTS `MyNotebook_tags`;
CREATE TABLE `MyNotebook_tags` (
  `id` int(8) NOT NULL,
  `tagname` varchar(40) CHARACTER SET utf8 NOT NULL,
  `rating` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `MyNotebook_tags`
--

INSERT INTO `MyNotebook_tags` (`id`, `tagname`, `rating`) VALUES
(1, 'info', 0),
(2, 'allnotes', 0),
(3, 'new', 0),
(4, 'read', 0),
(5, 'important', 0),
(6, 'recipes', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `MyNotebook_notes`
--
ALTER TABLE `MyNotebook_notes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MyNotebook_notetags`
--
ALTER TABLE `MyNotebook_notetags`
  ADD PRIMARY KEY (`noteid`,`tagid`);

--
-- Indexes for table `MyNotebook_settings`
--
ALTER TABLE `MyNotebook_settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `MyNotebook_tags`
--
ALTER TABLE `MyNotebook_tags`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `MyNotebook_notes`
--
ALTER TABLE `MyNotebook_notes`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `MyNotebook_settings`
--
ALTER TABLE `MyNotebook_settings`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `MyNotebook_tags`
--
ALTER TABLE `MyNotebook_tags`
  MODIFY `id` int(8) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
