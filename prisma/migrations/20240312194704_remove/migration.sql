/*
  Warnings:

  - You are about to drop the column `expiredAt` on the `sessions_to_doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `sessions_to_doctors` DROP COLUMN `expiredAt`;
