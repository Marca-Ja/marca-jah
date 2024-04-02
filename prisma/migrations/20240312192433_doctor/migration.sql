/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `doctors` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `sessions_to_doctors` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `email` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `doctors_email_key` ON `doctors`(`email`);

-- CreateIndex
CREATE UNIQUE INDEX `sessions_to_doctors_email_key` ON `sessions_to_doctors`(`email`);
