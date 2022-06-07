/*
  Warnings:

  - You are about to drop the column `types` on the `Media` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Media" DROP COLUMN "types",
ADD COLUMN     "extensions" TEXT[];
