-- DropForeignKey
ALTER TABLE `AcademicClass` DROP FOREIGN KEY `AcademicClass_stageId_fkey`;

-- AddForeignKey
ALTER TABLE `AcademicClass` ADD CONSTRAINT `AcademicClass_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `Stage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
