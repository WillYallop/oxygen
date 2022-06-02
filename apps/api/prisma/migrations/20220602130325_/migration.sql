/*
  Warnings:

  - You are about to drop the column `commit` on the `Version` table. All the data in the column will be lost.
  - You are about to drop the column `repository` on the `Version` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Version" DROP COLUMN "commit",
DROP COLUMN "repository";
