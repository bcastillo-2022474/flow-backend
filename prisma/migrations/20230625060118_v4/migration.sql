/*
  Warnings:

  - You are about to drop the column `projectId` on the `task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `task` DROP FOREIGN KEY `Task_projectId_fkey`;

-- AlterTable
ALTER TABLE `task` DROP COLUMN `projectId`;
