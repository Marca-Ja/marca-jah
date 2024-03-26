/*
  Warnings:

  - You are about to drop the column `doctorId` on the `doctor_profiles` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `doctor_profiles` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `doctor_profiles` DROP FOREIGN KEY `doctor_profiles_doctorId_fkey`;

-- AlterTable
ALTER TABLE `doctor_profiles` DROP COLUMN `doctorId`,
    DROP COLUMN `role`;

-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'Doctor';

-- AddForeignKey
ALTER TABLE `doctor_profiles` ADD CONSTRAINT `doctor_profiles_doctors_id_fkey` FOREIGN KEY (`doctors_id`) REFERENCES `doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
