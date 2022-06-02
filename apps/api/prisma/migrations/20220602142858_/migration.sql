/*
  Warnings:

  - You are about to drop the column `version_id` on the `ComponentLibrary` table. All the data in the column will be lost.
  - You are about to drop the column `version_id` on the `KitLibrary` table. All the data in the column will be lost.
  - You are about to drop the column `version_id` on the `PluginLibrary` table. All the data in the column will be lost.
  - Added the required column `component_id` to the `Version` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plugin_id` to the `Version` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Version` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ComponentLibrary" DROP CONSTRAINT "ComponentLibrary_version_id_fkey";

-- DropForeignKey
ALTER TABLE "KitLibrary" DROP CONSTRAINT "KitLibrary_version_id_fkey";

-- DropForeignKey
ALTER TABLE "PluginLibrary" DROP CONSTRAINT "PluginLibrary_version_id_fkey";

-- AlterTable
ALTER TABLE "ComponentLibrary" DROP COLUMN "version_id";

-- AlterTable
ALTER TABLE "KitLibrary" DROP COLUMN "version_id";

-- AlterTable
ALTER TABLE "PluginLibrary" DROP COLUMN "version_id";

-- AlterTable
ALTER TABLE "Version" ADD COLUMN     "component_id" TEXT NOT NULL,
ADD COLUMN     "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "plugin_id" TEXT NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "ComponentLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Version" ADD CONSTRAINT "Version_plugin_id_fkey" FOREIGN KEY ("plugin_id") REFERENCES "PluginLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
