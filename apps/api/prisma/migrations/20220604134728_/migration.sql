/*
  Warnings:

  - Added the required column `description` to the `ComponentLibrary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComponentLibrary" ADD COLUMN     "description" TEXT NOT NULL;
