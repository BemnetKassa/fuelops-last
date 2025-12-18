/*
  Warnings:

  - You are about to drop the column `liters` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `reservation` table. All the data in the column will be lost.
  - Added the required column `driverId` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fuelAmount` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_userId_fkey`;

-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `liters`,
    DROP COLUMN `userId`,
    ADD COLUMN `driverId` VARCHAR(191) NOT NULL,
    ADD COLUMN `fuelAmount` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_driverId_fkey` FOREIGN KEY (`driverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
