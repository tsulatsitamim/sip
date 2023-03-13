-- CreateTable
CREATE TABLE `Student` (
    `id` CHAR(25) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `nis` VARCHAR(191) NOT NULL,
    `birth_place` VARCHAR(191) NOT NULL,
    `birth_date` DATE NOT NULL,
    `father_name` VARCHAR(191) NOT NULL,
    `father_date` DATE NOT NULL,
    `father_job` VARCHAR(191) NOT NULL,
    `father_education` VARCHAR(191) NOT NULL,
    `mother_name` VARCHAR(191) NOT NULL,
    `mother_date` DATE NOT NULL,
    `mother_job` VARCHAR(191) NOT NULL,
    `mother_education` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `note` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
