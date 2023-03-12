/*
  Warnings:

  - You are about to drop the `Year` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Year`;

-- CreateTable
CREATE TABLE `AcademicYear` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
