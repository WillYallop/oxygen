/*
  Warnings:

  - A unique constraint covering the columns `[library_name]` on the table `Library` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Library" ADD COLUMN     "library_name" TEXT NOT NULL DEFAULT E'';

-- CreateIndex
CREATE UNIQUE INDEX "Library_library_name_key" ON "Library"("library_name");
