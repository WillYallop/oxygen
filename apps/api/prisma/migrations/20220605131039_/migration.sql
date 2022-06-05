/*
  Warnings:

  - Added the required column `description` to the `KitLibrary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `PluginLibrary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ComponentLibrary" ADD COLUMN     "deactivated" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "KitLibrary" ADD COLUMN     "deactivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PluginLibrary" ADD COLUMN     "deactivated" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "description" TEXT NOT NULL;
