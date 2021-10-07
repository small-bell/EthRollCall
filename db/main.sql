DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `id` integer(8) NOT NULL COMMENT '学号',
  `name` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '姓名',
  `class` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT "1" COMMENT '课程的班级',
  `teacher` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT "1" COMMENT '老师',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `name`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '学生表' ROW_FORMAT = Compact;

DROP TABLE IF EXISTS `record`;
CREATE TABLE `record`  (
  `id` integer(8) NOT NULL COMMENT '学号',
  `data` integer(13) NOT NULL COMMENT '时间戳',
  `number` integer(8) NOT NULL COMMENT '学号',
  `absence` integer(1) DEFAULT 0 COMMENT '是否缺勤',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `data`(`data`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '缺勤记录表' ROW_FORMAT = Compact;


