/*
  Warnings:

  - You are about to drop the column `name` on the `Library` table. All the data in the column will be lost.
  - Added the required column `display_name` to the `Library` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Library" DROP COLUMN "name",
ADD COLUMN     "display_name" TEXT NOT NULL;
