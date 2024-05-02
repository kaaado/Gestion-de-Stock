-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 02, 2024 at 02:30 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `back_end`
--

-- --------------------------------------------------------

--
-- Table structure for table `bondelivraison`
--

CREATE TABLE `bondelivraison` (
  `Id` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Old_Reste` double DEFAULT NULL,
  `Reste` double DEFAULT NULL,
  `Payment` double DEFAULT NULL,
  `Id_Client` int(11) DEFAULT NULL,
  `Id_User` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bondelivraison`
--

INSERT INTO `bondelivraison` (`Id`, `Date`, `Old_Reste`, `Reste`, `Payment`, `Id_Client`, `Id_User`) VALUES
(1, '2024-01-20', 200, 100, 100, 1, 1),
(2, '2024-01-21', 300, 200, 150, 2, 2),
(3, '2024-01-22', 400, 300, 200, 3, 3),
(4, '2024-01-23', 150, 100, 50, 4, 4),
(5, '2024-01-24', 250, 150, 100, 5, 5);

-- --------------------------------------------------------

--
-- Table structure for table `client`
--

CREATE TABLE `client` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Address` varchar(255) DEFAULT NULL,
  `Phone_Number` varchar(20) DEFAULT NULL,
  `Sold_Total` double DEFAULT NULL,
  `Reste` double DEFAULT NULL,
  `Paid` double DEFAULT NULL,
  `Credit` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `client`
--

INSERT INTO `client` (`Id`, `Name`, `Address`, `Phone_Number`, `Sold_Total`, `Reste`, `Paid`, `Credit`) VALUES
(1, 'Client1', 'Address1', '1234567891', 1000, 500, 500, 0),
(2, 'Client2', 'Address2', '1234567892', 1500, 700, 800, 0),
(3, 'Client3', 'Address3', '1234567893', 2000, 1000, 1000, 0),
(4, 'Client4', 'Address4', '1234567894', 1200, 400, 800, 0),
(5, 'Client5', 'Address5', '1234567895', 1800, 900, 900, 0);

-- --------------------------------------------------------

--
-- Table structure for table `deposit`
--

CREATE TABLE `deposit` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `deposit`
--

INSERT INTO `deposit` (`Id`, `Name`) VALUES
(1, 'Deposit1'),
(2, 'Deposit2'),
(3, 'Deposit3'),
(4, 'Deposit4');

-- --------------------------------------------------------

--
-- Table structure for table `facture`
--

CREATE TABLE `facture` (
  `Id` int(11) NOT NULL,
  `Date` date DEFAULT NULL,
  `Id_Client` int(11) DEFAULT NULL,
  `Id_Seller` int(11) DEFAULT NULL,
  `Payment` double DEFAULT NULL,
  `Reste` double DEFAULT NULL,
  `Solde` double DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `Update_Date` date DEFAULT NULL,
  `Update_Time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `facture`
--

INSERT INTO `facture` (`Id`, `Date`, `Id_Client`, `Id_Seller`, `Payment`, `Reste`, `Solde`, `Type`, `Update_Date`, `Update_Time`) VALUES
(1, '2024-01-20', 1, 1, 500, 100, 400, 'type1', '2024-01-20', '0000-00-00 00:00:00'),
(2, '2024-01-21', 2, 2, 700, 200, 500, 'type2', '2024-01-21', '0000-00-00 00:00:00'),
(3, '2024-01-22', 3, 3, 1000, 300, 700, 'type3', '2024-01-22', '0000-00-00 00:00:00'),
(4, '2024-01-23', 4, 4, 400, 100, 300, 'type1', '2024-01-23', '0000-00-00 00:00:00'),
(5, '2024-01-24', 5, 5, 900, 150, 750, 'type2', '2024-01-24', '0000-00-00 00:00:00');

-- --------------------------------------------------------

-- --------------------------------------------------------

--
-- Table structure for table `groupe`
--

CREATE TABLE `groupe` (
  `Id` int(11) NOT NULL,
  `Name` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `groupe`
--

INSERT INTO `groupe` (`Id`, `Name`) VALUES
(1, 'Group1'),
(2, 'Group2'),
(3, 'Group3'),
(4, 'Group4');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `Id` int(11) NOT NULL,
  `Bar_Code` varchar(255) DEFAULT NULL,
  `Reference` varchar(255) DEFAULT NULL,
  `Name` varchar(255) DEFAULT NULL,
  `Buying_Price` double DEFAULT NULL,
  `Selling_Price` double DEFAULT NULL,
  `Stock` int(11) DEFAULT NULL,
  `Photo` varchar(255) DEFAULT NULL,
  `Id_Groupe` int(11) DEFAULT NULL,
  `Id_Deposit` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`Id`, `Bar_Code`, `Reference`, `Name`, `Buying_Price`, `Selling_Price`, `Stock`, `Photo`, `Id_Groupe`, `Id_Deposit`) VALUES
(1, '123ABC', 'Ref123', 'Product1', 50, 80, 100, 'product1.jpg', 1, 1),
(2, '456DEF', 'Ref456', 'Product2', 40, 70, 120, 'product2.jpg', 2, 2),
(3, '789GHI', 'Ref789', 'Product3', 60, 90, 80, 'product3.jpg', 3, 3),
(4, 'ABC123', 'RefABC', 'Product4', 55, 85, 150, 'product4.jpg', 4, 4),
(5, 'DEF456', 'RefDEF', 'Product5', 70, 100, 200, 'product5.jpg', 5, 5);

-- --------------------------------------------------------
--
-- Table structure for table `product_fact`
--

CREATE TABLE `product_fact` (
  `Id_Fact` int(11) NOT NULL,
  `Id_Prod` int(11) NOT NULL,
  `Product_Price` double DEFAULT NULL,
  `Product_Quantity` int(11) DEFAULT NULL,
  `TVA` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `Id` int(11) NOT NULL,
  `Username` varchar(255) DEFAULT NULL,
  `Password` varchar(255) DEFAULT NULL,
  `Type` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`Id`, `Username`, `Password`, `Type`) VALUES
(1, 'User1', 'Password1', 1),
(2, 'User2', 'Password2', 2),
(3, 'User3', 'Password3', 1),
(4, 'User4', 'Password4', 2),
(5, 'User5', 'Password5', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
--
-- Indexes for dumped tables
--

--
-- Indexes for table `bondelivraison`
--
ALTER TABLE `bondelivraison`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `deposit`
--
ALTER TABLE `deposit`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `facture`
--
ALTER TABLE `facture`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `groupe`
--
ALTER TABLE `groupe`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_fact`
--
ALTER TABLE `product_fact`
  ADD PRIMARY KEY (`Id_Fact`,`Id_Prod`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bondelivraison`
--
ALTER TABLE `bondelivraison`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `client`
--
ALTER TABLE `client`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `deposit`
--
ALTER TABLE `deposit`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `facture`
--
ALTER TABLE `facture`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `groupe`
--
ALTER TABLE `groupe`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
