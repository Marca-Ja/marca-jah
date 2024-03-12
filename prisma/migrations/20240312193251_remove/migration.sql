/*
  Warnings:

  - You are about to drop the column `session_to_doctor_doctor_id` on the `sessions_to_doctors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `sessions_to_doctors` DROP FOREIGN KEY `sessions_to_doctors_session_to_doctor_doctor_id_fkey`;

-- AlterTable
ALTER TABLE `sessions_to_doctors` DROP COLUMN `session_to_doctor_doctor_id`;
