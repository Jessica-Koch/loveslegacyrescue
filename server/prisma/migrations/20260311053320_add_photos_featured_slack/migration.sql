/*
  Warnings:

  - You are about to drop the column `photoUrl` on the `Dog` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dog" DROP COLUMN "photoUrl",
ADD COLUMN     "featuredAt" TIMESTAMP(3),
ADD COLUMN     "photoUrls" TEXT[],
ADD COLUMN     "slackChannelId" TEXT;
