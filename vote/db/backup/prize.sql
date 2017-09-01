/*
Navicat MySQL Data Transfer

Source Server         : gary
Source Server Version : 100121
Source Host           : localhost:3306
Source Database       : vote

Target Server Type    : MYSQL
Target Server Version : 100121
File Encoding         : 65001

Date: 2017-09-01 17:25:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for prize
-- ----------------------------
DROP TABLE IF EXISTS `prize`;
CREATE TABLE `prize` (
  `id` int(10) NOT NULL AUTO_INCREMENT COMMENT '物理主键',
  `type_no` tinyint(1) NOT NULL COMMENT '评比类型',
  `type_name` varchar(50) NOT NULL COMMENT '评比项目名字',
  `create_at` datetime DEFAULT NULL COMMENT '创建时间',
  `update_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`type_no`),
  UNIQUE KEY `type_no` (`type_no`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of prize
-- ----------------------------
INSERT INTO `prize` VALUES ('1', '1', '优秀安全负责人评选', null, null);
INSERT INTO `prize` VALUES ('2', '2', '优秀安全员评选', null, null);
INSERT INTO `prize` VALUES ('3', '3', '优秀注册安全工程师评选', null, null);
INSERT INTO `prize` VALUES ('4', '4', '优秀技师评选', null, null);
INSERT INTO `prize` VALUES ('5', '5', '优秀分析员评选', null, null);
