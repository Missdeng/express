/*
Navicat MySQL Data Transfer

Source Server         : gary
Source Server Version : 100121
Source Host           : localhost:3306
Source Database       : vote

Target Server Type    : MYSQL
Target Server Version : 100121
File Encoding         : 65001

Date: 2017-09-01 17:25:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for vote
-- ----------------------------
DROP TABLE IF EXISTS `vote`;
CREATE TABLE `vote` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `open_id` varchar(64) NOT NULL COMMENT '微信用户唯一识别码',
  `candidate_no` varchar(50) NOT NULL COMMENT '候选人编号',
  `time` date NOT NULL DEFAULT '0000-00-00' COMMENT '投票时间',
  `type_no` smallint(1) NOT NULL COMMENT '投票类型编号',
  `number` smallint(1) NOT NULL DEFAULT '0' COMMENT '投票次数',
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`,`open_id`)
) ENGINE=InnoDB AUTO_INCREMENT=101 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of vote
-- ----------------------------