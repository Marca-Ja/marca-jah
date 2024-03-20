/*
  Warnings:

  - You are about to drop the column `borned_at` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `fistName` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `service_preference` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `session_to_doctor_id` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `university` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `doctors` table. All the data in the column will be lost.
  - You are about to drop the `_DoctorToPreference` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `sessions_to_doctors` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `firstName` to the `doctors` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `_DoctorToPreference` DROP FOREIGN KEY `_DoctorToPreference_A_fkey`;

-- DropForeignKey
ALTER TABLE `_DoctorToPreference` DROP FOREIGN KEY `_DoctorToPreference_B_fkey`;

-- DropForeignKey
ALTER TABLE `doctors` DROP FOREIGN KEY `doctors_session_to_doctor_id_fkey`;

-- AlterTable
ALTER TABLE `appointments` ADD COLUMN `doctorProfileId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `doctors` DROP COLUMN `borned_at`,
    DROP COLUMN `created_at`,
    DROP COLUMN `fistName`,
    DROP COLUMN `role`,
    DROP COLUMN `service_preference`,
    DROP COLUMN `session_to_doctor_id`,
    DROP COLUMN `university`,
    DROP COLUMN `update_at`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `firstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `preferenceId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `preferences` ADD COLUMN `doctorProfileId` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `_DoctorToPreference`;

-- DropTable
DROP TABLE `sessions_to_doctors`;

-- CreateTable
CREATE TABLE `doctor_profiles` (
    `id` VARCHAR(191) NOT NULL,
    `university` VARCHAR(191) NOT NULL,
    `borned_at` DATETIME(3) NOT NULL,
    `service_preference` ENUM('ONLINE', 'PRESENCIAL', 'ALL') NOT NULL DEFAULT 'ALL',
    `role` VARCHAR(191) NOT NULL DEFAULT 'Doctor',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `update_at` DATETIME(3) NOT NULL,
    `doctors_id` VARCHAR(191) NULL,
    `doctorId` VARCHAR(191) NULL,

    UNIQUE INDEX `doctor_profiles_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `preferences` ADD CONSTRAINT `preferences_doctorProfileId_fkey` FOREIGN KEY (`doctorProfileId`) REFERENCES `doctor_profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_preferenceId_fkey` FOREIGN KEY (`preferenceId`) REFERENCES `preferences`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctor_profiles` ADD CONSTRAINT `doctor_profiles_doctorId_fkey` FOREIGN KEY (`doctorId`) REFERENCES `doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointments` ADD CONSTRAINT `appointments_doctorProfileId_fkey` FOREIGN KEY (`doctorProfileId`) REFERENCES `doctor_profiles`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
