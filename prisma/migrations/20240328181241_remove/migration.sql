/*
  Warnings:

  - You are about to drop the column `doctorProfileId` on the `appointments` table. All the data in the column will be lost.
  - You are about to drop the `Specialtys` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `doctor_profiles` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Specialtys` DROP FOREIGN KEY `Specialtys_doctorProfileId_fkey`;

-- DropForeignKey
ALTER TABLE `_SpecialtyToUser` DROP FOREIGN KEY `_SpecialtyToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `appointments` DROP FOREIGN KEY `appointments_doctorProfileId_fkey`;

-- DropForeignKey
ALTER TABLE `doctor_profiles` DROP FOREIGN KEY `doctor_profiles_doctors_id_fkey`;

-- DropForeignKey
ALTER TABLE `doctors` DROP FOREIGN KEY `doctors_specialtyId_fkey`;

-- AlterTable
ALTER TABLE `appointments` DROP COLUMN `doctorProfileId`;

-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `borned_at` VARCHAR(191) NULL,
    ADD COLUMN `service_preference` ENUM('ONLINE', 'PRESENCIAL', 'ALL') NOT NULL DEFAULT 'ALL',
    ADD COLUMN `university` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `Specialtys`;

-- DropTable
DROP TABLE `doctor_profiles`;

-- CreateTable
CREATE TABLE `specialties` (
    `id` VARCHAR(191) NOT NULL,
    `specialty` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_at` DATETIME(3) NULL,

    UNIQUE INDEX `specialties_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_specialtyId_fkey` FOREIGN KEY (`specialtyId`) REFERENCES `specialties`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SpecialtyToUser` ADD CONSTRAINT `_SpecialtyToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `specialties`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
