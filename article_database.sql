-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Jan 03, 2018 at 01:36 PM
-- Server version: 5.7.20-0ubuntu0.16.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `article_database`
--

-- --------------------------------------------------------

--
-- Table structure for table `article_info_table`
--

CREATE TABLE `article_info_table` (
  `article_info_id` int(11) NOT NULL,
  `article_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `article_update_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `article_info_table`
--

INSERT INTO `article_info_table` (`article_info_id`, `article_id`, `user_id`, `article_update_date`) VALUES
(2, 26, 8, '2017-12-28 02:02:22'),
(3, 27, 8, '2018-01-03 17:51:55'),
(8, 33, 8, '2018-01-03 17:52:13'),
(13, 42, 12, '2017-12-29 15:18:35'),
(15, 44, 12, '2017-12-29 15:18:44'),
(17, 46, 12, '2017-12-29 15:18:59'),
(18, 50, 8, '2018-01-03 19:30:07');

-- --------------------------------------------------------

--
-- Table structure for table `article_status_table`
--

CREATE TABLE `article_status_table` (
  `article_status_id` int(11) NOT NULL,
  `article_status` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `article_status_table`
--

INSERT INTO `article_status_table` (`article_status_id`, `article_status`) VALUES
(1, 'active'),
(2, 'deactive');

-- --------------------------------------------------------

--
-- Table structure for table `article_table`
--

CREATE TABLE `article_table` (
  `article_id` int(11) NOT NULL,
  `url` varchar(255) CHARACTER SET latin1 NOT NULL,
  `article` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `article_title` varchar(255) CHARACTER SET latin1 NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `pin` varchar(255) CHARACTER SET latin1 NOT NULL,
  `article_status_id` int(11) NOT NULL DEFAULT '1',
  `creation_time_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;

--
-- Dumping data for table `article_table`
--

INSERT INTO `article_table` (`article_id`, `url`, `article`, `article_title`, `user_type_id`, `pin`, `article_status_id`, `creation_time_date`) VALUES
(1, '3zSUZ', 'kakan ghosh', 'test', 3, '54545', 1, '2017-12-24 20:34:33'),
(2, 'x47iG', 'asdasdasdasdasd', 'test', 3, '', 1, '2017-12-24 23:30:46'),
(3, 'nzoFz', 'hi this is new  article', 'test', 3, 'asdasd', 1, '2017-12-24 23:42:31'),
(4, 'nnBL9', 'sasd', 'test', 3, '', 2, '2017-12-25 17:11:27'),
(5, 'C1Ddg', 'Hello,\nHi all happy crismas 2017', 'test', 3, 'asdasd', 1, '2017-12-26 02:29:08'),
(18, 'QBxoF', 'hello', 'test', 3, 'world', 1, '2017-12-26 12:08:40'),
(19, '1pobu', 'hi how r u?\nyaa i am  fine \nhow r you?', 'test', 3, 'kakan', 1, '2017-12-26 12:09:09'),
(20, '07jgO', '', 'test', 3, '', 1, '2017-12-26 17:19:33'),
(21, 'T986A', 'hi this is me', 'test', 3, '', 1, '2017-12-27 14:08:58'),
(23, '9bwwH', 'a\n', 'test', 3, '', 1, '2017-12-27 22:12:32'),
(24, 'M2fLa', 'b', 'test', 3, '', 1, '2017-12-27 22:13:45'),
(26, 'dEMRe', 'this is for testing', 'test', 2, '123123', 1, '2017-12-28 02:02:22'),
(27, '3uqH4', 'hello world', 'test', 2, '', 1, '2017-12-28 02:19:31'),
(31, '0Yovx', 'this is  a text', 'test', 3, 'password', 1, '2017-12-28 13:15:26'),
(33, 'ck9UJ', 'Previous article has been deleted accedently.', 'test', 2, '', 2, '2017-12-29 14:28:33'),
(34, 'xHzR0', 'asd', 'test', 3, '', 1, '2017-12-29 15:12:50'),
(35, 'VAfzi', 'asdasd', 'test', 3, '', 1, '2017-12-29 15:12:53'),
(36, 'SEhNK', 'asdasd', 'test', 3, '', 1, '2017-12-29 15:12:54'),
(37, 'EHCbl', 'asdasdasd', 'test', 3, '', 1, '2017-12-29 15:12:55'),
(42, 'uDBw5', 'jkasd', 'test', 2, '', 1, '2017-12-29 15:18:35'),
(44, 'W22Hv', 'zxczxczxc', 'test', 2, '', 1, '2017-12-29 15:18:44'),
(46, 'tP2e0', 'dfgdgdfg', 'test', 2, '', 1, '2017-12-29 15:18:59'),
(48, '4ecRy', ' কাঁকন', 'test', 3, '', 1, '2018-01-03 19:08:20'),
(49, 'hJ2Kx', 'aasdasdasdasdasdasd', 'test', 3, '', 1, '2018-01-03 19:15:53'),
(50, 'PpGxg', ' ওকে  বাগ  সল্ভ , চিয়ার্স ', 'test', 2, 'hello', 1, '2018-01-03 19:29:28');

-- --------------------------------------------------------

--
-- Table structure for table `old_password_table`
--

CREATE TABLE `old_password_table` (
  `old_password_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `old_password` varchar(255) NOT NULL,
  `last_change` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `old_password_table`
--

INSERT INTO `old_password_table` (`old_password_id`, `user_id`, `old_password`, `last_change`) VALUES
(1, 8, 'asdasd', '2017-12-27 16:44:48'),
(4, 12, 'asdasd', '2017-12-29 15:18:23'),
(5, 13, 'asdasd', '2018-01-03 18:29:56');

-- --------------------------------------------------------

--
-- Table structure for table `user_table`
--

CREATE TABLE `user_table` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type_id` int(11) NOT NULL,
  `creation_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_table`
--

INSERT INTO `user_table` (`user_id`, `user_name`, `name`, `email`, `password`, `user_type_id`, `creation_date`) VALUES
(8, 'kakan10', 'Ghosh, Kakan', 'kakanghosh69@gmail.com', 'asdasd', 2, '2017-12-27 16:44:48'),
(10, 'admin', 'Admin Panel', 'admin@test.com', 'asdasd', 1, '2017-12-21 00:00:00'),
(12, 'urmejaman', 'Urmee Jaman', 'urmejaman@yahoo.com', 'asdasd', 2, '2017-12-29 15:18:23'),
(13, 'agomon', 'Agomon Ghosh', 'agomon@gmail.com', 'asdasd', 2, '2018-01-03 18:29:56');

-- --------------------------------------------------------

--
-- Table structure for table `user_type_table`
--

CREATE TABLE `user_type_table` (
  `user_type_id` int(11) NOT NULL,
  `user_type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_type_table`
--

INSERT INTO `user_type_table` (`user_type_id`, `user_type`) VALUES
(1, 'admin'),
(3, 'anonymous'),
(2, 'registered');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `article_info_table`
--
ALTER TABLE `article_info_table`
  ADD PRIMARY KEY (`article_info_id`),
  ADD KEY `article_id` (`article_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `article_status_table`
--
ALTER TABLE `article_status_table`
  ADD PRIMARY KEY (`article_status_id`);

--
-- Indexes for table `article_table`
--
ALTER TABLE `article_table`
  ADD PRIMARY KEY (`article_id`),
  ADD UNIQUE KEY `url` (`url`),
  ADD KEY `member_type_id` (`user_type_id`),
  ADD KEY `article_status_id` (`article_status_id`);

--
-- Indexes for table `old_password_table`
--
ALTER TABLE `old_password_table`
  ADD PRIMARY KEY (`old_password_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_table`
--
ALTER TABLE `user_table`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_name` (`user_name`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `user_type_id` (`user_type_id`);

--
-- Indexes for table `user_type_table`
--
ALTER TABLE `user_type_table`
  ADD PRIMARY KEY (`user_type_id`),
  ADD UNIQUE KEY `user_type` (`user_type`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `article_info_table`
--
ALTER TABLE `article_info_table`
  MODIFY `article_info_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- AUTO_INCREMENT for table `article_status_table`
--
ALTER TABLE `article_status_table`
  MODIFY `article_status_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `article_table`
--
ALTER TABLE `article_table`
  MODIFY `article_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `old_password_table`
--
ALTER TABLE `old_password_table`
  MODIFY `old_password_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `user_table`
--
ALTER TABLE `user_table`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
--
-- AUTO_INCREMENT for table `user_type_table`
--
ALTER TABLE `user_type_table`
  MODIFY `user_type_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `article_info_table`
--
ALTER TABLE `article_info_table`
  ADD CONSTRAINT `fk_articleinfo_article` FOREIGN KEY (`article_id`) REFERENCES `article_table` (`article_id`),
  ADD CONSTRAINT `fk_articleinfo_user` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`);

--
-- Constraints for table `article_table`
--
ALTER TABLE `article_table`
  ADD CONSTRAINT `fk_article_usertype` FOREIGN KEY (`user_type_id`) REFERENCES `user_type_table` (`user_type_id`);

--
-- Constraints for table `old_password_table`
--
ALTER TABLE `old_password_table`
  ADD CONSTRAINT `fk_oldpassword_user` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`user_id`);

--
-- Constraints for table `user_table`
--
ALTER TABLE `user_table`
  ADD CONSTRAINT `fk_user_usertype` FOREIGN KEY (`user_type_id`) REFERENCES `user_type_table` (`user_type_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
