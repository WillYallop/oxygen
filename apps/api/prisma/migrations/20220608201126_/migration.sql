/*
  Warnings:

  - You are about to drop the column `component_library_id` on the `ComponentLibraryMedia` table. All the data in the column will be lost.
  - You are about to drop the column `kit_library_id` on the `KitLibraryMedia` table. All the data in the column will be lost.
  - You are about to drop the column `plugin_library_id` on the `PluginLibraryMedia` table. All the data in the column will be lost.
  - Added the required column `library_id` to the `ComponentLibraryMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `library_id` to the `KitLibraryMedia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `library_id` to the `PluginLibraryMedia` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ComponentLibraryMedia" DROP CONSTRAINT "ComponentLibraryMedia_component_library_id_fkey";

-- DropForeignKey
ALTER TABLE "KitLibraryMedia" DROP CONSTRAINT "KitLibraryMedia_kit_library_id_fkey";

-- DropForeignKey
ALTER TABLE "PluginLibraryMedia" DROP CONSTRAINT "PluginLibraryMedia_plugin_library_id_fkey";

-- AlterTable
ALTER TABLE "ComponentLibraryMedia" DROP COLUMN "component_library_id",
ADD COLUMN     "library_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "KitLibraryMedia" DROP COLUMN "kit_library_id",
ADD COLUMN     "library_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PluginLibraryMedia" DROP COLUMN "plugin_library_id",
ADD COLUMN     "library_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "ComponentLibraryMedia" ADD CONSTRAINT "ComponentLibraryMedia_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "ComponentLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PluginLibraryMedia" ADD CONSTRAINT "PluginLibraryMedia_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "PluginLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitLibraryMedia" ADD CONSTRAINT "KitLibraryMedia_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "KitLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
