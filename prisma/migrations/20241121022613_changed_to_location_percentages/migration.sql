/*
  Warnings:

  - You are about to drop the column `location` on the `Level` table. All the data in the column will be lost.
  - Added the required column `location_percents` to the `Level` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Level" DROP COLUMN "location",
ADD COLUMN     "location_percents" JSONB NOT NULL;
