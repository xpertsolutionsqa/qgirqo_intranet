-- MySQL dump 10.13  Distrib 8.0.43, for macos15 (arm64)
--
-- Host: 127.0.0.1    Database: qgirco_intranet
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `album_photos`
--

DROP TABLE IF EXISTS `album_photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album_photos` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `album_id` bigint unsigned NOT NULL,
  `file_path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `caption` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `album_photos_album_id_foreign` (`album_id`),
  CONSTRAINT `album_photos_album_id_foreign` FOREIGN KEY (`album_id`) REFERENCES `albums` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album_photos`
--

LOCK TABLES `album_photos` WRITE;
/*!40000 ALTER TABLE `album_photos` DISABLE KEYS */;
INSERT INTO `album_photos` VALUES (1,1,'/storage/gallery/JxESqzSwrN2jhfGsBT1q85JHCagW7WCzsST5otrf.png',NULL,'2026-02-03 10:23:42','2026-02-03 10:23:42'),(2,1,'/storage/gallery/uDvbW6PxFvPHK2R42oy5NELADqZ2T4DucSPGtbT0.png',NULL,'2026-02-03 10:37:43','2026-02-03 10:37:43'),(3,1,'/storage/gallery/v2OKEdnpiHK5JzBN5mXOBbbb2PYcLeJKWeZOA8be.png',NULL,'2026-02-03 10:42:17','2026-02-03 10:42:17');
/*!40000 ALTER TABLE `album_photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `albums`
--

DROP TABLE IF EXISTS `albums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `albums` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `cover_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `albums_slug_unique` (`slug`),
  KEY `albums_user_id_foreign` (`user_id`),
  CONSTRAINT `albums_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `albums`
--

LOCK TABLES `albums` WRITE;
/*!40000 ALTER TABLE `albums` DISABLE KEYS */;
INSERT INTO `albums` VALUES (1,1,'Default Gallery','default-gallery','Main gallery album',NULL,1,'2026-02-03 09:58:25','2026-02-03 09:58:25');
/*!40000 ALTER TABLE `albums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `departments_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Information Department','it_department',NULL,1,'2026-02-03 09:58:07','2026-02-03 09:58:07'),(2,'Human Resources','hr',NULL,1,'2026-02-03 09:58:07','2026-02-03 09:58:07'),(3,'Finance','finance',NULL,1,'2026-02-03 09:58:07','2026-02-03 09:58:07'),(4,'Underwriting','underwriting',NULL,1,'2026-02-03 09:58:07','2026-02-03 09:58:07'),(5,'Claims','claims',NULL,1,'2026-02-03 09:58:07','2026-02-03 09:58:07');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `designations`
--

DROP TABLE IF EXISTS `designations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `designations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `designations_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `designations`
--

LOCK TABLES `designations` WRITE;
/*!40000 ALTER TABLE `designations` DISABLE KEYS */;
INSERT INTO `designations` VALUES (1,'Manager','manager',NULL,1,'2026-02-03 09:58:07','2026-02-03 09:58:07'),(2,'Software Engineer','software-engineer',NULL,1,'2026-02-03 09:58:07','2026-02-03 09:58:07'),(3,'Senior Developer','senior-developer',NULL,1,'2026-02-03 09:58:07','2026-02-03 09:58:07'),(4,'Junior Engineer','junior-engineer',NULL,1,'2026-02-03 09:58:07','2026-02-03 09:58:07'),(5,'HR Specialist','hr-specialist',NULL,1,'2026-02-03 09:58:07','2026-02-03 09:58:07'),(6,'Accountant','accountant',NULL,1,'2026-02-03 09:58:07','2026-02-03 09:58:07');
/*!40000 ALTER TABLE `designations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_of_the_months`
--

DROP TABLE IF EXISTS `employee_of_the_months`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_of_the_months` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `month` int NOT NULL,
  `year` int NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reason` text COLLATE utf8mb4_unicode_ci,
  `featured_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_of_the_months_user_id_month_year_unique` (`user_id`,`month`,`year`),
  CONSTRAINT `employee_of_the_months_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_of_the_months`
--

LOCK TABLES `employee_of_the_months` WRITE;
/*!40000 ALTER TABLE `employee_of_the_months` DISABLE KEYS */;
/*!40000 ALTER TABLE `employee_of_the_months` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_profiles`
--

DROP TABLE IF EXISTS `employee_profiles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_profiles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `department_id` bigint unsigned DEFAULT NULL,
  `designation_id` bigint unsigned DEFAULT NULL,
  `employee_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `joining_date` date DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `emergency_contact` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `employee_profiles_employee_id_unique` (`employee_id`),
  KEY `employee_profiles_user_id_foreign` (`user_id`),
  KEY `employee_profiles_department_id_foreign` (`department_id`),
  KEY `employee_profiles_designation_id_foreign` (`designation_id`),
  CONSTRAINT `employee_profiles_department_id_foreign` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL,
  CONSTRAINT `employee_profiles_designation_id_foreign` FOREIGN KEY (`designation_id`) REFERENCES `designations` (`id`) ON DELETE SET NULL,
  CONSTRAINT `employee_profiles_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_profiles`
--

LOCK TABLES `employee_profiles` WRITE;
/*!40000 ALTER TABLE `employee_profiles` DISABLE KEYS */;
INSERT INTO `employee_profiles` VALUES (1,1,1,1,'ADMIN-001','2026-02-03',NULL,NULL,NULL,NULL,'2026-02-03 09:58:08','2026-02-03 09:58:08'),(2,2,3,2,'EMP-LX215','1994-07-11','1992-02-03',NULL,'+1-385-473-7877','+1-218-213-5544','2026-02-03 09:58:08','2026-02-03 09:58:08'),(3,3,5,2,'EMP-JS644','1972-01-07','1989-02-03',NULL,'1-541-486-2962','402-867-5164','2026-02-03 09:58:08','2026-02-03 09:58:08'),(4,4,3,6,'EMP-DB251','2022-02-03','1980-01-07',NULL,'+1-248-934-7174','+15342507167','2026-02-03 09:58:09','2026-02-03 09:58:09'),(5,5,5,1,'EMP-TN694','2021-02-03','1974-04-24',NULL,'+1-401-941-8180','(854) 839-0306','2026-02-03 09:58:09','2026-02-03 09:58:09'),(6,6,5,1,'EMP-ME472','1989-06-28','1985-02-04',NULL,'870-486-7370','1-661-206-9889','2026-02-03 09:58:09','2026-02-03 09:58:09'),(7,7,1,5,'EMP-XK435','1981-07-16','1992-02-05',NULL,'1-920-588-9070','+1-949-520-5442','2026-02-03 09:58:10','2026-02-03 09:58:10'),(8,8,1,1,'EMP-XG004','1994-05-31','1989-02-06',NULL,'+1 (412) 764-6898','(650) 301-1298','2026-02-03 09:58:10','2026-02-03 09:58:10'),(9,9,4,6,'EMP-WA346','2008-03-28','1983-09-23',NULL,'(757) 766-4752','+1.520.318.0346','2026-02-03 09:58:10','2026-02-03 09:58:10'),(10,10,4,3,'EMP-WS340','2007-09-12','1979-03-24',NULL,'+1 (765) 459-4651','651-612-8265','2026-02-03 09:58:11','2026-02-03 09:58:11'),(11,11,3,3,'EMP-BR386','1991-01-09','1977-09-25',NULL,'541.791.0564','904.778.9696','2026-02-03 09:58:11','2026-02-03 09:58:11'),(12,12,3,2,'EMP-FP736','1973-01-28','1980-02-26',NULL,'364.859.6711','+1.678.256.4877','2026-02-03 09:58:11','2026-02-03 09:58:11'),(13,13,4,4,'EMP-UA111','1993-11-26','2000-09-07',NULL,'+1.210.481.3194','364-345-0881','2026-02-03 09:58:12','2026-02-03 09:58:12'),(14,14,2,4,'EMP-JQ973','1977-03-22','1988-11-18',NULL,'1-380-787-2025','208.332.9349','2026-02-03 09:58:12','2026-02-03 09:58:12'),(15,15,4,4,'EMP-SU636','1993-02-21','1983-04-12',NULL,'(352) 891-2591','(831) 604-7453','2026-02-03 09:58:12','2026-02-03 09:58:12'),(16,16,2,3,'EMP-RT054','1996-10-25','1984-10-06',NULL,'+1-726-390-7615','(469) 403-5920','2026-02-03 09:58:13','2026-02-03 09:58:13'),(17,17,3,2,'EMP-OG208','1976-01-11','2004-11-02',NULL,'1-361-783-5041','+1 (575) 862-9498','2026-02-03 09:58:13','2026-02-03 09:58:13'),(18,18,5,2,'EMP-ZC660','1987-01-09','2000-03-18',NULL,'+1.310.868.3215','1-870-442-0963','2026-02-03 09:58:13','2026-02-03 09:58:13');
/*!40000 ALTER TABLE `employee_profiles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_categories`
--

DROP TABLE IF EXISTS `forum_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forum_categories_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_categories`
--

LOCK TABLES `forum_categories` WRITE;
/*!40000 ALTER TABLE `forum_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_posts`
--

DROP TABLE IF EXISTS `forum_posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `forum_topic_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `forum_posts_forum_topic_id_foreign` (`forum_topic_id`),
  KEY `forum_posts_user_id_foreign` (`user_id`),
  CONSTRAINT `forum_posts_forum_topic_id_foreign` FOREIGN KEY (`forum_topic_id`) REFERENCES `forum_topics` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forum_posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_posts`
--

LOCK TABLES `forum_posts` WRITE;
/*!40000 ALTER TABLE `forum_posts` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum_posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forum_topics`
--

DROP TABLE IF EXISTS `forum_topics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `forum_topics` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `forum_category_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `view_count` int NOT NULL DEFAULT '0',
  `is_locked` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `forum_topics_slug_unique` (`slug`),
  KEY `forum_topics_forum_category_id_foreign` (`forum_category_id`),
  KEY `forum_topics_user_id_foreign` (`user_id`),
  CONSTRAINT `forum_topics_forum_category_id_foreign` FOREIGN KEY (`forum_category_id`) REFERENCES `forum_categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `forum_topics_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forum_topics`
--

LOCK TABLES `forum_topics` WRITE;
/*!40000 ALTER TABLE `forum_topics` DISABLE KEYS */;
/*!40000 ALTER TABLE `forum_topics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gceo_messages`
--

DROP TABLE IF EXISTS `gceo_messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gceo_messages` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `video_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `gceo_messages_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gceo_messages`
--

LOCK TABLES `gceo_messages` WRITE;
/*!40000 ALTER TABLE `gceo_messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `gceo_messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'0001_01_01_000000_create_users_table',1),(2,'0001_01_01_000001_create_cache_table',1),(3,'0001_01_01_000002_create_jobs_table',1),(4,'2026_01_14_065815_create_departments_table',1),(5,'2026_01_14_070226_create_designations_table',1),(6,'2026_01_14_070326_create_employee_profiles_table',1),(7,'2026_01_14_074754_create_permission_tables',1),(8,'2026_01_14_081736_add_dob_to_employee_profiles_table',1),(9,'2026_01_14_085138_create_post_categories_table',1),(10,'2026_01_14_085145_create_posts_table',1),(11,'2026_01_14_114925_create_employee_of_the_months_table',1),(12,'2026_01_14_115049_create_polls_table',1),(13,'2026_01_14_115052_create_poll_options_table',1),(14,'2026_01_14_115317_create_poll_votes_table',1),(15,'2026_01_14_115912_create_albums_table',1),(16,'2026_01_14_115914_create_album_photos_table',1),(17,'2026_01_14_123108_create_forum_categories_table',1),(18,'2026_01_14_123127_create_forum_topics_table',1),(19,'2026_01_14_123151_create_forum_posts_table',1),(20,'2026_01_14_141238_create_personal_access_tokens_table',1),(21,'2026_01_15_134143_add_event_time_to_posts_table',1),(22,'2026_02_01_075704_add_end_time_field_in_posts_table',1),(23,'2026_02_01_092333_add_avatar_to_employees_profiles_table',1),(24,'2026_02_03_112944_create_gceo_messages_table',1);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_permissions`
--

DROP TABLE IF EXISTS `model_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_permissions`
--

LOCK TABLES `model_has_permissions` WRITE;
/*!40000 ALTER TABLE `model_has_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `model_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_has_roles`
--

DROP TABLE IF EXISTS `model_has_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `model_has_roles` (
  `role_id` bigint unsigned NOT NULL,
  `model_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `model_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_has_roles`
--

LOCK TABLES `model_has_roles` WRITE;
/*!40000 ALTER TABLE `model_has_roles` DISABLE KEYS */;
INSERT INTO `model_has_roles` VALUES (1,'App\\Models\\User',1),(3,'App\\Models\\User',2),(3,'App\\Models\\User',3),(3,'App\\Models\\User',4),(3,'App\\Models\\User',5),(3,'App\\Models\\User',6),(3,'App\\Models\\User',7),(3,'App\\Models\\User',8),(3,'App\\Models\\User',9),(3,'App\\Models\\User',10),(3,'App\\Models\\User',11),(3,'App\\Models\\User',12),(3,'App\\Models\\User',13),(3,'App\\Models\\User',14),(3,'App\\Models\\User',15),(3,'App\\Models\\User',16),(3,'App\\Models\\User',17),(3,'App\\Models\\User',18);
/*!40000 ALTER TABLE `model_has_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'manage-users','web','2026-02-03 09:58:07','2026-02-03 09:58:07'),(2,'approve-leaves','web','2026-02-03 09:58:07','2026-02-03 09:58:07'),(3,'view-announcements','web','2026-02-03 09:58:07','2026-02-03 09:58:07');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `personal_access_tokens`
--

DROP TABLE IF EXISTS `personal_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `personal_access_tokens`
--

LOCK TABLES `personal_access_tokens` WRITE;
/*!40000 ALTER TABLE `personal_access_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `personal_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poll_options`
--

DROP TABLE IF EXISTS `poll_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poll_options` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `poll_id` bigint unsigned NOT NULL,
  `option_text` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `poll_options_poll_id_foreign` (`poll_id`),
  CONSTRAINT `poll_options_poll_id_foreign` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll_options`
--

LOCK TABLES `poll_options` WRITE;
/*!40000 ALTER TABLE `poll_options` DISABLE KEYS */;
/*!40000 ALTER TABLE `poll_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `poll_votes`
--

DROP TABLE IF EXISTS `poll_votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `poll_votes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `poll_id` bigint unsigned NOT NULL,
  `poll_option_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `poll_votes_poll_id_user_id_unique` (`poll_id`,`user_id`),
  KEY `poll_votes_poll_option_id_foreign` (`poll_option_id`),
  KEY `poll_votes_user_id_foreign` (`user_id`),
  CONSTRAINT `poll_votes_poll_id_foreign` FOREIGN KEY (`poll_id`) REFERENCES `polls` (`id`) ON DELETE CASCADE,
  CONSTRAINT `poll_votes_poll_option_id_foreign` FOREIGN KEY (`poll_option_id`) REFERENCES `poll_options` (`id`) ON DELETE CASCADE,
  CONSTRAINT `poll_votes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `poll_votes`
--

LOCK TABLES `poll_votes` WRITE;
/*!40000 ALTER TABLE `poll_votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `poll_votes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `polls`
--

DROP TABLE IF EXISTS `polls`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `polls` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `question` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `starts_at` datetime DEFAULT NULL,
  `ends_at` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `polls_user_id_foreign` (`user_id`),
  CONSTRAINT `polls_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `polls`
--

LOCK TABLES `polls` WRITE;
/*!40000 ALTER TABLE `polls` DISABLE KEYS */;
/*!40000 ALTER TABLE `polls` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_categories`
--

DROP TABLE IF EXISTS `post_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `post_categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_categories`
--

LOCK TABLES `post_categories` WRITE;
/*!40000 ALTER TABLE `post_categories` DISABLE KEYS */;
INSERT INTO `post_categories` VALUES (1,'Company News','company-news','#3b82f6','2026-02-03 09:58:13','2026-02-03 09:58:13'),(2,'Events','events','#ef4444','2026-02-03 09:58:13','2026-02-03 09:58:13'),(3,'Announcements','announcements','#10b981','2026-02-03 09:58:13','2026-02-03 09:58:13'),(4,'HR Updates','hr-updates','#f59e0b','2026-02-03 09:58:13','2026-02-03 09:58:13');
/*!40000 ALTER TABLE `post_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `type` enum('news','announcement','event') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'news',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` text COLLATE utf8mb4_unicode_ci,
  `content` longtext COLLATE utf8mb4_unicode_ci,
  `featured_image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `event_date` datetime DEFAULT NULL,
  `event_time` time DEFAULT NULL,
  `event_end_time` time DEFAULT NULL,
  `event_venue` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `is_published` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_slug_unique` (`slug`),
  KEY `posts_user_id_foreign` (`user_id`),
  KEY `posts_category_id_foreign` (`category_id`),
  CONSTRAINT `posts_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `post_categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `posts_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,1,1,'news','Latest Update 1: QGIRCO Digital Transformation Phase 1','latest-update-1-qgirco-digital-transformation-phase-1-6981f0e5b5818','This is a brief summary for news update number 1. We are making great progress in our digital initiative.','Full content for the news item 1. This covers all the details about the recent changes, team achievements, and future milestones for the project.',NULL,NULL,NULL,NULL,NULL,1,'2026-02-02 09:58:13','2026-02-03 09:58:13'),(2,1,1,'news','Latest Update 2: QGIRCO Digital Transformation Phase 2','latest-update-2-qgirco-digital-transformation-phase-2-6981f0e5b5dda','This is a brief summary for news update number 2. We are making great progress in our digital initiative.','Full content for the news item 2. This covers all the details about the recent changes, team achievements, and future milestones for the project.',NULL,NULL,NULL,NULL,NULL,1,'2026-02-01 09:58:13','2026-02-03 09:58:13'),(3,1,1,'news','Latest Update 3: QGIRCO Digital Transformation Phase 3','latest-update-3-qgirco-digital-transformation-phase-3-6981f0e5b6190','This is a brief summary for news update number 3. We are making great progress in our digital initiative.','Full content for the news item 3. This covers all the details about the recent changes, team achievements, and future milestones for the project.',NULL,NULL,NULL,NULL,NULL,1,'2026-01-31 09:58:13','2026-02-03 09:58:13'),(4,1,1,'news','Latest Update 4: QGIRCO Digital Transformation Phase 4','latest-update-4-qgirco-digital-transformation-phase-4-6981f0e5b65cc','This is a brief summary for news update number 4. We are making great progress in our digital initiative.','Full content for the news item 4. This covers all the details about the recent changes, team achievements, and future milestones for the project.',NULL,NULL,NULL,NULL,NULL,1,'2026-01-30 09:58:13','2026-02-03 09:58:13'),(5,1,1,'news','Latest Update 5: QGIRCO Digital Transformation Phase 5','latest-update-5-qgirco-digital-transformation-phase-5-6981f0e5b692e','This is a brief summary for news update number 5. We are making great progress in our digital initiative.','Full content for the news item 5. This covers all the details about the recent changes, team achievements, and future milestones for the project.',NULL,NULL,NULL,NULL,NULL,1,'2026-01-29 09:58:13','2026-02-03 09:58:13'),(6,1,1,'news','Latest Update 6: QGIRCO Digital Transformation Phase 6','latest-update-6-qgirco-digital-transformation-phase-6-6981f0e5b6d97','This is a brief summary for news update number 6. We are making great progress in our digital initiative.','Full content for the news item 6. This covers all the details about the recent changes, team achievements, and future milestones for the project.',NULL,NULL,NULL,NULL,NULL,1,'2026-01-28 09:58:13','2026-02-03 09:58:13'),(7,1,1,'news','Latest Update 7: QGIRCO Digital Transformation Phase 7','latest-update-7-qgirco-digital-transformation-phase-7-6981f0e5b7202','This is a brief summary for news update number 7. We are making great progress in our digital initiative.','Full content for the news item 7. This covers all the details about the recent changes, team achievements, and future milestones for the project.',NULL,NULL,NULL,NULL,NULL,1,'2026-01-27 09:58:13','2026-02-03 09:58:13'),(8,1,1,'news','Latest Update 8: QGIRCO Digital Transformation Phase 8','latest-update-8-qgirco-digital-transformation-phase-8-6981f0e5b781b','This is a brief summary for news update number 8. We are making great progress in our digital initiative.','Full content for the news item 8. This covers all the details about the recent changes, team achievements, and future milestones for the project.',NULL,NULL,NULL,NULL,NULL,1,'2026-01-26 09:58:13','2026-02-03 09:58:13'),(9,1,1,'news','Latest Update 9: QGIRCO Digital Transformation Phase 9','latest-update-9-qgirco-digital-transformation-phase-9-6981f0e5b7b49','This is a brief summary for news update number 9. We are making great progress in our digital initiative.','Full content for the news item 9. This covers all the details about the recent changes, team achievements, and future milestones for the project.',NULL,NULL,NULL,NULL,NULL,1,'2026-01-25 09:58:13','2026-02-03 09:58:13'),(10,1,1,'news','Latest Update 10: QGIRCO Digital Transformation Phase 10','latest-update-10-qgirco-digital-transformation-phase-10-6981f0e5b7e9f','This is a brief summary for news update number 10. We are making great progress in our digital initiative.','Full content for the news item 10. This covers all the details about the recent changes, team achievements, and future milestones for the project.',NULL,NULL,NULL,NULL,NULL,1,'2026-01-24 09:58:13','2026-02-03 09:58:13');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_has_permissions`
--

DROP TABLE IF EXISTS `role_has_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_has_permissions` (
  `permission_id` bigint unsigned NOT NULL,
  `role_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_has_permissions`
--

LOCK TABLES `role_has_permissions` WRITE;
/*!40000 ALTER TABLE `role_has_permissions` DISABLE KEYS */;
INSERT INTO `role_has_permissions` VALUES (1,1),(2,1),(3,1),(2,2),(3,2),(3,3);
/*!40000 ALTER TABLE `role_has_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `guard_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','web','2026-02-03 09:58:07','2026-02-03 09:58:07'),(2,'hr','web','2026-02-03 09:58:07','2026-02-03 09:58:07'),(3,'employee','web','2026-02-03 09:58:07','2026-02-03 09:58:07');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('7eRYIiUKkNHAqy15SbOQJDABTGsTLQvvmriOYFKa',1,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','YTo1OntzOjY6Il90b2tlbiI7czo0MDoiU3dnTzVja3Fxc1czQlFRc2pJY29xMnhFb3dkT0dqVUhDUklTSDJQVSI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjMxOiJodHRwOi8vMTI3LjAuMC4xOjgwMDAvZW1wbG95ZWVzIjtzOjU6InJvdXRlIjtzOjE1OiJlbXBsb3llZXMuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=',1770128894),('s524hSyuYRUEYbQb3jyzBjnAxpQjEm1f5X12fSaM',NULL,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/144.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoieEVHMkd0bkJXQlRPSEpKczJVUXptUjlJeU92azJDdWRvejN4cmF0ciI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7czo5OiJkYXNoYm9hcmQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjM6InVybCI7YToxOntzOjg6ImludGVuZGVkIjtzOjI5OiJodHRwOi8vbG9jYWxob3N0OjgwMDAvZ2FsbGVyeSI7fX0=',1770128894);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'System Admin','admin@qgirco.com',NULL,'$2y$12$anL0SW47GHRRKzKqSJ18b.74HZgpwI1EyxvGGeVTjpKWMTfjgcMfO',NULL,'2026-02-03 09:58:08','2026-02-03 09:58:08'),(2,'Jonathan Bartoletti','leannon.kianna@example.net',NULL,'$2y$12$rgzhBo86.E3lmTzE/Rk6E.nlQ0MCZmtOtbcRu0K6suKYULNhJV0Lm',NULL,'2026-02-03 09:58:08','2026-02-03 09:58:08'),(3,'Marielle Hirthe','schuyler.kihn@example.net',NULL,'$2y$12$Y6Kb.1ULipiqhpfKWN0cOOKuOdwGqwDSrvjxIeOye1lDAbMbdsDtW',NULL,'2026-02-03 09:58:08','2026-02-03 09:58:08'),(4,'Jakob Gibson','ewisozk@example.org',NULL,'$2y$12$TVIXSxqvsJBjmjRq7Ri1i.Iw3QZ61fwH2y/EL5sFLmXNCmAdcHg0m',NULL,'2026-02-03 09:58:09','2026-02-03 09:58:09'),(5,'Edwin Ruecker','cletus41@example.net',NULL,'$2y$12$YPI6ir9TnriiZ/uAUYKpqOAbTSbVKUVdPY/uPgkL2YJ6k2nNNY4TC',NULL,'2026-02-03 09:58:09','2026-02-03 09:58:09'),(6,'Daisha Williamson','alexandro.feeney@example.org',NULL,'$2y$12$s7COcFYNdSIg6ZdiPfofFuho7uqN4mkI1Fg4AZj1MIkds8BDbRjk.',NULL,'2026-02-03 09:58:09','2026-02-03 09:58:09'),(7,'Miss Brionna Hoppe','hamill.marlene@example.net',NULL,'$2y$12$hoh7./YqypOpkuyTHQXis.wDGelunbllY53ZV4FuFryEGju4OqWAC',NULL,'2026-02-03 09:58:10','2026-02-03 09:58:10'),(8,'Molly Emard','casper.sylvia@example.net',NULL,'$2y$12$yhtDcGBDsgGcSIYB44NJEeqwaTrbCx5KGxd1fvXcf9G2oPrRM5WJi',NULL,'2026-02-03 09:58:10','2026-02-03 09:58:10'),(9,'Bettye Roob','wilderman.rachael@example.org',NULL,'$2y$12$OGv24qzu0RS77i74ASVQcOLnB7Sen5zagPG4g.VPXjw2bcYpq.c7W',NULL,'2026-02-03 09:58:10','2026-02-03 09:58:10'),(10,'Roberta Oberbrunner II','lemke.kailyn@example.org',NULL,'$2y$12$qwYzEw0utmU1K5WGeS0k5O3V6APGEnwffuH66paXVPgy6O8L9ksl.',NULL,'2026-02-03 09:58:11','2026-02-03 09:58:11'),(11,'Dr. Keegan Kilback Jr.','hansen.lauriane@example.com',NULL,'$2y$12$VMSQabgQ/GrVW.QaAkigFuFUsnF/fDC6Ow9PpNJJWEW.BH6a582bW',NULL,'2026-02-03 09:58:11','2026-02-03 09:58:11'),(12,'Rusty Koepp','boris.gerhold@example.com',NULL,'$2y$12$k9fj6an2PQYTtz2ngpisJ.ekWXkvy2EzuxrXYR5ddymRMJJ5er3xu',NULL,'2026-02-03 09:58:11','2026-02-03 09:58:11'),(13,'Olaf Skiles','doyle.araceli@example.org',NULL,'$2y$12$kv3XcnuyVzgDGR4nCYErre3ftGJjQm9X3dZPS7hlsB80t0dIxWWMa',NULL,'2026-02-03 09:58:12','2026-02-03 09:58:12'),(14,'Christine Roberts MD','rocio80@example.org',NULL,'$2y$12$1ppBGsvSX0gdg8bt/KCinO/ecr6eUO5CLqQF0bdrO1sFjwNgCsSHG',NULL,'2026-02-03 09:58:12','2026-02-03 09:58:12'),(15,'Lucas Bauch','shields.corine@example.net',NULL,'$2y$12$4Z3Okv8UChX97VZcq4fQ8uV.0z9BV.OCQWUkljwsa8mnBmkrc.6MG',NULL,'2026-02-03 09:58:12','2026-02-03 09:58:12'),(16,'Dustin Davis','tbergnaum@example.com',NULL,'$2y$12$f/p/qJP9rhC5bwEG2KhtSuWY9DcbmsVYf0R.OLYwN0rnuCU7FVg0y',NULL,'2026-02-03 09:58:13','2026-02-03 09:58:13'),(17,'Prof. Isaiah Hills III','adrian.kovacek@example.com',NULL,'$2y$12$u2wAgqRIInRJ36vz3pYo8./BXT.TbKhQIY8byKSIJcH1P9miwLU0u',NULL,'2026-02-03 09:58:13','2026-02-03 09:58:13'),(18,'Buford Windler','florencio.huel@example.com',NULL,'$2y$12$KOxiRnWscxsRUs3Q4/Qau.V0QB1Lgsehr1v8Bc3jZa.DOkiU.Wnuq',NULL,'2026-02-03 09:58:13','2026-02-03 09:58:13');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-04 12:27:00
