/*
  Warnings:

  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.
  - Added the required column `addonName` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `stock`,
    ADD COLUMN `addonName` VARCHAR(100) NOT NULL,
    ADD COLUMN `qty` INTEGER NOT NULL;
