-- AlterTable
ALTER TABLE `AcademicClass` ADD COLUMN `stageId` CHAR(25) NULL;

-- AddForeignKey
ALTER TABLE `AcademicClass` ADD CONSTRAINT `AcademicClass_stageId_fkey` FOREIGN KEY (`stageId`) REFERENCES `Stage`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
