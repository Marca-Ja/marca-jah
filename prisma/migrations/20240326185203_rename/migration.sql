/*
  Warnings:

  - You are about to drop the column `preferenceId` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the `_PreferenceToUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `preferences` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_PreferenceToUser` DROP FOREIGN KEY `_PreferenceToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_PreferenceToUser` DROP FOREIGN KEY `_PreferenceToUser_B_fkey`;

-- DropForeignKey
ALTER TABLE `doctors` DROP FOREIGN KEY `doctors_preferenceId_fkey`;

-- DropForeignKey
ALTER TABLE `preferences` DROP FOREIGN KEY `preferences_doctorProfileId_fkey`;

-- AlterTable
ALTER TABLE `doctors` DROP COLUMN `preferenceId`,
    ADD COLUMN `specialtyId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_PreferenceToUser`;

-- DropTable
DROP TABLE `preferences`;

-- CreateTable
CREATE TABLE `Specialtys` (
    `id` VARCHAR(191) NOT NULL,
    `specialty` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `delete_at` DATETIME(3) NULL,
    `doctorProfileId` VARCHAR(191) NULL,

    UNIQUE INDEX `Specialtys_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_SpecialtyToUser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_SpecialtyToUser_AB_unique`(`A`, `B`),
    INDEX `_SpecialtyToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Specialtys` ADD CONSTRAINT `Specialtys_doctorProfileId_fkey` FOREIGN KEY (`doctorProfileId`) REFERENCES `doctor_profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_specialtyId_fkey` FOREIGN KEY (`specialtyId`) REFERENCES `Specialtys`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SpecialtyToUser` ADD CONSTRAINT `_SpecialtyToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Specialtys`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SpecialtyToUser` ADD CONSTRAINT `_SpecialtyToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
