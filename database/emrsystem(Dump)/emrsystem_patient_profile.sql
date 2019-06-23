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
-- Table structure for table `patient_profile`
--

DROP TABLE IF EXISTS `patient_profile`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `patient_profile` (
  `patient_healthcard` varchar(15) NOT NULL,
  `patient_firstname` varchar(100) NOT NULL DEFAULT '',
  `patient_lastname` varchar(100) NOT NULL DEFAULT '',
  `patient_street` varchar(100) NOT NULL DEFAULT '',
  `patient_contact` varchar(15) NOT NULL DEFAULT '',
  `patient_DOB` varchar(45) NOT NULL,
  `patient_city` varchar(100) DEFAULT NULL,
  `patient_province` varchar(100) DEFAULT NULL,
  `patient_postalcode` varchar(45) DEFAULT NULL,
  `patient_email` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`patient_healthcard`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_profile`
--

LOCK TABLES `patient_profile` WRITE;
/*!40000 ALTER TABLE `patient_profile` DISABLE KEYS */;
INSERT INTO `patient_profile` VALUES ('1111-111-111','Tod','Peters','123 Neverland','6478879888','05/05/2015','toronto','Ontario','m2n3a3','tpeters@seneca.com'),('1111-222-333','Alan','Poet','2345 Seneca Drive','4168888888','12/12/2012','Toronto','Ontario','m3l1a5','alan@york.com'),('1234-567-890','Johnny','Doet','52 Downunder','4166978526','12/01/2001','toronto','Ontario','m3r5th','john@john.com'),('4444-444-444','Ray','Nolds','123 Somewhere','4169778521','06/02/2000','toronto','Ontario','m3l5r5','test@test.com'),('5555-555-555','Tess','Rose','89 Just There Rd','4169707245','02/05/2001','Toronto','Ontario','m3l1z4','harford_ryan@yahoo.com');
/*!40000 ALTER TABLE `patient_profile` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-22 21:00:25
