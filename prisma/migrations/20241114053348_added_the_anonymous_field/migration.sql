/*
  Warnings:

  - Added the required column `anonymous` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "anonymous" BOOLEAN NOT NULL;
