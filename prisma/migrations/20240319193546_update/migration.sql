/*
  Warnings:

  - You are about to alter the column `borned_at` on the `users` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.

*/
-- AlterTable
ALTER TABLE `users` MODIFY `borned_at` DATETIME(3) NULL;
