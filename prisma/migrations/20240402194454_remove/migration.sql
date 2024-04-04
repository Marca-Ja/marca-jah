/*
  Warnings:

  - You are about to drop the column `deleted_at` on the `appointments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `appointments` DROP COLUMN `deleted_at`;

-- AlterTable
ALTER TABLE `users` MODIFY `borned_at` VARCHAR(191) NULL;
