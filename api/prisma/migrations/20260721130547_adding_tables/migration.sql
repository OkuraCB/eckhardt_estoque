/*
  Warnings:

  - You are about to drop the `Produto` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Produto`;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_time` TIMESTAMP(0) NULL,
    `name` VARCHAR(100) NOT NULL,
    `code` VARCHAR(50) NULL,
    `value` DOUBLE NOT NULL,
    `stock` INTEGER NOT NULL,
    `description` TEXT NOT NULL,
    `length` DOUBLE NULL,
    `width` DOUBLE NULL,
    `height` DOUBLE NULL,
    `heightAddon` DOUBLE NULL,
    `image1` VARCHAR(191) NULL,
    `image2` VARCHAR(191) NULL,
    `image3` VARCHAR(191) NULL,
    `collectionId` INTEGER NOT NULL,
    `modelId` INTEGER NOT NULL,

    UNIQUE INDEX `code_UNIQUE`(`code`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Collection` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_time` TIMESTAMP(0) NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Model` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_time` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `update_time` TIMESTAMP(0) NULL,
    `name` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_collectionId_fkey` FOREIGN KEY (`collectionId`) REFERENCES `Collection`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_modelId_fkey` FOREIGN KEY (`modelId`) REFERENCES `Model`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
