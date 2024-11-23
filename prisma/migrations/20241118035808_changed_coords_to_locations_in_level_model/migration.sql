/*
  Warnings:

  - You are about to drop the column `coords` on the `Level` table. All the data in the column will be lost.
  - Added the required column `locations` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Level" DROP COLUMN "coords",
ADD COLUMN     "locations" JSONB NOT NULL;
