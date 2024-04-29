/*
SQLyog Ultimate v13.1.1 (64 bit)
MySQL - 10.4.32-MariaDB : Database - cafeteriadb
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`cafeteriadb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;

USE `cafeteriadb`;

/*Table structure for table `categorias` */

DROP TABLE IF EXISTS `categorias`;

CREATE TABLE `categorias` (
  `Id_Cat` varchar(11) NOT NULL,
  `Nom_Cat` varchar(255) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`Id_Cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `categorias` */

insert  into `categorias`(`Id_Cat`,`Nom_Cat`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('1','Circuitos 1',0,NULL,'2024-04-20 22:01:58'),
('10','desarrollo web',1,'2024-04-18 22:37:38','2024-04-18 22:37:38'),
('11','IA2',0,'2024-04-19 01:27:37','2024-04-20 20:04:56'),
('13','desarrollo web 2',1,'2024-04-20 19:56:47','2024-04-20 19:56:47'),
('14','sin categoria',1,'2024-04-20 16:53:23','2024-04-20 16:53:24'),
('2','programacion',1,'2024-03-21 01:48:47','2024-03-21 01:48:47'),
('9','destornilladores',1,'2024-04-04 15:02:12','2024-04-04 15:02:12'),
('hle1ffd7wlv','materiales',1,'2024-04-22 15:19:48','2024-04-22 15:19:48');

/*Table structure for table `detalles` */

DROP TABLE IF EXISTS `detalles`;

CREATE TABLE `detalles` (
  `Id_Detalle` varchar(100) NOT NULL,
  `Id_Enc_FK` varchar(100) DEFAULT NULL,
  `cantidad` int(100) DEFAULT NULL,
  `Precio_U` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `Id_Prod_Fk` varchar(100) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Detalle`),
  KEY `Id_Enc_FK` (`Id_Enc_FK`),
  KEY `Id_Prod_Fk` (`Id_Prod_Fk`),
  CONSTRAINT `detalles_ibfk_1` FOREIGN KEY (`Id_Enc_FK`) REFERENCES `encabezados` (`ENC_ID`),
  CONSTRAINT `detalles_ibfk_2` FOREIGN KEY (`Id_Prod_Fk`) REFERENCES `productos` (`PROD_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `detalles` */

insert  into `detalles`(`Id_Detalle`,`Id_Enc_FK`,`cantidad`,`Precio_U`,`total`,`Id_Prod_Fk`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('erxyjd35klvl0tbld','erxyjd35klvl0tbkq',4,5000.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-29 13:54:16','2024-04-29 13:54:16'),
('erxyjd35klvl0tble','erxyjd35klvl0tbkq',4,5000.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-29 13:54:16','2024-04-29 13:54:16'),
('erxyjd40lvd1itnt','erxyjd40lvd1itmf',2,1300.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-23 23:51:56','2024-04-23 23:51:56'),
('erxyjd654lvea62ee','erxyjd654lvea62dw',2,1300.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-24 20:41:44','2024-04-24 20:41:44'),
('erxyjd8pclvd1gyop','erxyjd8pclvd1gyna',2,1300.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-23 23:50:29','2024-04-23 23:50:29'),
('erxyjd8z8lvliuid2','erxyjd8z8lvliuic0',1,5000.00,NULL,'342324dsfedsf23dd',1,'2024-04-29 22:19:04','2024-04-29 22:19:04'),
('erxyjd8z8lvliuid3','erxyjd8z8lvliuic0',4,5000.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-29 22:19:04','2024-04-29 22:19:04'),
('erxyjd8z8lvlivbi6','erxyjd8z8lvlivbhi',1,5000.00,NULL,'342324dsfedsf23dd',1,'2024-04-29 22:19:42','2024-04-29 22:19:42'),
('erxyjd8z8lvlivbi7','erxyjd8z8lvlivbhi',4,5000.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-29 22:19:42','2024-04-29 22:19:42'),
('erxyjd93klvd2m5wp','erxyjd93klvd2m5vm',2,1300.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-24 00:22:32','2024-04-24 00:22:32'),
('erxyjd93klvd2nroe','erxyjd93klvd2nrnh',2,1300.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-24 00:23:46','2024-04-24 00:23:46'),
('erxyjd9aolvl1931d','erxyjd9aolvl19306',4,5000.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-29 14:06:31','2024-04-29 14:06:31'),
('erxyjd9aolvl1931e','erxyjd9aolvl19306',4,5000.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-29 14:06:31','2024-04-29 14:06:31'),
('erxyjd9aolvl19o5v','erxyjd9aolvl19o55',4,5000.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-29 14:06:58','2024-04-29 14:06:58'),
('erxyjd9aolvl19o5w','erxyjd9aolvl19o55',4,5000.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-29 14:06:58','2024-04-29 14:06:58'),
('erxyjd9aolvl1cq59','erxyjd9aolvl1cq4u',4,5000.00,NULL,'342324dsfedsf23dd',1,'2024-04-29 14:09:21','2024-04-29 14:09:21'),
('erxyjd9aolvl1cq5a','erxyjd9aolvl1cq4u',4,5000.00,NULL,'342324dsfedsf23dd',1,'2024-04-29 14:09:21','2024-04-29 14:09:21'),
('erxyjd9aolvl1d7bp','erxyjd9aolvl1d7b0',4,5000.00,NULL,'342324dsfedsf23dd',1,'2024-04-29 14:09:43','2024-04-29 14:09:43'),
('erxyjd9aolvl1d7bq','erxyjd9aolvl1d7b0',2,5000.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-29 14:09:43','2024-04-29 14:09:43'),
('erxyjd9aolvl1dw9c','erxyjd9aolvl1dw8r',1,5000.00,NULL,'342324dsfedsf23dd',1,'2024-04-29 14:10:16','2024-04-29 14:10:16'),
('erxyjd9aolvl1dw9d','erxyjd9aolvl1dw8r',1,5000.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-29 14:10:16','2024-04-29 14:10:16'),
('erxyjd9bklvl0vwdw','erxyjd9bklvl0vwcu',4,5000.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-29 13:56:16','2024-04-29 13:56:16'),
('erxyjd9bklvl0vwdx','erxyjd9bklvl0vwcu',4,5000.00,NULL,'erxyjd2e0lvcz71qg',1,'2024-04-29 13:56:16','2024-04-29 13:56:16');

/*Table structure for table `encabezados` */

DROP TABLE IF EXISTS `encabezados`;

CREATE TABLE `encabezados` (
  `ENC_ID` varchar(100) NOT NULL,
  `FECH_ENC` date DEFAULT NULL,
  `MET_PAGO` char(1) DEFAULT NULL COMMENT '1: efectivo, 2: pse',
  `TOTAL` decimal(10,2) DEFAULT NULL,
  `ID_USER_FK` varchar(100) DEFAULT NULL,
  `TIPO_ENCABE` char(1) DEFAULT NULL COMMENT '1: compra, 2:venta',
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`ENC_ID`),
  KEY `Id_User_FK` (`ID_USER_FK`),
  CONSTRAINT `encabezados_ibfk_2` FOREIGN KEY (`ID_USER_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `encabezados` */

insert  into `encabezados`(`ENC_ID`,`FECH_ENC`,`MET_PAGO`,`TOTAL`,`ID_USER_FK`,`TIPO_ENCABE`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('erxyjd35klvl0tbkq','2024-04-29','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-29 13:54:16','2024-04-29 13:54:16'),
('erxyjd40lvd1itmf','2024-04-23','1',111111.00,'erxyjd1aclv5t60t8','2',1,'2024-04-23 23:51:56','2024-04-23 23:51:56'),
('erxyjd57olvl0ytum','2024-04-29','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-29 13:58:33','2024-04-29 13:58:33'),
('erxyjd654lvea62dw','2024-04-24','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-24 20:41:44','2024-04-24 20:41:44'),
('erxyjd8pclvd1gyna','2024-04-23','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-23 23:50:29','2024-04-23 23:50:29'),
('erxyjd8wklvl116ar','2024-04-29','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-29 14:00:22','2024-04-29 14:00:22'),
('erxyjd8x0lvl10l5c','2024-04-29','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-29 13:59:55','2024-04-29 13:59:55'),
('erxyjd8z8lvliuic0','2024-04-29','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-29 22:19:04','2024-04-29 22:19:04'),
('erxyjd8z8lvlivbhi','2024-04-29','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-29 22:19:42','2024-04-29 22:19:42'),
('erxyjd93klvd2m5vm','2024-04-24','1',111111.00,'erxyjd1aclv5t60t8','2',1,'2024-04-24 00:22:32','2024-04-24 00:22:32'),
('erxyjd93klvd2nrnh','2024-04-24','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-24 00:23:46','2024-04-24 00:23:46'),
('erxyjd9aolvl19306','2024-04-29','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-29 14:06:31','2024-04-29 14:06:31'),
('erxyjd9aolvl19o55','2024-04-29','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-29 14:06:58','2024-04-29 14:06:58'),
('erxyjd9aolvl1cq4u','2024-04-29','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-29 14:09:21','2024-04-29 14:09:21'),
('erxyjd9aolvl1d7b0','2024-04-29','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-29 14:09:43','2024-04-29 14:09:43'),
('erxyjd9aolvl1dw8r','2024-04-29','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-29 14:10:16','2024-04-29 14:10:16'),
('erxyjd9bklvl0vwcu','2024-04-29','1',111111.00,'erxyjd1aclv5t60t8','1',1,'2024-04-29 13:56:16','2024-04-29 13:56:16');

/*Table structure for table `existencias` */

DROP TABLE IF EXISTS `existencias`;

CREATE TABLE `existencias` (
  `EX_ID` int(255) NOT NULL AUTO_INCREMENT,
  `PRO_ID_FK` varchar(100) NOT NULL,
  `INV_ID_FK` varchar(100) NOT NULL,
  `ESTADO_REGISTRO` int(1) NOT NULL,
  `ID_LOTE_FK` varchar(100) DEFAULT NULL,
  `CANT_PROD` int(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`EX_ID`),
  KEY `PRO_ID_FK` (`PRO_ID_FK`),
  KEY `INV_ID_FK` (`INV_ID_FK`),
  KEY `ID_LOTE_FK` (`ID_LOTE_FK`),
  CONSTRAINT `existencias_ibfk_1` FOREIGN KEY (`PRO_ID_FK`) REFERENCES `productos` (`PROD_ID`),
  CONSTRAINT `existencias_ibfk_2` FOREIGN KEY (`INV_ID_FK`) REFERENCES `inventarios` (`INV_ID`),
  CONSTRAINT `existencias_ibfk_3` FOREIGN KEY (`ID_LOTE_FK`) REFERENCES `lotes` (`ID_LOTE`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `existencias` */

insert  into `existencias`(`EX_ID`,`PRO_ID_FK`,`INV_ID_FK`,`ESTADO_REGISTRO`,`ID_LOTE_FK`,`CANT_PROD`,`createdAt`,`updatedAt`) values 
(2,'342324dsfedsf23dd','1',1,'1333',2,'2024-04-29 09:08:59','2024-04-29 22:19:42'),
(3,'erxyjd2e0lvcz71qg','1',1,'1333',8,'2024-04-23 22:46:48','2024-04-29 22:19:42');

/*Table structure for table `facturas` */

DROP TABLE IF EXISTS `facturas`;

CREATE TABLE `facturas` (
  `FACT_ID` varchar(100) NOT NULL,
  `FACT_FECH` date NOT NULL,
  `ID_EMPLEADO` varchar(100) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`FACT_ID`),
  KEY `ID_EMPLEADO` (`ID_EMPLEADO`),
  CONSTRAINT `facturas_ibfk_4` FOREIGN KEY (`ID_EMPLEADO`) REFERENCES `usuarios` (`Id_User`),
  CONSTRAINT `facturas_ibfk_5` FOREIGN KEY (`FACT_ID`) REFERENCES `encabezados` (`ENC_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `facturas` */

insert  into `facturas`(`FACT_ID`,`FACT_FECH`,`ID_EMPLEADO`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('erxyjd40lvd1itmf','2024-04-24','hle1ffcmolul8uo6n',1,'2024-04-24 19:34:30','2024-04-24 19:34:30'),
('erxyjd8z8lvliuic0','2024-04-29','hle1ffcmolul8uo6n',1,'2024-04-29 22:19:04','2024-04-29 22:19:04'),
('erxyjd8z8lvlivbhi','2024-04-29','hle1ffcmolul8uo6n',1,'2024-04-29 22:19:42','2024-04-29 22:19:42');

/*Table structure for table `inventarios` */

DROP TABLE IF EXISTS `inventarios`;

CREATE TABLE `inventarios` (
  `INV_ID` varchar(100) NOT NULL,
  `CANT_TOTAL` int(11) DEFAULT NULL,
  `INV_EST` char(1) DEFAULT NULL COMMENT 'S:STOK, A:AGOTADO, R:RESERVADO',
  `ESTADO_REGISTRO` int(1) DEFAULT NULL COMMENT '1:ACTIVO, 0:ELIMINADO',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`INV_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `inventarios` */

insert  into `inventarios`(`INV_ID`,`CANT_TOTAL`,`INV_EST`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('1',10,'S',1,'2024-04-23 16:39:46','2024-04-29 22:19:42');

/*Table structure for table `localizacions` */

DROP TABLE IF EXISTS `localizacions`;

CREATE TABLE `localizacions` (
  `Id_Loc` int(11) NOT NULL AUTO_INCREMENT,
  `Dir_Ip` varchar(255) DEFAULT NULL,
  `Id_User_FK` varchar(100) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Loc`),
  KEY `Id_User_FK` (`Id_User_FK`),
  CONSTRAINT `localizacions_ibfk_1` FOREIGN KEY (`Id_User_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=451 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `localizacions` */

insert  into `localizacions`(`Id_Loc`,`Dir_Ip`,`Id_User_FK`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
(50,'192.168.9.1','erxyjd7a4lv603r9h',1,'2024-04-04 12:59:33','2024-04-19 18:09:43'),
(434,'192.168.0.1','hle1ffcmolul8uo6n',0,'2024-04-04 11:02:49','2024-04-04 16:09:19'),
(435,'192.168.0.1','erxyjd1aclv5t60t8',1,'2024-04-18 22:23:39','2024-04-18 22:23:39'),
(437,'192.168.0.1','erxyjd7a4lv603r9h',1,'2024-04-19 01:37:50','2024-04-19 01:37:50'),
(438,'192.168.0.5','erxyjd7a4lv603r9h',1,'2024-04-19 01:51:07','2024-04-19 01:51:07'),
(439,'192.168.9.1','erxyjd7a4lv603r9h',1,'2024-04-19 17:48:04','2024-04-19 17:48:04'),
(448,'192.168.0.1','erxyjd7qclv8xqy8e',1,'2024-04-21 02:55:12','2024-04-21 02:55:12'),
(449,'192.168.0.1','hle1ffd7wlvb3m6ud',1,'2024-04-22 15:15:00','2024-04-22 15:15:00'),
(450,'192.168.0.51','hle1ffd7wlvb3m6ud',1,'2024-04-22 15:17:40','2024-04-22 15:17:40');

/*Table structure for table `lotes` */

DROP TABLE IF EXISTS `lotes`;

CREATE TABLE `lotes` (
  `ID_LOTE` varchar(100) NOT NULL,
  `COD_LOTE` varchar(100) NOT NULL,
  `FEC_REC` date NOT NULL,
  `FEC_VENC` date NOT NULL,
  `ESTADO_REGISTRO` int(1) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`ID_LOTE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `lotes` */

insert  into `lotes`(`ID_LOTE`,`COD_LOTE`,`FEC_REC`,`FEC_VENC`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('1333','2233','2024-04-23','2024-04-27',1,NULL,NULL);

/*Table structure for table `productos` */

DROP TABLE IF EXISTS `productos`;

CREATE TABLE `productos` (
  `PROD_ID` varchar(100) NOT NULL,
  `PROD_COD` varchar(100) DEFAULT NULL,
  `PROD_NOM` varchar(100) DEFAULT NULL,
  `PROD_DESC` text DEFAULT NULL,
  `PROD_PREC` decimal(10,2) DEFAULT NULL,
  `CAT_ID_FK` varchar(100) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`PROD_ID`),
  KEY `categoria_idFK` (`CAT_ID_FK`),
  CONSTRAINT `productos_ibfk_1` FOREIGN KEY (`CAT_ID_FK`) REFERENCES `categorias` (`Id_Cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `productos` */

insert  into `productos`(`PROD_ID`,`PROD_COD`,`PROD_NOM`,`PROD_DESC`,`PROD_PREC`,`CAT_ID_FK`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('342324dsfedsf23dd','1213','PAN','PAQUETE PANES X30',5000.00,'13',1,'2024-04-29 09:08:18','2024-04-29 09:08:21'),
('erxyjd2e0lvcz71qg','343','GASEOSA','GASEOSA 1L SABOR UVA',1000.00,'hle1ffd7wlv',1,'2024-04-23 22:46:47','2024-04-23 22:46:47');

/*Table structure for table `proveedor_productos` */

DROP TABLE IF EXISTS `proveedor_productos`;

CREATE TABLE `proveedor_productos` (
  `Id_Prov_Prod` varchar(100) NOT NULL,
  `Id_Prov_FK` varchar(100) DEFAULT NULL,
  `Id_Prod_FK` varchar(100) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `UpdatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Prov_Prod`),
  KEY `Id_Prov_FK` (`Id_Prov_FK`),
  KEY `Id_Prod_FK` (`Id_Prod_FK`),
  CONSTRAINT `proveedor_productos_ibfk_1` FOREIGN KEY (`Id_Prov_FK`) REFERENCES `proveedors` (`PROV_ID`),
  CONSTRAINT `proveedor_productos_ibfk_2` FOREIGN KEY (`Id_Prod_FK`) REFERENCES `productos` (`PROD_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `proveedor_productos` */

insert  into `proveedor_productos`(`Id_Prov_Prod`,`Id_Prov_FK`,`Id_Prod_FK`,`ESTADO_REGISTRO`,`createdAt`,`UpdatedAt`) values 
('erxyjd2e0lvcz71rs','erxyjd744lvcyzfdc','erxyjd2e0lvcz71qg',1,'2024-04-23 22:46:47','2024-04-23 22:46:47');

/*Table structure for table `proveedors` */

DROP TABLE IF EXISTS `proveedors`;

CREATE TABLE `proveedors` (
  `PROV_ID` varchar(100) NOT NULL,
  `PROV_NOM` varchar(30) DEFAULT NULL,
  `PROV_CONTACTO` varchar(100) DEFAULT NULL,
  `PROV_EST` char(1) DEFAULT NULL COMMENT '1:ACTIVO, 2 INACTIVO, 3:SUSPENDIDO',
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`PROV_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `proveedors` */

insert  into `proveedors`(`PROV_ID`,`PROV_NOM`,`PROV_CONTACTO`,`PROV_EST`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('erxyjd744lvcyzfdc','coca cola','coca_cola@gmail.com','A',1,'2024-04-23 22:40:52','2024-04-23 22:40:52');

/*Table structure for table `roles` */

DROP TABLE IF EXISTS `roles`;

CREATE TABLE `roles` (
  `Id_Rol` int(11) NOT NULL AUTO_INCREMENT,
  `Nom_Rol` varchar(255) DEFAULT NULL,
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Rol`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `roles` */

insert  into `roles`(`Id_Rol`,`Nom_Rol`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
(1,'Admin',1,'2024-04-20 18:01:26','2024-04-20 18:01:27'),
(2,'Empleado',1,'2024-04-20 18:01:29','2024-04-20 18:01:34'),
(3,'Cliente',1,NULL,'2024-03-21 00:34:44'),
(4,'No_Rol',1,'2024-04-20 18:01:04','2024-04-20 18:01:06'),
(9,'mamaweb0',1,'2024-04-19 02:55:47','2024-04-19 02:56:59'),
(10,'lolla',0,'2024-04-20 23:03:23','2024-04-20 23:16:25');

/*Table structure for table `tokens` */

DROP TABLE IF EXISTS `tokens`;

CREATE TABLE `tokens` (
  `Id_Token` int(255) NOT NULL AUTO_INCREMENT,
  `Token` text DEFAULT NULL,
  `Fec_Caducidad` varchar(100) DEFAULT NULL,
  `User_Id_FK` varchar(100) DEFAULT NULL,
  `Tipo_token` char(1) DEFAULT NULL COMMENT '1: inicio Sesion, 2: verificacion Email, 3: recuperacion de contraseña, 4: Verificar IP',
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_Token`),
  KEY `Usuario_Id` (`User_Id_FK`),
  CONSTRAINT `tokens_ibfk_1` FOREIGN KEY (`User_Id_FK`) REFERENCES `usuarios` (`Id_User`)
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `tokens` */

insert  into `tokens`(`Id_Token`,`Token`,`Fec_Caducidad`,`User_Id_FK`,`Tipo_token`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
(11,'576627','1712236173','hle1ffcmolul8uo6n','1',1,'2024-04-04 12:59:33','2024-04-04 12:59:33'),
(12,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyMjM1NTgzLCJleHAiOjE3MTIzMjE5ODN9.N','1712321983','hle1ffcmolul8uo6n','2',1,'2024-04-04 12:59:43','2024-04-04 12:59:43'),
(13,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEyMjM1NjMzLCJleHAiOjE3MTIzMjIwMzN9.5','1712322033','hle1ffcmolul8uo6n','2',1,'2024-04-04 13:00:33','2024-04-04 13:00:33'),
(14,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNDc2MDIxLCJleHAiOjE3MTM1NjI0MjF9._','1713562421','hle1ffcmolul8uo6n','2',1,'2024-04-18 21:33:41','2024-04-18 21:33:41'),
(20,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNDc5NjU2LCJleHAiOjE3MTM1NjYwNTZ9.W','1713566056','hle1ffcmolul8uo6n','2',1,'2024-04-18 22:34:16','2024-04-18 22:34:16'),
(21,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNDc5NzM0LCJleHAiOjE3MTM1NjYxMzR9.-','1713566134','hle1ffcmolul8uo6n','2',1,'2024-04-18 22:35:34','2024-04-18 22:35:34'),
(23,'049548','1713491270','erxyjd7a4lv603r9h','1',1,'2024-04-19 01:37:50','2024-04-19 01:37:50'),
(24,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNDkxMTA2LCJleHAiOjE3MTM1Nzc1MDZ9.Q','1713577506','hle1ffcmolul8uo6n','2',1,'2024-04-19 01:45:06','2024-04-19 01:45:06'),
(25,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQ3YTRsdjYwM3I5aCIsIk5vbV9Vc2VyIjoiSmFpcm8iLCJBcGVfVXNlciI6IkRlIGF2aWxhIiwiRW1hX1VzZXIiOiJqb3NlY29ydGVzYW5kcmFkZTQxQGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6M30sImlhdCI6MTcxMzQ5MTEzMSwiZXhwIjoxNz','1713577531','erxyjd7a4lv603r9h','2',1,'2024-04-19 01:45:31','2024-04-19 01:45:31'),
(26,'387626','1713491848','erxyjd7a4lv603r9h','3',1,'2024-04-19 01:47:28','2024-04-19 01:47:28'),
(27,'841339','1713493342','hle1ffcmolul8uo6n','3',1,'2024-04-19 02:12:22','2024-04-19 02:12:22'),
(28,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNDkyNzQ2LCJleHAiOjE3MTM1NzkxNDZ9.g','1713579146','hle1ffcmolul8uo6n','2',1,'2024-04-19 02:12:26','2024-04-19 02:12:26'),
(29,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxYWNsdjV0NjB0OCIsIk5vbV9Vc2VyIjoiQW5kcmVhIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoid2lyb0BnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjN9LCJpYXQiOjE3MTM0OTQ0NTcsImV4cCI6MTcxMzU4MDg1N30.E1RCKkFm0l','1713580857','erxyjd1aclv5t60t8','1',1,'2024-04-19 02:40:57','2024-04-19 02:40:57'),
(30,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJlcnh5amQxYWNsdjV0NjB0OCIsIk5vbV9Vc2VyIjoiQW5kcmVhIiwiQXBlX1VzZXIiOiJwZXJleiIsIkVtYV9Vc2VyIjoid2lyb0BnbWFpbC5jb20iLCJJZF9Sb2xfRksiOjN9LCJpYXQiOjE3MTM0OTQ0ODcsImV4cCI6MTcxMzU4MDg4N30.DThE5pj_2P','1713580887','erxyjd1aclv5t60t8','1',1,'2024-04-19 02:41:27','2024-04-19 02:41:27'),
(31,'227611','1713495098','hle1ffcmolul8uo6n','1',0,'2024-04-19 02:41:38','2024-04-20 22:49:52'),
(32,'789665','1713556172','hle1ffcmolul8uo6n','3',0,'2024-04-19 19:39:32','2024-04-20 23:01:44'),
(33,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNTU1ODMyLCJleHAiOjE3MTM2NDIyMzJ9.v','1713642232','hle1ffcmolul8uo6n','2',1,'2024-04-19 19:43:52','2024-04-19 19:43:52'),
(34,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNTY2NjMwLCJleHAiOjE3MTM2NTMwMzB9.i','1713653030','hle1ffcmolul8uo6n','2',1,'2024-04-19 22:43:50','2024-04-19 22:43:50'),
(35,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNjI1OTI1LCJleHAiOjE3MTM3MTIzMjV9.L','1713712325','hle1ffcmolul8uo6n','2',1,'2024-04-20 15:12:05','2024-04-20 15:12:05'),
(44,'715727','1713668712','erxyjd7qclv8xqy8e','1',1,'2024-04-21 02:55:12','2024-04-21 02:55:12'),
(45,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNzkwNTgzLCJleHAiOjE3MTM4NzY5ODN9.0hqxe5TQVSxrg_bZy1v90Ks0C-rzxc6vlhCQlxldzfw','1713876983','hle1ffcmolul8uo6n','2',1,'2024-04-22 12:56:23','2024-04-22 12:56:23'),
(46,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNzkxOTE2LCJleHAiOjE3MTM4NzgzMTZ9.w3_78-8RYnQX2uhH3GDhRYpqDbBOSBzAqZ4s5Fs2a4M','1713878316','hle1ffcmolul8uo6n','2',1,'2024-04-22 13:18:36','2024-04-22 13:18:36'),
(47,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNzkxOTM1LCJleHAiOjE3MTM4NzgzMzV9.RwihRdqDUcIvkoukf2W6-6PeizjW5IrVGH0OhApt7B0','1713878335','hle1ffcmolul8uo6n','2',1,'2024-04-22 13:18:55','2024-04-22 13:18:55'),
(48,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNzkyMTUwLCJleHAiOjE3MTM4Nzg1NTB9.pEX7T2nxZs-kp_AgvOl6U0wIbVj0EaL1agZ2qqsf650','1713878550','hle1ffcmolul8uo6n','2',1,'2024-04-22 13:22:30','2024-04-22 13:22:30'),
(49,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzNzk4ODA5LCJleHAiOjE3MTM4ODUyMDl9.69zmBY7NxNHIESCTzBWYbZW0WM9qSGr8kfHK9vlzTyc','1713885209','hle1ffcmolul8uo6n','2',1,'2024-04-22 15:13:29','2024-04-22 15:13:29'),
(50,'265008','1713799500','hle1ffd7wlvb3m6ud','1',1,'2024-04-22 15:15:00','2024-04-22 15:15:00'),
(51,'205962','1713799596','hle1ffcmolul8uo6n','3',1,'2024-04-22 15:16:36','2024-04-22 15:16:36'),
(52,'282573','1713799620','hle1ffd7wlvb3m6ud','3',1,'2024-04-22 15:17:00','2024-04-22 15:17:00'),
(53,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZkN3dsdmIzbTZ1ZCIsIk5vbV9Vc2VyIjoiQW5kcmVzIiwiQXBlX1VzZXIiOiJEZSBhdmlsYSIsIkVtYV9Vc2VyIjoiYW5kcmVzY2F2YWRpYWFhQGdtYWlsLmNvbSIsIklkX1JvbF9GSyI6M30sImlhdCI6MTcxMzc5OTA3NCwiZXhwIjoxNzEzODg1NDc0fQ.PFXLitexq3b-mf-FMOrv1D2TOzFwGv1KlPk2kQ2vWt8','1713885474','hle1ffd7wlvb3m6ud','2',1,'2024-04-22 15:17:54','2024-04-22 15:17:54'),
(54,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzOTAwNjI5LCJleHAiOjE3MTM5ODcwMjl9.KV7yHnQ8KGPNizUB3UkPgq0_AyRQQynQMOlEgu9HRzg','1713987029','hle1ffcmolul8uo6n','2',1,'2024-04-23 19:30:29','2024-04-23 19:30:29'),
(55,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzOTAwNjYxLCJleHAiOjE3MTM5ODcwNjF9.NpIgiDPEJb8DgmvV4TjiJ9c_r451qjLkCkAtbefWMus','1713987061','hle1ffcmolul8uo6n','2',1,'2024-04-23 19:31:01','2024-04-23 19:31:01'),
(56,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzOTg3MTQ2LCJleHAiOjE3MTQwNzM1NDZ9.XfkvACVHc_CwQN-uamntfPP1szYnr9rQa85ZDvQFGZA','1714073546','hle1ffcmolul8uo6n','2',1,'2024-04-24 19:32:26','2024-04-24 19:32:26'),
(57,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzOTg3MTcyLCJleHAiOjE3MTQwNzM1NzJ9.ZftPYMz0VZvG0bxcD6Kdc8YwMhEecBJN9NyZ1_kUwm8','1714073572','hle1ffcmolul8uo6n','2',0,'2024-04-24 19:32:52','2024-04-24 20:11:20'),
(58,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzOTkwMjc5LCJleHAiOjE3MTQwNzY2Nzl9.yVP47GifOooUQaPz5d_RNpZ8vi-Sd0wde-qGC_CsjHA','1714076679','hle1ffcmolul8uo6n','2',0,'2024-04-24 20:24:39','2024-04-24 20:24:58'),
(59,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzEzOTkxMjkxLCJleHAiOjE3MTQwNzc2OTF9.LCGOK4_h_6_kv5ayEh1pNcaM_ooqp2OAVj7ZHPiY-gU','1714077691','hle1ffcmolul8uo6n','2',1,'2024-04-24 20:41:31','2024-04-24 20:41:31'),
(60,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzE0MDA5MjMzLCJleHAiOjE3MTQwOTU2MzN9.wFtFu51YqAKBeIxsMbAkUuU_hMMTE7K2CKtfPtYx0PU','1714095633','hle1ffcmolul8uo6n','2',1,'2024-04-25 01:40:33','2024-04-25 01:40:33'),
(61,'611454','1714009845','hle1ffcmolul8uo6n','2',1,'2024-04-25 01:40:45','2024-04-25 01:40:45'),
(62,'285259','1714010045','hle1ffcmolul8uo6n','2',1,'2024-04-25 01:44:05','2024-04-25 01:44:05'),
(63,'352861','1714010061','hle1ffcmolul8uo6n','2',1,'2024-04-25 01:44:21','2024-04-25 01:44:21'),
(64,'430024','1714010075','hle1ffcmolul8uo6n','2',1,'2024-04-25 01:44:35','2024-04-25 01:44:35'),
(65,'592666','1714010306','hle1ffcmolul8uo6n','2',1,'2024-04-25 01:48:26','2024-04-25 01:48:26'),
(66,'249663','1714010368','hle1ffcmolul8uo6n','2',1,'2024-04-25 01:49:28','2024-04-25 01:49:28'),
(67,'837660','1714010385','erxyjd7qclv8xqy8e','2',1,'2024-04-25 01:49:45','2024-04-25 01:49:45'),
(68,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7IklkX1VzZXIiOiJobGUxZmZjbW9sdWw4dW82biIsIk5vbV9Vc2VyIjoicGV0cm8iLCJBcGVfVXNlciI6InBlcmV6IiwiRW1hX1VzZXIiOiJ5b2luZXJwZXJ0dXpAZ21haWwuY29tIiwiSWRfUm9sX0ZLIjoxfSwiaWF0IjoxNzE0Mzk4NDY2LCJleHAiOjE3MTQ0ODQ4NjZ9.5QM4C5D8f7iUQTE1aKL0bBOro1TdAcOSS-jrnvU5mYc','1714484866','hle1ffcmolul8uo6n','2',1,'2024-04-29 13:47:46','2024-04-29 13:47:46');

/*Table structure for table `usuarios` */

DROP TABLE IF EXISTS `usuarios`;

CREATE TABLE `usuarios` (
  `Id_User` varchar(100) NOT NULL,
  `Nom_User` varchar(255) DEFAULT NULL,
  `Ape_User` varchar(255) DEFAULT NULL,
  `Tel_User` varchar(20) DEFAULT NULL,
  `Ema_User` varchar(255) DEFAULT NULL,
  `Pass_User` varchar(255) DEFAULT NULL,
  `Id_Rol_FK` int(11) DEFAULT NULL,
  `Fot_User` varchar(255) DEFAULT NULL,
  `Est_Email_User` int(1) DEFAULT 0 COMMENT '0: No verificado, 1: verificado',
  `ESTADO_REGISTRO` int(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`Id_User`),
  KEY `Id_Rol_FK` (`Id_Rol_FK`),
  CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`Id_Rol_FK`) REFERENCES `roles` (`Id_Rol`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

/*Data for the table `usuarios` */

insert  into `usuarios`(`Id_User`,`Nom_User`,`Ape_User`,`Tel_User`,`Ema_User`,`Pass_User`,`Id_Rol_FK`,`Fot_User`,`Est_Email_User`,`ESTADO_REGISTRO`,`createdAt`,`updatedAt`) values 
('1','cfdsf','dsf','34232','fdsfdsfdsf','fdsfdsfdsf',4,'2434324',1,1,'2024-04-20 18:15:01','2024-04-20 23:16:25'),
('erxyjd1aclv5t60t8','Wiro','De avila','3004445577','cr7@gmail.com','$2b$10$06bglGa1ntkEdgsp9UV4Gejkc72Wm.XLZ9qWGAD3ZrtfXq3irIN0q',3,'3004445577',0,0,'2024-04-18 22:23:39','2024-04-21 02:59:59'),
('erxyjd7a4lv603r9h','Jairo','De avila',NULL,'josecortesandrade41@gmail.com','$2b$10$B18zG/zCfjMjEjM.bGgzhur2y.AKNiUHjnW02Q6q4gRN9yN.37JFy',4,NULL,1,1,'2024-04-19 01:37:50','2024-04-20 23:16:25'),
('erxyjd7qclv8xqy8e','Antonio','Pertuz',NULL,'antoniopertuzchiquillo53@gmail.com','$2b$10$kDMWN8dEwwf65hZDXzXc7uXNuwF3nlDwF4/50bLGlTxphxU./J0ri',3,NULL,0,1,'2024-04-21 02:55:12','2024-04-21 02:55:12'),
('hle1ffcmolul8uo6n','petro','perez',NULL,'yoinerpertuz@gmail.com','$2b$10$vK83JCqzwie8eda4lwaxw.cL2TNsAdWzR9mbfnOlZ/z9vkv3/OhV6',1,NULL,0,1,'2024-04-04 12:59:33','2024-04-04 12:59:33'),
('hle1ffd7wlvb3m6ud','Andres','De avila',NULL,'andrescavadiaaa@gmail.com','$2b$10$.dlYJTJw4awOyndtvJotQuQ6xkk3E0kfNelMNGW50JgbXX/28Pq5e',3,NULL,1,1,'2024-04-22 15:15:00','2024-04-22 15:16:09');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
