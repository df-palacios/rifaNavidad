-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 30, 2024 at 12:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rifa`
--

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

CREATE TABLE `clientes` (
  `identificacion` int(11) NOT NULL,
  `nombreUsuario` varchar(255) NOT NULL,
  `usuarioHabilitado` tinyint(1) NOT NULL,
  `haParticipado` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes`
(`identificacion`, `nombreUsuario`, `usuarioHabilitado`, `haParticipado`, `created_at`, `updated_at`)
VALUES
(0,'usuario00',0,0,NOW(),NOW()),
(1,'usuario01',1,0,NOW(),NOW()),
(2,'usuario02',0,0,NOW(),NOW()),
(3,'usuario03',1,0,NOW(),NOW()),
(4,'usuario04',0,0,NOW(),NOW()),
(5,'usuario05',1,0,NOW(),NOW()),
(6,'usuario06',0,0,NOW(),NOW()),
(7,'usuario07',1,0,NOW(),NOW()),
(8,'usuario08',0,0,NOW(),NOW()),
(9,'usuario09',1,0,NOW(),NOW()),
(10,'usuario10',0,0,NOW(),NOW()),
(11,'usuario11',1,0,NOW(),NOW()),
(12,'usuario12',0,0,NOW(),NOW()),
(13,'usuario13',1,0,NOW(),NOW()),
(14,'usuario14',0,0,NOW(),NOW()),
(15,'usuario15',1,0,NOW(),NOW()),
(16,'usuario16',0,0,NOW(),NOW()),
(17,'usuario17',1,0,NOW(),NOW()),
(18,'usuario18',0,0,NOW(),NOW()),
(19,'usuario19',1,0,NOW(),NOW()),
(20,'usuario20',0,0,NOW(),NOW()),
(21,'usuario21',1,0,NOW(),NOW()),
(22,'usuario22',0,0,NOW(),NOW()),
(23,'usuario23',1,0,NOW(),NOW()),
(24,'usuario24',0,0,NOW(),NOW()),
(25,'usuario25',1,0,NOW(),NOW()),
(26,'usuario26',0,0,NOW(),NOW()),
(27,'usuario27',1,0,NOW(),NOW()),
(28,'usuario28',0,0,NOW(),NOW()),
(29,'usuario29',1,0,NOW(),NOW()),
(30,'usuario30',0,0,NOW(),NOW()),
(31,'usuario31',1,0,NOW(),NOW()),
(32,'usuario32',0,0,NOW(),NOW()),
(33,'usuario33',1,0,NOW(),NOW()),
(34,'usuario34',0,0,NOW(),NOW()),
(35,'usuario35',1,0,NOW(),NOW()),
(36,'usuario36',0,0,NOW(),NOW()),
(37,'usuario37',1,0,NOW(),NOW()),
(38,'usuario38',0,0,NOW(),NOW()),
(39,'usuario39',1,0,NOW(),NOW()),
(40,'usuario40',0,0,NOW(),NOW()),
(41,'usuario41',1,0,NOW(),NOW()),
(42,'usuario42',0,0,NOW(),NOW()),
(43,'usuario43',1,0,NOW(),NOW()),
(44,'usuario44',0,0,NOW(),NOW()),
(45,'usuario45',1,0,NOW(),NOW()),
(46,'usuario46',0,0,NOW(),NOW()),
(47,'usuario47',1,0,NOW(),NOW()),
(48,'usuario48',0,0,NOW(),NOW()),
(49,'usuario49',1,0,NOW(),NOW()),
(50,'usuario50',0,0,NOW(),NOW()),
(51,'usuario51',1,0,NOW(),NOW()),
(52,'usuario52',0,0,NOW(),NOW()),
(53,'usuario53',1,0,NOW(),NOW()),
(54,'usuario54',0,0,NOW(),NOW()),
(55,'usuario55',1,0,NOW(),NOW()),
(56,'usuario56',0,0,NOW(),NOW()),
(57,'usuario57',1,0,NOW(),NOW()),
(58,'usuario58',0,0,NOW(),NOW()),
(59,'usuario59',1,0,NOW(),NOW()),
(60,'usuario60',0,0,NOW(),NOW()),
(61,'usuario61',1,0,NOW(),NOW()),
(62,'usuario62',0,0,NOW(),NOW()),
(63,'usuario63',1,0,NOW(),NOW()),
(64,'usuario64',0,0,NOW(),NOW()),
(65,'usuario65',1,0,NOW(),NOW()),
(66,'usuario66',0,0,NOW(),NOW()),
(67,'usuario67',1,0,NOW(),NOW()),
(68,'usuario68',0,0,NOW(),NOW()),
(69,'usuario69',1,0,NOW(),NOW()),
(70,'usuario70',0,0,NOW(),NOW()),
(71,'usuario71',1,0,NOW(),NOW()),
(72,'usuario72',0,0,NOW(),NOW()),
(73,'usuario73',1,0,NOW(),NOW()),
(74,'usuario74',0,0,NOW(),NOW()),
(75,'usuario75',1,0,NOW(),NOW()),
(76,'usuario76',0,0,NOW(),NOW()),
(77,'usuario77',1,0,NOW(),NOW()),
(78,'usuario78',0,0,NOW(),NOW()),
(79,'usuario79',1,0,NOW(),NOW()),
(80,'usuario80',0,0,NOW(),NOW()),
(81,'usuario81',1,0,NOW(),NOW()),
(82,'usuario82',0,0,NOW(),NOW()),
(83,'usuario83',1,0,NOW(),NOW()),
(84,'usuario84',0,0,NOW(),NOW()),
(85,'usuario85',1,0,NOW(),NOW()),
(86,'usuario86',0,0,NOW(),NOW()),
(87,'usuario87',1,0,NOW(),NOW()),
(88,'usuario88',0,0,NOW(),NOW()),
(89,'usuario89',1,0,NOW(),NOW()),
(90,'usuario90',0,0,NOW(),NOW()),
(91,'usuario91',1,0,NOW(),NOW()),
(92,'usuario92',0,0,NOW(),NOW()),
(93,'usuario93',1,0,NOW(),NOW()),
(94,'usuario94',0,0,NOW(),NOW()),
(95,'usuario95',1,0,NOW(),NOW()),
(96,'usuario96',0,0,NOW(),NOW()),
(97,'usuario97',1,0,NOW(),NOW()),
(98,'usuario98',0,0,NOW(),NOW()),
(99,'usuario99',1,0,NOW(),NOW());

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_12_24_023258_create_clientes_table', 1),
(6, '2024_12_24_023259_create_premios_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

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
-- Table structure for table `premios`
--

CREATE TABLE `premios` (
  `idPremio` int(10) UNSIGNED NOT NULL,
  `nombrePremio` varchar(255) NOT NULL,
  `idGanador` int(11) DEFAULT NULL,
  `disponible` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `premios`
--

INSERT INTO `premios` (`idPremio`, `nombrePremio`, `idGanador`, `disponible`, `created_at`, `updated_at`) VALUES
(1, 'olla arrocera', NULL, 1, NULL, NULL),
(2, 'parlante', NULL, 1, NULL, NULL),
(3, 'ventilador 3 en 1', NULL, 1, NULL, NULL),
(4, 'olla a presion', NULL, 1, NULL, NULL),
(5, 'horno microondas', NULL, 1, NULL, NULL),
(6, 'licuadora', NULL, 1, NULL, NULL),
(7, 'air fryer', NULL, 1, NULL, NULL),
(8, 'cafetera', NULL, 1, NULL, NULL),
(9, 'juego de ollas', NULL, 1, NULL, NULL);

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
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`identificacion`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `premios`
--
ALTER TABLE `premios`
  ADD PRIMARY KEY (`idPremio`),
  ADD KEY `premios_idganador_foreign` (`idGanador`);

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
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `premios`
--
ALTER TABLE `premios`
  MODIFY `idPremio` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `premios`
--
ALTER TABLE `premios`
  ADD CONSTRAINT `premios_idganador_foreign` FOREIGN KEY (`idGanador`) REFERENCES `clientes` (`identificacion`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
