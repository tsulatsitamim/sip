-- AlterTable
ALTER TABLE `Student` ADD COLUMN `allergy` VARCHAR(191) NULL,
    ADD COLUMN `bloodType` ENUM('O', 'A', 'B', 'AB') NULL,
    ADD COLUMN `characteristic` VARCHAR(191) NULL,
    ADD COLUMN `childOrder` INTEGER NULL,
    ADD COLUMN `citizenship` VARCHAR(191) NULL,
    ADD COLUMN `disability` VARCHAR(191) NULL,
    ADD COLUMN `diseaseHistory` VARCHAR(191) NULL,
    ADD COLUMN `fosterSiblings` INTEGER NULL,
    ADD COLUMN `gender` ENUM('Laki_Laki', 'Perempuan') NULL,
    ADD COLUMN `height` INTEGER NULL,
    ADD COLUMN `motherJob` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `nickname` VARCHAR(191) NULL,
    ADD COLUMN `parentAddress` VARCHAR(191) NULL,
    ADD COLUMN `parentPhone` VARCHAR(191) NULL,
    ADD COLUMN `religion` ENUM('Islam') NULL,
    ADD COLUMN `retardation` VARCHAR(191) NULL,
    ADD COLUMN `siblings` INTEGER NULL,
    ADD COLUMN `spicy` ENUM('Ya', 'Tidak') NULL,
    ADD COLUMN `stayWith` VARCHAR(191) NULL,
    ADD COLUMN `stepSiblings` INTEGER NULL,
    ADD COLUMN `waliAddress` VARCHAR(191) NULL,
    ADD COLUMN `waliBirthDate` DATE NULL,
    ADD COLUMN `waliBirthPlace` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `waliEducation` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `waliJob` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `waliName` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `waliPhone` VARCHAR(191) NULL,
    ADD COLUMN `weight` INTEGER NULL;
