-- AlterTable
ALTER TABLE `appointments` ADD COLUMN `payment_method` ENUM('CREDIT_CARD', 'DEBIT_CARD', 'PIX', 'CASH') NULL;
