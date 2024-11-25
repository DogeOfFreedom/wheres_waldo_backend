/*
  Warnings:

  - You are about to drop the column `anonymous` on the `Player` table. All the data in the column will be lost.
  - Added the required column `anon` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `time` on the `Player` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Player" DROP COLUMN "anonymous",
ADD COLUMN     "anon" BOOLEAN NOT NULL,
DROP COLUMN "time",
ADD COLUMN     "time" JSONB NOT NULL;
