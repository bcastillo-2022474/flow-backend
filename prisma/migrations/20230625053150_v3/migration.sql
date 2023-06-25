/*
  Warnings:

  - A unique constraint covering the columns `[projectId,name]` on the table `Column` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Column_name_key` ON `column`;

-- CreateIndex
CREATE UNIQUE INDEX `Column_projectId_name_key` ON `Column`(`projectId`, `name`);
