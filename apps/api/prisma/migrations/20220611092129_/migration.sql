/*
  Warnings:

  - You are about to drop the column `created` on the `LibraryMedia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LibraryMedia" DROP COLUMN "created";

-- AlterTable
ALTER TABLE "LibraryVersion" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT false;
