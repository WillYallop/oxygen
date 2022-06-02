/*
  Warnings:

  - You are about to drop the column `banner_url` on the `ComponentLibrary` table. All the data in the column will be lost.
  - You are about to drop the column `icon_url` on the `ComponentLibrary` table. All the data in the column will be lost.
  - You are about to drop the column `preview_url` on the `ComponentLibrary` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ComponentLibrary" DROP COLUMN "banner_url",
DROP COLUMN "icon_url",
DROP COLUMN "preview_url";
