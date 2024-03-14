/*
  Warnings:

  - You are about to drop the column `deteled` on the `Message` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Message` DROP COLUMN `deteled`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false;
