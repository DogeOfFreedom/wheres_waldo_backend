/*
  Warnings:

  - You are about to drop the `Rank` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `rank` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Rank" DROP CONSTRAINT "Rank_levelId_fkey";

-- DropForeignKey
ALTER TABLE "Rank" DROP CONSTRAINT "Rank_playerId_fkey";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "rank" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Rank";
