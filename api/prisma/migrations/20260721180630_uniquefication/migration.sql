/*
  Warnings:

  - You are about to drop the column `value` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Collection` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Model` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `value`,
    ADD COLUMN `price` DOUBLE NOT NULL,
    MODIFY `description` TEXT NULL,
    MODIFY `addonName` VARCHAR(100) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Collection_name_key` ON `Collection`(`name`);

-- CreateIndex
CREATE UNIQUE INDEX `Model_name_key` ON `Model`(`name`);
