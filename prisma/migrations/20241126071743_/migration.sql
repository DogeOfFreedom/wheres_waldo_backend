/*
  Warnings:

  - You are about to drop the column `rank` on the `Player` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "rank";

-- CreateTable
CREATE TABLE "Rank" (
    "id" SERIAL NOT NULL,
    "rank" INTEGER NOT NULL,
    "playerId" TEXT NOT NULL,
    "levelId" TEXT NOT NULL,

    CONSTRAINT "Rank_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rank" ADD CONSTRAINT "Rank_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rank" ADD CONSTRAINT "Rank_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE CASCADE ON UPDATE CASCADE;
