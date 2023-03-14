/*
  Warnings:

  - You are about to drop the column `fatherDate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `motherDate` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `motherJob` on the `Student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Student` DROP COLUMN `fatherDate`,
    DROP COLUMN `motherDate`,
    DROP COLUMN `motherJob`,
    ADD COLUMN `fatherBirthDate` DATE NULL,
    ADD COLUMN `fatherBirthPlace` VARCHAR(191) NULL,
    ADD COLUMN `motherBirthDate` DATE NULL,
    ADD COLUMN `motherBirthPlace` VARCHAR(191) NULL;
