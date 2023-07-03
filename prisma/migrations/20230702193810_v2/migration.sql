-- DropForeignKey
ALTER TABLE `attachment` DROP FOREIGN KEY `attachment_taskId_fkey`;

-- AddForeignKey
ALTER TABLE `Attachment` ADD CONSTRAINT `Attachment_taskId_fkey` FOREIGN KEY (`taskId`) REFERENCES `Task`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
