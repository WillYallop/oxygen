/*
  Warnings:

  - You are about to drop the `ComponentLibrary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ComponentLibraryMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ComponentVersion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KitLibrary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KitLibraryMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PluginLibrary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PluginLibraryMedia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PluginVersion` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ComponentLibrary" DROP CONSTRAINT "ComponentLibrary_developer_id_fkey";

-- DropForeignKey
ALTER TABLE "ComponentLibraryMedia" DROP CONSTRAINT "ComponentLibraryMedia_library_id_fkey";

-- DropForeignKey
ALTER TABLE "ComponentVersion" DROP CONSTRAINT "ComponentVersion_library_id_fkey";

-- DropForeignKey
ALTER TABLE "KitComponent" DROP CONSTRAINT "KitComponent_component_id_fkey";

-- DropForeignKey
ALTER TABLE "KitComponent" DROP CONSTRAINT "KitComponent_kit_id_fkey";

-- DropForeignKey
ALTER TABLE "KitLibrary" DROP CONSTRAINT "KitLibrary_developer_id_fkey";

-- DropForeignKey
ALTER TABLE "KitLibraryMedia" DROP CONSTRAINT "KitLibraryMedia_library_id_fkey";

-- DropForeignKey
ALTER TABLE "PluginLibrary" DROP CONSTRAINT "PluginLibrary_developer_id_fkey";

-- DropForeignKey
ALTER TABLE "PluginLibraryMedia" DROP CONSTRAINT "PluginLibraryMedia_library_id_fkey";

-- DropForeignKey
ALTER TABLE "PluginSubscription" DROP CONSTRAINT "PluginSubscription_plugin_id_fkey";

-- DropForeignKey
ALTER TABLE "PluginVersion" DROP CONSTRAINT "PluginVersion_library_id_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedComponent" DROP CONSTRAINT "PurchasedComponent_component_id_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedKit" DROP CONSTRAINT "PurchasedKit_kit_id_fkey";

-- DropForeignKey
ALTER TABLE "PurchasedPlugin" DROP CONSTRAINT "PurchasedPlugin_plugin_id_fkey";

-- DropTable
DROP TABLE "ComponentLibrary";

-- DropTable
DROP TABLE "ComponentLibraryMedia";

-- DropTable
DROP TABLE "ComponentVersion";

-- DropTable
DROP TABLE "KitLibrary";

-- DropTable
DROP TABLE "KitLibraryMedia";

-- DropTable
DROP TABLE "PluginLibrary";

-- DropTable
DROP TABLE "PluginLibraryMedia";

-- DropTable
DROP TABLE "PluginVersion";

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
    "library_id" TEXT NOT NULL,

    CONSTRAINT "LibraryMedia_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LibraryVersion" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "library_id" TEXT NOT NULL,

    CONSTRAINT "LibraryVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "deactivated" BOOLEAN NOT NULL DEFAULT false,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "developer_id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "tags" TEXT[],
    "public" BOOLEAN NOT NULL DEFAULT true,
    "free" BOOLEAN NOT NULL DEFAULT true,
    "price" INTEGER NOT NULL,
    "currency_code" TEXT NOT NULL,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PurchasedComponent" ADD CONSTRAINT "PurchasedComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedPlugin" ADD CONSTRAINT "PurchasedPlugin_plugin_id_fkey" FOREIGN KEY ("plugin_id") REFERENCES "Library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PluginSubscription" ADD CONSTRAINT "PluginSubscription_plugin_id_fkey" FOREIGN KEY ("plugin_id") REFERENCES "Library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedKit" ADD CONSTRAINT "PurchasedKit_kit_id_fkey" FOREIGN KEY ("kit_id") REFERENCES "Library"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryMedia" ADD CONSTRAINT "LibraryMedia_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LibraryVersion" ADD CONSTRAINT "LibraryVersion_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitComponent" ADD CONSTRAINT "KitComponent_kit_id_fkey" FOREIGN KEY ("kit_id") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitComponent" ADD CONSTRAINT "KitComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "Library"("id") ON DELETE CASCADE ON UPDATE CASCADE;
