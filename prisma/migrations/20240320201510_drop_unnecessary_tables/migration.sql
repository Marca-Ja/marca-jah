/*
  Warnings:

  - You are about to drop the column `accessToken` on the `sessions_to_doctors` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `sessions_to_doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `session_to_doctor_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `sessions_to_doctors` DROP COLUMN `accessToken`,
    DROP COLUMN `refreshToken`;

-- AddForeignKey
ALTER TABLE `doctors` ADD CONSTRAINT `doctors_session_to_doctor_id_fkey` FOREIGN KEY (`session_to_doctor_id`) REFERENCES `sessions_to_doctors`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
