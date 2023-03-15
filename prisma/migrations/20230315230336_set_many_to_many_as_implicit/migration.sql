/*
  Warnings:

  - You are about to drop the `StudentsOnAcademicClasses` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `StudentsOnAcademicClasses` DROP FOREIGN KEY `StudentsOnAcademicClasses_academicClassId_fkey`;

-- DropForeignKey
ALTER TABLE `StudentsOnAcademicClasses` DROP FOREIGN KEY `StudentsOnAcademicClasses_studentId_fkey`;

-- DropTable
DROP TABLE `StudentsOnAcademicClasses`;

-- CreateTable
CREATE TABLE `_AcademicClassToStudent` (
    `A` CHAR(25) NOT NULL,
    `B` CHAR(25) NOT NULL,

    UNIQUE INDEX `_AcademicClassToStudent_AB_unique`(`A`, `B`),
    INDEX `_AcademicClassToStudent_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AcademicClassToStudent` ADD CONSTRAINT `_AcademicClassToStudent_A_fkey` FOREIGN KEY (`A`) REFERENCES `AcademicClass`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AcademicClassToStudent` ADD CONSTRAINT `_AcademicClassToStudent_B_fkey` FOREIGN KEY (`B`) REFERENCES `Student`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
