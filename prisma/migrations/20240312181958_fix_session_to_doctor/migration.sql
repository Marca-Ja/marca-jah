/*
  Warnings:

  - You are about to drop the column `fistName` on the `sessions_to_doctors` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `sessions_to_doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sessions_to_doctors` DROP COLUMN `fistName`,
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL;
