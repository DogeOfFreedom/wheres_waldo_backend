/*
  Warnings:

  - Added the required column `levelId` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "levelId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;
