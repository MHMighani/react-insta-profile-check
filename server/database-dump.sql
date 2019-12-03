-- Host: localhost    Database: profile_info_db
-- ------------------------------------------------------
-- Server version	5.7.28-0ubuntu0.18.04.4

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bio_history`
--

DROP TABLE IF EXISTS `bio_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bio_history` (
  `history_id` int(11) NOT NULL AUTO_INCREMENT,
  `bio_text` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_modified` date NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`history_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `bio_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `insta_profile_info` (`profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bio_history`
--

LOCK TABLES `bio_history` WRITE;
/*!40000 ALTER TABLE `bio_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `bio_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `full_name_history`
--

DROP TABLE IF EXISTS `full_name_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `full_name_history` (
  `history_id` int(11) NOT NULL AUTO_INCREMENT,
  `full_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `date_modified` date NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`history_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `full_name_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `insta_profile_info` (`profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `full_name_history`
--

LOCK TABLES `full_name_history` WRITE;
/*!40000 ALTER TABLE `full_name_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `full_name_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insta_profile_info`
--

DROP TABLE IF EXISTS `insta_profile_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `insta_profile_info` (
  `profile_id` bigint(20) NOT NULL,
  `username` varchar(20) COLLATE utf8mb4_persian_ci NOT NULL,
  `full_name` varchar(25) COLLATE utf8mb4_persian_ci DEFAULT NULL,
  `is_private` tinyint(1) DEFAULT NULL,
  `profile_pic_url` varchar(300) COLLATE utf8mb4_persian_ci NOT NULL,
  `num_following` int(11) DEFAULT NULL,
  `num_followers` int(11) DEFAULT NULL,
  `biography` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`profile_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_persian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insta_profile_info`
--

LOCK TABLES `insta_profile_info` WRITE;
/*!40000 ALTER TABLE `insta_profile_info` DISABLE KEYS */;
/*!40000 ALTER TABLE `insta_profile_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profile_image_history`
--

DROP TABLE IF EXISTS `profile_image_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profile_image_history` (
  `history_id` int(11) NOT NULL AUTO_INCREMENT,
  `image_number` varchar(200) DEFAULT NULL,
  `date_modified` date NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`history_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `profile_image_history_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `insta_profile_info` (`profile_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profile_image_history`
--

LOCK TABLES `profile_image_history` WRITE;
/*!40000 ALTER TABLE `profile_image_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `profile_image_history` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-03 20:27:34
