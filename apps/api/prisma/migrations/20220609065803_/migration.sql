/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `LibraryMedia` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LibraryMedia_key_key" ON "LibraryMedia"("key");
