/*
 Navicat Premium Dump SQL

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : testapi

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 23/03/2025 00:50:16
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for services
-- ----------------------------
DROP TABLE IF EXISTS `services`;
CREATE TABLE `services`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL,
  `price` decimal(10, 2) NOT NULL,
  `created_by` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `created_by`(`created_by` ASC) USING BTREE,
  CONSTRAINT `services_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of services
-- ----------------------------
INSERT INTO `services` VALUES (1, 'Dịch vụ vệ sinh', 'Dọn dẹp nhà cửa chuyên nghiệp', 500000.00, 1, '2025-03-22 21:22:56', '2025-03-22 21:22:56');
INSERT INTO `services` VALUES (2, 'Sửa chữa điện nước', 'Sửa chữa điện nước tại nhà', 300000.00, 1, '2025-03-22 21:22:56', '2025-03-22 21:22:56');
INSERT INTO `services` VALUES (6, 'Dịch vụ đã sửa', 'Mô tả mới cho dịch vụ', 500.00, 1, '2025-03-22 23:08:03', '2025-03-22 23:11:51');
INSERT INTO `services` VALUES (7, 'Dịch vụ MMsdMsdMsdới', 'Mô tả dịch vụ mới', 500.00, 1, '2025-03-22 23:10:03', '2025-03-22 23:10:03');
INSERT INTO `services` VALUES (8, 'Dịch njnadasdadnjnadasdadnjnadasdadsdMsdMsdới', 'Mô tả dịch vụ mmfwfwfmfwfwfmfwfwfới', 500.00, 1, '2025-03-23 00:46:32', '2025-03-23 00:46:32');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT 'user',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `email`(`email` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (1, 'Admin', 'admin@example.com', '123456', 'admin', '2025-03-22 21:22:52');
INSERT INTO `users` VALUES (2, 'User1', 'user1@example.com', '123456', 'user', '2025-03-22 21:22:52');
INSERT INTO `users` VALUES (3, 'User2', 'user2@example.com', '123456', 'user', '2025-03-22 21:22:52');
INSERT INTO `users` VALUES (4, 'dong123', 'admadmeqadmwqweqin@example.com', '$2b$10$izRmZWntLEB5rJ0FeuR95e7Q7J90T9OjkLM3vqAoKqr7G95G7I8Z.', 'user', '2025-03-22 22:42:40');
INSERT INTO `users` VALUES (5, 'dong123', 'admaadma325235adma325235adma325235@example.com', '$2b$10$poSiEgD.pFr.NZj7XClLJ.4HrmfxQ6oVHAnzFkL8.RNZ2N9d0Keda', 'user', '2025-03-22 22:49:38');
INSERT INTO `users` VALUES (6, 'dong123', 'admaadadmaaddddadmaaddddadmaaddddma325235adma325235adma325235@example.com', '$2b$10$4R7PDsFmBa9O2bQ5ub3jV.wPnedhwIW9tYZAWFh4EMLcfUgZouzxe', 'user', '2025-03-22 23:54:24');
INSERT INTO `users` VALUES (7, 'dong123', 'ryhjryhjryhj@example.com', '$2b$10$CYkmPMrWxmzz89nfn4dypevjCaej.GJmjqox51FcT0MsQSL9Mn3aS', 'user', '2025-03-23 00:09:19');
INSERT INTO `users` VALUES (8, 'dong123', 'qr2r24qr2r24qr2r24@example.com', '$2b$10$4cCWKDHKuMKFiy2AaBsbhOq.hmZsYOf98bCjz.IlBs83w/xqd1OnO', 'admin', '2025-03-23 00:27:05');
INSERT INTO `users` VALUES (9, '123123123dong123', 'dong123dong123dong123@example.com', '$2b$10$Lh.MOTG14t6U8NE6CDK4R.x/Zh35KF0cieq3fdLYNzd.CXPj7p7de', 'admin', '2025-03-23 00:45:34');

SET FOREIGN_KEY_CHECKS = 1;
