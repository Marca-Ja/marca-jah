/*
  Warnings:

  - You are about to drop the column `celphone` on the `users` table. All the data in the column will be lost.
  - Added the required column `cellphone` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `celphone`,
    ADD COLUMN `cellphone` VARCHAR(191) NOT NULL;
