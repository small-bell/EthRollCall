/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50714
 Source Host           : localhost:3306
 Source Schema         : rollcall

 Target Server Type    : MySQL
 Target Server Version : 50714
 File Encoding         : 65001

 Date: 06/10/2021 18:02:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for archive
-- ----------------------------
DROP TABLE IF EXISTS `archive`;
CREATE TABLE `archive`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` bigint(20) NULL DEFAULT NULL,
  `fromModel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `originalRecord` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `originalRecordId` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for record
-- ----------------------------
DROP TABLE IF EXISTS `record`;
CREATE TABLE `record`  (
  `createdAt` bigint(20) NULL DEFAULT NULL,
  `updatedAt` bigint(20) NULL DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` double NULL DEFAULT NULL,
  `number` double NULL DEFAULT NULL,
  `absence` double NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Fixed;

-- ----------------------------
-- Records of record
-- ----------------------------
INSERT INTO `record` VALUES (1633490664241, 1633490664241, 13, 1633490630000, 20195353, 0);

-- ----------------------------
-- Table structure for rollcall
-- ----------------------------
DROP TABLE IF EXISTS `rollcall`;
CREATE TABLE `rollcall`  (
  `createdAt` bigint(20) NULL DEFAULT NULL,
  `updatedAt` bigint(20) NULL DEFAULT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` double NULL DEFAULT NULL,
  `expireTime` double NULL DEFAULT NULL,
  `comment` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = MyISAM AUTO_INCREMENT = 87 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `createdAt` bigint(20) NULL DEFAULT NULL,
  `updatedAt` bigint(20) NULL DEFAULT NULL,
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `classes` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `teacher` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `id`(`id`) USING BTREE
) ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES (1633491078384, 1633491078384, 20195352, '李小明', '1', '1');
INSERT INTO `student` VALUES (1633490573088, 1633490573088, 20195353, '李明', '1', '1');

SET FOREIGN_KEY_CHECKS = 1;
