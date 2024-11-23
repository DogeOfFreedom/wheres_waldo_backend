/*
  Warnings:

  - You are about to drop the column `locations` on the `Level` table. All the data in the column will be lost.
  - Added the required column `location` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Level" DROP COLUMN "locations",
ADD COLUMN     "location" JSONB NOT NULL;
