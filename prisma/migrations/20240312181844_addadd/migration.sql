/*
  Warnings:

  - Added the required column `email` to the `sessions_to_doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sessions_to_doctors` ADD COLUMN `email` VARCHAR(191) NOT NULL;
