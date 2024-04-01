/*
  Warnings:

  - You are about to alter the column `aproved_at` on the `appointments` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `Enum(EnumId(2))`.

*/
-- AlterTable
ALTER TABLE `appointments` MODIFY `aproved_at` ENUM('APROVED', 'CANCELED', 'PENDING') NULL DEFAULT 'PENDING';
