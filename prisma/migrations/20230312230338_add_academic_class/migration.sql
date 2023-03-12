/*
  Warnings:

  - The primary key for the `AcademicYear` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `AcademicYear` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Char(25)`.

*/
-- AlterTable
ALTER TABLE `AcademicYear` DROP PRIMARY KEY,
    MODIFY `id` CHAR(25) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- CreateTable
CREATE TABLE `AcademicClass` (
    `id` CHAR(25) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `academicYearId` CHAR(25) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AcademicClass` ADD CONSTRAINT `AcademicClass_academicYearId_fkey` FOREIGN KEY (`academicYearId`) REFERENCES `AcademicYear`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
