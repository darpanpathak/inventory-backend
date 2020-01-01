# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.18)
# Database: rewaa_inventory
# Generation Time: 2020-01-01 15:22:18 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table DB_Categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `DB_Categories`;

CREATE TABLE `DB_Categories` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category` varchar(128) DEFAULT NULL,
  `description` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `DB_Categories` WRITE;
/*!40000 ALTER TABLE `DB_Categories` DISABLE KEYS */;

INSERT INTO `DB_Categories` (`id`, `category`, `description`)
VALUES
	(1,'Category 1','Category 1 description'),
	(2,'Category 2','Category 2 description\n'),
	(3,'Category 3','Category 3 description');

/*!40000 ALTER TABLE `DB_Categories` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table DB_Products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `DB_Products`;

CREATE TABLE `DB_Products` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(128) DEFAULT NULL,
  `description` text,
  `category` int(11) unsigned DEFAULT NULL,
  `price` decimal(18,2) DEFAULT NULL,
  `isSoftDeleted` tinyint(1) DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category` (`category`),
  CONSTRAINT `db_products_ibfk_1` FOREIGN KEY (`category`) REFERENCES `DB_Categories` (`id`),
  CONSTRAINT `db_products_ibfk_2` FOREIGN KEY (`category`) REFERENCES `DB_Categories` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `DB_Products` WRITE;
/*!40000 ALTER TABLE `DB_Products` DISABLE KEYS */;

INSERT INTO `DB_Products` (`id`, `name`, `description`, `category`, `price`, `isSoftDeleted`, `createdAt`, `updatedAt`)
VALUES
	(1,'product 1','product 1 description',1,233.00,0,'2020-01-01 20:22:28',NULL),
	(2,'product 2','product description 2',1,324.00,0,'2020-01-01 20:38:32',NULL),
	(3,'product 3','Product description 3',3,765.00,0,'2020-01-01 20:39:15',NULL);

/*!40000 ALTER TABLE `DB_Products` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table DB_Users
# ------------------------------------------------------------

DROP TABLE IF EXISTS `DB_Users`;

CREATE TABLE `DB_Users` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `fullName` varchar(128) DEFAULT NULL,
  `email` varchar(128) DEFAULT NULL,
  `password` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `DB_Users` WRITE;
/*!40000 ALTER TABLE `DB_Users` DISABLE KEYS */;

INSERT INTO `DB_Users` (`id`, `fullName`, `email`, `password`)
VALUES
	(1,'darpan','pathakdarpan77@gmail.com','$2b$10$wZIBqK1s9mEuN69Y68nTUubZoA3iJpK8hmcy6mjFmB/zsUA1df21u');

/*!40000 ALTER TABLE `DB_Users` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
