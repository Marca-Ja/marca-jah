/*
  Warnings:

  - Made the column `accessToken` on table `sessions_to_doctors` required. This step will fail if there are existing NULL values in that column.
  - Made the column `refreshToken` on table `sessions_to_doctors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `sessions_to_doctors` MODIFY `accessToken` VARCHAR(255) NOT NULL,
    MODIFY `refreshToken` VARCHAR(191) NOT NULL;
