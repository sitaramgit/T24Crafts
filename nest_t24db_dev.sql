-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 22, 2024 at 05:41 PM
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
  `roleName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`id`, `roleName`) VALUES
(1, 'Artist'),
(2, 'Junior artist'),
(3, 'Director'),
(4, 'Producer/ Production company'),
(5, 'Manager'),
(6, 'Assistant director'),
(7, 'Camera man'),
(8, 'Assistant cameraman'),
(9, 'Choreographer'),
(10, 'Assistant Choreographer'),
(11, 'Dancer'),
(12, 'Art director'),
(13, 'Art assistant'),
(14, 'Set assistant'),
(15, 'Set Boy'),
(16, 'Dubbing artist'),
(17, 'Singer'),
(18, 'Music director'),
(19, 'Makeup artiste'),
(20, 'Makeup assistant'),
(21, 'Editor');

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
  `mobile` varchar(255) NOT NULL,
  `socialName` varchar(255) NOT NULL,
  `socialPicture` varchar(255) DEFAULT NULL,
  `isSocialUser` tinyint(4) NOT NULL DEFAULT 0,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `loginSource` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `firstName`, `lastName`, `email`, `password`, `mobile`, `socialName`, `socialPicture`, `isSocialUser`, `status`, `token`, `createdAt`, `updatedAt`, `loginSource`) VALUES
(1, 'sitaram', 'kudireddy', 'sitaramkdks@gmail.com', 'VC4az', '', 'sitaram kudireddy', 'https://lh3.googleusercontent.com/a/ACg8ocIbfEzSKQa5ETtjzhPhGMPYbPxQ74fCWw9I2nFM2dhRUadb7dQ=s96-c', 1, 'active', 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjczZTI1Zjk3ODkxMTljNzg3NWQ1ODA4N2E3OGFjMjNmNWVmMmVkYTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5MDU4NDAzMDYyOTYtZWZiMnRkbGNoaXAyam1jZHE0czJqdjEzMjN0a2gyYWsuYXBwcy5nb29nbGV1c2VyY29udGVudC5j', '2024-10-21 22:35:02', '2024-10-21 22:35:02', 'GMAIL'),
(2, 'Sitaram', 'Kudireddy', 'sitaramkudireddy@gmail.com', 'FnOU8', '', 'Sitaram Kudireddy', 'https://lh3.googleusercontent.com/a/ACg8ocIvp9LH_e7EntejaJOEryuVCaPFCYDsyG2dntwVSz-CdiyVU1UH=s96-c', 1, 'active', 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjczZTI1Zjk3ODkxMTljNzg3NWQ1ODA4N2E3OGFjMjNmNWVmMmVkYTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI5MDU4NDAzMDYyOTYtZWZiMnRkbGNoaXAyam1jZHE0czJqdjEzMjN0a2gyYWsuYXBwcy5nb29nbGV1c2VyY29udGVudC5j', '2024-10-22 20:43:02', '2024-10-22 20:43:02', 'GMAIL');

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `id` int(11) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phoneNumber` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

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
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `REL_51cb79b5555effaf7d69ba1cff` (`userId`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD CONSTRAINT `FK_51cb79b5555effaf7d69ba1cff9` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

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
