-- DropForeignKey
ALTER TABLE `Sale` DROP FOREIGN KEY `Sale_productId_fkey`;

-- DropIndex
DROP INDEX `Sale_productId_fkey` ON `Sale`;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
