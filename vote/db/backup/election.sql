/*
Navicat MySQL Data Transfer

Source Server         : gary
Source Server Version : 100121
Source Host           : localhost:3306
Source Database       : vote

Target Server Type    : MYSQL
Target Server Version : 100121
File Encoding         : 65001

Date: 2017-09-01 17:28:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for election
-- ----------------------------
DROP TABLE IF EXISTS `election`;
CREATE TABLE `election` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '物理主键',
  `candidate_no` varchar(20) NOT NULL COMMENT '候选人编号',
  `type_no` smallint(1) NOT NULL DEFAULT '1' COMMENT '参与投票类型',
  `number` int(20) NOT NULL DEFAULT '0' COMMENT '得票数',
  `create_at` datetime DEFAULT NULL COMMENT '创建时间',
  `update_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`candidate_no`,`type_no`)
) ENGINE=InnoDB AUTO_INCREMENT=94 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of election
-- ----------------------------
INSERT INTO `election` VALUES ('1', 'A00001', '1', '1', '2017-09-01 15:49:19', '2017-09-01 16:19:52');
INSERT INTO `election` VALUES ('2', 'A00002', '1', '1', '2017-09-01 15:49:19', '2017-09-01 16:19:56');
INSERT INTO `election` VALUES ('3', 'A00003', '2', '1', '2017-09-01 15:49:19', '2017-09-01 16:45:25');
INSERT INTO `election` VALUES ('4', 'A00004', '2', '1', '2017-09-01 15:49:19', '2017-09-01 16:45:13');
INSERT INTO `election` VALUES ('5', 'A00005', '3', '0', '2017-09-01 16:01:29', '2017-09-01 17:28:31');
INSERT INTO `election` VALUES ('6', 'A00006', '3', '0', '2017-09-01 16:03:34', '2017-09-01 17:28:33');
INSERT INTO `election` VALUES ('7', 'A00007', '3', '0', '2017-09-01 17:27:44', '2017-09-01 17:28:36');
INSERT INTO `election` VALUES ('8', 'A00008', '3', '0', '2017-09-01 17:27:46', '2017-09-01 17:28:39');
INSERT INTO `election` VALUES ('9', 'A00009', '4', '0', '2017-09-01 17:27:49', '2017-09-01 17:28:43');
