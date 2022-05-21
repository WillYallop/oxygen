/*
  Warnings:

  - You are about to drop the `Developer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ComponentLibrary" DROP CONSTRAINT "ComponentLibrary_developer_id_fkey";

-- DropForeignKey
ALTER TABLE "KitLibrary" DROP CONSTRAINT "KitLibrary_developer_id_fkey";

-- DropForeignKey
ALTER TABLE "PluginLibrary" DROP CONSTRAINT "PluginLibrary_developer_id_fkey";

-- DropTable
DROP TABLE "Developer";

-- AddForeignKey
ALTER TABLE "ComponentLibrary" ADD CONSTRAINT "ComponentLibrary_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PluginLibrary" ADD CONSTRAINT "PluginLibrary_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitLibrary" ADD CONSTRAINT "KitLibrary_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
