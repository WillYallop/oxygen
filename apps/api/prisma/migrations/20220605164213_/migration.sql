/*
  Warnings:

  - You are about to drop the column `inc_id` on the `ComponentLibrary` table. All the data in the column will be lost.
  - You are about to drop the column `inc_id` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `inc_id` on the `KitLibrary` table. All the data in the column will be lost.
  - You are about to drop the column `inc_id` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `inc_id` on the `PluginLibrary` table. All the data in the column will be lost.
  - You are about to drop the column `inc_id` on the `PluginSubscription` table. All the data in the column will be lost.
  - You are about to drop the column `inc_id` on the `PurchasedComponent` table. All the data in the column will be lost.
  - You are about to drop the column `inc_id` on the `PurchasedKit` table. All the data in the column will be lost.
  - You are about to drop the column `inc_id` on the `PurchasedPlugin` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ComponentLibrary_inc_id_key";

-- DropIndex
DROP INDEX "Invoice_inc_id_key";

-- DropIndex
DROP INDEX "KitLibrary_inc_id_key";

-- DropIndex
DROP INDEX "Media_inc_id_key";

-- DropIndex
DROP INDEX "PluginLibrary_inc_id_key";

-- DropIndex
DROP INDEX "PluginSubscription_inc_id_key";

-- DropIndex
DROP INDEX "PurchasedComponent_inc_id_key";

-- DropIndex
DROP INDEX "PurchasedKit_inc_id_key";

-- DropIndex
DROP INDEX "PurchasedPlugin_inc_id_key";

-- AlterTable
ALTER TABLE "ComponentLibrary" DROP COLUMN "inc_id";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "inc_id";

-- AlterTable
ALTER TABLE "KitLibrary" DROP COLUMN "inc_id";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "inc_id";

-- AlterTable
ALTER TABLE "PluginLibrary" DROP COLUMN "inc_id";

-- AlterTable
ALTER TABLE "PluginSubscription" DROP COLUMN "inc_id";

-- AlterTable
ALTER TABLE "PurchasedComponent" DROP COLUMN "inc_id";

-- AlterTable
ALTER TABLE "PurchasedKit" DROP COLUMN "inc_id";

-- AlterTable
ALTER TABLE "PurchasedPlugin" DROP COLUMN "inc_id";
