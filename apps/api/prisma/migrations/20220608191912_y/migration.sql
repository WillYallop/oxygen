/*
  Warnings:

  - You are about to drop the `ComponentMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KitMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PluginMedia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ComponentMedia" DROP CONSTRAINT "ComponentMedia_library_id_fkey";

-- DropForeignKey
ALTER TABLE "KitMedia" DROP CONSTRAINT "KitMedia_library_id_fkey";

-- DropForeignKey
ALTER TABLE "PluginMedia" DROP CONSTRAINT "PluginMedia_library_id_fkey";

-- DropTable
DROP TABLE "ComponentMedia";

-- DropTable
DROP TABLE "KitMedia";

-- DropTable
DROP TABLE "PluginMedia";

-- CreateTable
CREATE TABLE "LibraryMedia" (
    "id" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "extensions" TEXT[],
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "uploaded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tag" TEXT NOT NULL,
    "component_library_id" TEXT NOT NULL,
    "plugin_library_id" TEXT NOT NULL,
    "kit_library_id" TEXT NOT NULL,

    CONSTRAINT "LibraryMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "LibraryMedia" ADD CONSTRAINT "LibraryMedia_component_library_id_fkey" FOREIGN KEY ("component_library_id") REFERENCES "ComponentLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryMedia" ADD CONSTRAINT "LibraryMedia_plugin_library_id_fkey" FOREIGN KEY ("plugin_library_id") REFERENCES "PluginLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryMedia" ADD CONSTRAINT "LibraryMedia_kit_library_id_fkey" FOREIGN KEY ("kit_library_id") REFERENCES "KitLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
