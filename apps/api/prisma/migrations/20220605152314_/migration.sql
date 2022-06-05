-- AlterTable
ALTER TABLE "ComponentLibrary" ADD COLUMN     "inc_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "inc_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "KitLibrary" ADD COLUMN     "inc_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "inc_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "PluginLibrary" ADD COLUMN     "inc_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "PluginSubscription" ADD COLUMN     "inc_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "PurchasedComponent" ADD COLUMN     "inc_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "PurchasedKit" ADD COLUMN     "inc_id" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "PurchasedPlugin" ADD COLUMN     "inc_id" SERIAL NOT NULL;
