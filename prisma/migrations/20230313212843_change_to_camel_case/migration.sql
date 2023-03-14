/*
  Warnings:

  - You are about to drop the column `birth_date` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `birth_place` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `father_date` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `father_education` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `father_job` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `father_name` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `mother_date` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `mother_education` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `mother_job` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `mother_name` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Student` DROP COLUMN `birth_date`,
    DROP COLUMN `birth_place`,
    DROP COLUMN `father_date`,
    DROP COLUMN `father_education`,
    DROP COLUMN `father_job`,
    DROP COLUMN `father_name`,
    DROP COLUMN `mother_date`,
    DROP COLUMN `mother_education`,
    DROP COLUMN `mother_job`,
    DROP COLUMN `mother_name`,
    ADD COLUMN `birthDate` DATE NULL,
    ADD COLUMN `birthPlace` VARCHAR(191) NULL,
    ADD COLUMN `fatherDate` DATE NULL,
    ADD COLUMN `fatherEducation` VARCHAR(191) NULL,
    ADD COLUMN `fatherJob` VARCHAR(191) NULL,
    ADD COLUMN `fatherName` VARCHAR(191) NULL,
    ADD COLUMN `motherDate` DATE NULL,
    ADD COLUMN `motherEducation` VARCHAR(191) NULL,
    ADD COLUMN `motherJob` VARCHAR(191) NULL,
    ADD COLUMN `motherName` VARCHAR(191) NULL;
