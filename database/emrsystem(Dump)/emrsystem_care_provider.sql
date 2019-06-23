-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: emrsystem
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `care_provider`
--

DROP TABLE IF EXISTS `care_provider`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `care_provider` (
  `careprovider_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `careprovider_firstname` varchar(100) NOT NULL DEFAULT '',
  `careprovider_lastname` varchar(100) NOT NULL DEFAULT '',
  `careprovider_username` varchar(10) NOT NULL DEFAULT '',
  `careprovider_password` text NOT NULL,
  `is_super_admin_user` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`careprovider_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `care_provider`
--

LOCK TABLES `care_provider` WRITE;
/*!40000 ALTER TABLE `care_provider` DISABLE KEYS */;
INSERT INTO `care_provider` VALUES (2,'Rai','Legaspi','Railegaspi','$2b$10$aCaNGKDk1xeWwKuqAyMK9Om9tn.hhiMc2iYXNYnw6ozQqK8klsjfa',1),(3,'Jen','Beltaran','jen','$2b$10$zfwqnXig0s3iw19pbAYxieYVD3p5DYG27VB9YthpVdPU6LHfvDA3W',0);
/*!40000 ALTER TABLE `care_provider` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-22 21:00:21
