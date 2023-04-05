-- AlterTable
ALTER TABLE `Student` ADD COLUMN `entryClass` VARCHAR(191) NULL,
    ADD COLUMN `entryDate` DATE NULL,
    ADD COLUMN `entryProgram` VARCHAR(191) NULL,
    ADD COLUMN `originClass` VARCHAR(191) NULL,
    ADD COLUMN `originDate` DATE NULL,
    ADD COLUMN `originGrade` ENUM('TA', 'TK', 'SD', 'MI', 'SMP', 'MTS', 'SMA', 'MA') NULL,
    ADD COLUMN `originSchool` VARCHAR(191) NULL,
    ADD COLUMN `originType` ENUM('Baru', 'Lulusan', 'Pindahan') NULL;
