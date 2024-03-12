/*
  Warnings:

  - You are about to drop the column `name` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `unervisity` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `googleUserId` on the `sessions_to_doctors` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `sessions_to_doctors` table. All the data in the column will be lost.
  - Added the required column `fistName` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `university` to the `doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessToken` to the `sessions_to_doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fistName` to the `sessions_to_doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `sessions_to_doctors` table without a default value. This is not possible if the table is not empty.
  - Added the required column `refreshToken` to the `sessions_to_doctors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `doctors` DROP COLUMN `name`,
    DROP COLUMN `unervisity`,
    ADD COLUMN `fistName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `university` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `sessions_to_doctors` DROP COLUMN `googleUserId`,
    DROP COLUMN `token`,
    ADD COLUMN `accessToken` VARCHAR(191) NOT NULL,
    ADD COLUMN `fistName` VARCHAR(191) NOT NULL,
    ADD COLUMN `lastName` VARCHAR(191) NOT NULL,
    ADD COLUMN `refreshToken` VARCHAR(191) NOT NULL;
