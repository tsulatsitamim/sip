/*
  Warnings:

  - A unique constraint covering the columns `[nis]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Made the column `nis` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `note` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `birthPlace` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fatherEducation` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fatherJob` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fatherName` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motherEducation` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motherName` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `fatherBirthPlace` on table `Student` required. This step will fail if there are existing NULL values in that column.
  - Made the column `motherBirthPlace` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Student` MODIFY `nis` VARCHAR(191) NOT NULL,
    MODIFY `address` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `phone` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `note` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `birthPlace` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `fatherEducation` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `fatherJob` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `fatherName` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `motherEducation` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `motherName` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `fatherBirthPlace` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `motherBirthPlace` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateIndex
CREATE UNIQUE INDEX `Student_nis_key` ON `Student`(`nis`);
