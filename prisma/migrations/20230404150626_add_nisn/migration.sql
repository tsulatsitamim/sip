/*
  Warnings:

  - A unique constraint covering the columns `[nisn]` on the table `Student` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `Student` ADD COLUMN `nisn` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Student_nisn_key` ON `Student`(`nisn`);
