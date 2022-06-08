/*
  Warnings:

  - You are about to drop the `LibraryMedia` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LibraryMedia" DROP CONSTRAINT "LibraryMedia_component_library_id_fkey";

-- DropForeignKey
ALTER TABLE "LibraryMedia" DROP CONSTRAINT "LibraryMedia_kit_library_id_fkey";

-- DropForeignKey
ALTER TABLE "LibraryMedia" DROP CONSTRAINT "LibraryMedia_plugin_library_id_fkey";

-- DropTable
DROP TABLE "LibraryMedia";

-- CreateTable
CREATE TABLE "ComponentLibraryMedia" (
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
    "component_library_id" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "ComponentLibraryMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginLibraryMedia" (
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
    "plugin_library_id" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "PluginLibraryMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KitLibraryMedia" (
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
    "kit_library_id" TEXT NOT NULL DEFAULT E'',

    CONSTRAINT "KitLibraryMedia_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ComponentLibraryMedia" ADD CONSTRAINT "ComponentLibraryMedia_component_library_id_fkey" FOREIGN KEY ("component_library_id") REFERENCES "ComponentLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PluginLibraryMedia" ADD CONSTRAINT "PluginLibraryMedia_plugin_library_id_fkey" FOREIGN KEY ("plugin_library_id") REFERENCES "PluginLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitLibraryMedia" ADD CONSTRAINT "KitLibraryMedia_kit_library_id_fkey" FOREIGN KEY ("kit_library_id") REFERENCES "KitLibrary"("id") ON DELETE CASCADE ON UPDATE CASCADE;
