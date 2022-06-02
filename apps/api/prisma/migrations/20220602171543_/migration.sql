/*
  Warnings:

  - You are about to drop the `Version` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Version" DROP CONSTRAINT "Version_component_id_fkey";

-- DropForeignKey
ALTER TABLE "Version" DROP CONSTRAINT "Version_plugin_id_fkey";

-- DropTable
DROP TABLE "Version";

-- CreateTable
CREATE TABLE "ComponentVersion" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "library_id" TEXT NOT NULL,

    CONSTRAINT "ComponentVersion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginVersion" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "library_id" TEXT NOT NULL,

    CONSTRAINT "PluginVersion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ComponentVersion" ADD CONSTRAINT "ComponentVersion_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "ComponentLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PluginVersion" ADD CONSTRAINT "PluginVersion_library_id_fkey" FOREIGN KEY ("library_id") REFERENCES "PluginLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
