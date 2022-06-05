/*
  Warnings:

  - A unique constraint covering the columns `[inc_id]` on the table `ComponentLibrary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inc_id]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inc_id]` on the table `KitLibrary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inc_id]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inc_id]` on the table `PluginLibrary` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inc_id]` on the table `PluginSubscription` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inc_id]` on the table `PurchasedComponent` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inc_id]` on the table `PurchasedKit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inc_id]` on the table `PurchasedPlugin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ComponentLibrary_inc_id_key" ON "ComponentLibrary"("inc_id");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_inc_id_key" ON "Invoice"("inc_id");

-- CreateIndex
CREATE UNIQUE INDEX "KitLibrary_inc_id_key" ON "KitLibrary"("inc_id");

-- CreateIndex
CREATE UNIQUE INDEX "Media_inc_id_key" ON "Media"("inc_id");

-- CreateIndex
CREATE UNIQUE INDEX "PluginLibrary_inc_id_key" ON "PluginLibrary"("inc_id");

-- CreateIndex
CREATE UNIQUE INDEX "PluginSubscription_inc_id_key" ON "PluginSubscription"("inc_id");

-- CreateIndex
CREATE UNIQUE INDEX "PurchasedComponent_inc_id_key" ON "PurchasedComponent"("inc_id");

-- CreateIndex
CREATE UNIQUE INDEX "PurchasedKit_inc_id_key" ON "PurchasedKit"("inc_id");

-- CreateIndex
CREATE UNIQUE INDEX "PurchasedPlugin_inc_id_key" ON "PurchasedPlugin"("inc_id");
