-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 28, 2024 at 06:03 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nest_t24db_dev`
--

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `roleName` varchar(255) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `roleName`, `active`) VALUES
(1, 'Artist', 1),
(2, 'Junior artist', 0),
(3, 'Director', 0),
(4, 'Producer/ Production company', 0),
(5, 'Manager', 0),
(6, 'Assistant director', 0),
(7, 'Camera man', 0),
(8, 'Assistant cameraman', 0),
(9, 'Choreographer', 0),
(10, 'Assistant Choreographer', 0),
(11, 'Dancer', 0),
(12, 'Art director', 0),
(13, 'Art assistant', 0),
(14, 'Set assistant', 0),
(15, 'Set Boy', 0),
(16, 'Dubbing artist', 0),
(17, 'Singer', 0),
(18, 'Music director', 0),
(19, 'Makeup artiste', 0),
(20, 'Makeup assistant', 0),
(21, 'Editor', 0),
(22, 'Dates Manager', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile` varchar(255) NOT NULL DEFAULT '000-000-0000',
  `socialName` varchar(255) NOT NULL,
  `socialPicture` varchar(255) DEFAULT NULL,
  `isSocialUser` tinyint(4) NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `loginSource` varchar(255) NOT NULL,
  `token` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `mobile`, `socialName`, `socialPicture`, `isSocialUser`, `status`, `createdAt`, `updatedAt`, `loginSource`, `token`) VALUES
(1, 'sitaram', 'kudireddy', 'sitaramkdks@gmail.com', 'VC4az', '', 'sitaram kudireddy', 'https://lh3.googleusercontent.com/a/ACg8ocIbfEzSKQa5ETtjzhPhGMPYbPxQ74fCWw9I2nFM2dhRUadb7dQ=s96-c', 1, 'active', '2024-10-21 22:35:02', '2024-10-21 22:35:02', 'GMAIL', 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImM4OGQ4MDlmNGRiOTQzZGY1M2RhN2FjY2ZkNDc3NjRkMDViYTM5MWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5MDU4NDAzMDYyOTYtZWZiMnRkbGNoaXAyam1jZHE0czJqdjEzMjN0a2gyYWsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI5MDU4NDAzMDYyOTYtZWZiMnRkbGNoaXAyam1jZHE0czJqdjEzMjN0a2gyYWsuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc1NjkyOTA1NTA2MDY2ODI4MzkiLCJlbWFpbCI6InNpdGFyYW1rZGtzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJhdF9oYXNoIjoiaXgzUU91S0pIYmpBVHd0ekkyOUp0ZyIsIm5hbWUiOiJzaXRhcmFtIGt1ZGlyZWRkeSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NJYmZFelNLUWE1RVR0anpoUGhHTVBZYlB4UTc0ZkNXdzlJMm5GTTJkaFJVYWRiN2RRPXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6InNpdGFyYW0iLCJmYW1pbHlfbmFtZSI6Imt1ZGlyZWRkeSIsImlhdCI6MTczMDA4OTc3OSwiZXhwIjoxNzMwMDkzMzc5fQ.zcMRbKtQlFYmflnedEOKTul1wW4ukrPhE6zxiK6wi4RibAMYFJiqsL28e-1LzHpeJVNtsIMzQiUM8cl36z_WuWlWSIdeRzSSMNMlcycclvpFQifn4b80YTixwwJpqnRUHv4Nz1RjaiQR0FHbZe3jEtERv4nRuVPA3IkCSsidKBngiU6TLL'),
(2, 'Sitaram', 'Kudireddy', 'sitaramkudireddy@gmail.com', 'FnOU8', '', 'Sitaram Kudireddy', 'https://lh3.googleusercontent.com/a/ACg8ocIvp9LH_e7EntejaJOEryuVCaPFCYDsyG2dntwVSz-CdiyVU1UH=s96-c', 1, 'active', '2024-10-22 20:43:02', '2024-10-22 20:43:02', 'GMAIL', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `address` varchar(500) NOT NULL,
  `mobile` varchar(255) NOT NULL DEFAULT '000-000-0000',
  `description` text NOT NULL,
  `dob` date NOT NULL,
  `gender` varchar(10) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`id`, `userId`, `firstname`, `lastname`, `address`, `mobile`, `description`, `dob`, `gender`, `role`) VALUES
(1, 0, 'asfasdf', 'asdfasdf', 'asdfasdfasdf', '000-000-0000', 'asdfasdfasdf', '2024-10-24', 'Female', 1),
(2, 0, 'asfasdf', 'asdfasdf', 'asdfasdfasdf', '000-000-0000', 'asdfasdfasdf', '2024-10-24', 'Female', 1),
(3, 0, 'asfasdf', 'asdfasdf', 'asdfasdfasdf', '000-000-0000', 'asdfasdfasdf', '2024-10-24', 'Female', 1),
(4, 2, 'Sitaram', 'Kudireddy', 'Repaka gardens 6-158', '000-000-0000', 'dfasdfasdfasdf', '2024-10-31', 'Male', 4),
(5, 1, 'Sitaram', 'manager', 'hyderabad', '000-000-0000', 'gendergen', '1995-06-06', 'Other', 22);

-- --------------------------------------------------------

--
-- Table structure for table `user_roles_role`
--

CREATE TABLE `user_roles_role` (
  `userId` int(11) NOT NULL,
  `roleId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_roles_role`
--
ALTER TABLE `user_roles_role`
  ADD PRIMARY KEY (`userId`,`roleId`),
  ADD KEY `IDX_5f9286e6c25594c6b88c108db7` (`userId`),
  ADD KEY `IDX_4be2f7adf862634f5f803d246b` (`roleId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_roles_role`
--
ALTER TABLE `user_roles_role`
  ADD CONSTRAINT `FK_4be2f7adf862634f5f803d246b8` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_5f9286e6c25594c6b88c108db77` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
