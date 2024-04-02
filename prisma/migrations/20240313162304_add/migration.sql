-- AlterTable
ALTER TABLE `doctors` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'Doctor';

-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` VARCHAR(191) NOT NULL DEFAULT 'User';
