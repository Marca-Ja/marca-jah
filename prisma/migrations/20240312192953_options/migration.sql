-- AlterTable
ALTER TABLE `sessions_to_doctors` MODIFY `accessToken` VARCHAR(191) NULL,
    MODIFY `refreshToken` VARCHAR(191) NULL;
