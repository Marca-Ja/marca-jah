/*
  Warnings:

  - You are about to drop the column `delete_at` on the `specialties` table. All the data in the column will be lost.
  - You are about to drop the column `delete_at` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `specialties` DROP COLUMN `delete_at`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `delete_at`;
