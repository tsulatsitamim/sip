-- CreateTable
CREATE TABLE `StudentsOnAcademicClasses` (
    `studentId` VARCHAR(191) NOT NULL,
    `academicClassId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`studentId`, `academicClassId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StudentsOnAcademicClasses` ADD CONSTRAINT `StudentsOnAcademicClasses_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StudentsOnAcademicClasses` ADD CONSTRAINT `StudentsOnAcademicClasses_academicClassId_fkey` FOREIGN KEY (`academicClassId`) REFERENCES `AcademicClass`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
