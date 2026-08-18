/*
  Warnings:

  - You are about to drop the column `video_key` on the `lessons` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "audit_logs_created_at_idx";

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "thumbnail_url" TEXT;

-- AlterTable
ALTER TABLE "lessons" DROP COLUMN "video_key",
ADD COLUMN     "thumbnail_url" TEXT,
ADD COLUMN     "video_type" TEXT DEFAULT 'youtube',
ADD COLUMN     "video_url" TEXT;
