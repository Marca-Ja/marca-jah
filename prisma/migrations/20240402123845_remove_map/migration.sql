/*
  Warnings:

  - You are about to drop the column `aproved_at` on the `appointments` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `appointments` DROP COLUMN `aproved_at`,
    ADD COLUMN `status` ENUM('APROVED', 'CANCELED', 'PENDING') NULL DEFAULT 'PENDING';
