-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" VARCHAR(2) NOT NULL,
    "locality" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "street_address" TEXT NOT NULL,
    "premise" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchasedComponent" (
    "id" TEXT NOT NULL,
    "purchased_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "component_id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,

    CONSTRAINT "PurchasedComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchasedPlugin" (
    "id" TEXT NOT NULL,
    "purchased_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "plugin_id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,
    "subscription" BOOLEAN NOT NULL DEFAULT false,
    "plugin_subscription_id" TEXT NOT NULL,

    CONSTRAINT "PurchasedPlugin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginSubscription" (
    "id" TEXT NOT NULL,
    "purchased_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "renew_date" TIMESTAMP(3) NOT NULL,
    "plugin_id" TEXT NOT NULL,

    CONSTRAINT "PluginSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PurchasedKit" (
    "id" TEXT NOT NULL,
    "purchased_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "kit_id" TEXT NOT NULL,
    "invoice_id" TEXT NOT NULL,

    CONSTRAINT "PurchasedKit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "subscription" BOOLEAN NOT NULL DEFAULT false,
    "user_id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "free" BOOLEAN NOT NULL DEFAULT true,
    "price" INTEGER NOT NULL,
    "currency_code" TEXT NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "free_trial" BOOLEAN NOT NULL,
    "free_trial_duration" INTEGER NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Permission" (
    "id" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Permission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSubscription" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "package_id" TEXT NOT NULL,
    "started_date" TIMESTAMP(3) NOT NULL,
    "renew_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteAccess" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "permission_level" INTEGER NOT NULL,

    CONSTRAINT "SiteAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Site" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "bs_version" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "domain" TEXT NOT NULL,

    CONSTRAINT "Site_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "width" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "uploaded" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "types" TEXT[],
    "title" TEXT NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Developer" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" VARCHAR(2) NOT NULL,
    "locality" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "street_address" TEXT NOT NULL,
    "premise" TEXT NOT NULL,
    "profile_picture" TEXT NOT NULL,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL,
    "version" TEXT NOT NULL,
    "repository" TEXT NOT NULL,
    "commit" TEXT NOT NULL,

    CONSTRAINT "Version_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComponentLibrary" (
    "id" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "developer_id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],
    "version_id" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "free" BOOLEAN NOT NULL DEFAULT true,
    "price" INTEGER NOT NULL,
    "currency_code" TEXT NOT NULL,
    "banner_url" TEXT NOT NULL,
    "preview_url" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL,

    CONSTRAINT "ComponentLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PluginLibrary" (
    "id" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "developer_id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],
    "version_id" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "free" BOOLEAN NOT NULL DEFAULT true,
    "subscription" BOOLEAN NOT NULL DEFAULT false,
    "price" INTEGER NOT NULL,
    "currency_code" TEXT NOT NULL,
    "banner_url" TEXT NOT NULL,
    "preview_url" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL,

    CONSTRAINT "PluginLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KitLibrary" (
    "id" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "developer_id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "tags" TEXT[],
    "version_id" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL DEFAULT true,
    "free" BOOLEAN NOT NULL DEFAULT true,
    "price" INTEGER NOT NULL,
    "currency_code" TEXT NOT NULL,
    "banner_url" TEXT NOT NULL,
    "preview_url" TEXT NOT NULL,
    "icon_url" TEXT NOT NULL,

    CONSTRAINT "KitLibrary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KitComponent" (
    "id" TEXT NOT NULL,
    "kit_id" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,

    CONSTRAINT "KitComponent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Permission_level_key" ON "Permission"("level");

-- CreateIndex
CREATE UNIQUE INDEX "Developer_email_key" ON "Developer"("email");

-- AddForeignKey
ALTER TABLE "PurchasedComponent" ADD CONSTRAINT "PurchasedComponent_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedComponent" ADD CONSTRAINT "PurchasedComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "ComponentLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedPlugin" ADD CONSTRAINT "PurchasedPlugin_plugin_subscription_id_fkey" FOREIGN KEY ("plugin_subscription_id") REFERENCES "PluginSubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedPlugin" ADD CONSTRAINT "PurchasedPlugin_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedPlugin" ADD CONSTRAINT "PurchasedPlugin_plugin_id_fkey" FOREIGN KEY ("plugin_id") REFERENCES "PluginLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PluginSubscription" ADD CONSTRAINT "PluginSubscription_plugin_id_fkey" FOREIGN KEY ("plugin_id") REFERENCES "PluginLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedKit" ADD CONSTRAINT "PurchasedKit_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedKit" ADD CONSTRAINT "PurchasedKit_kit_id_fkey" FOREIGN KEY ("kit_id") REFERENCES "KitLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteSubscription" ADD CONSTRAINT "SiteSubscription_package_id_fkey" FOREIGN KEY ("package_id") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteSubscription" ADD CONSTRAINT "SiteSubscription_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteAccess" ADD CONSTRAINT "SiteAccess_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteAccess" ADD CONSTRAINT "SiteAccess_permission_level_fkey" FOREIGN KEY ("permission_level") REFERENCES "Permission"("level") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteAccess" ADD CONSTRAINT "SiteAccess_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponentLibrary" ADD CONSTRAINT "ComponentLibrary_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComponentLibrary" ADD CONSTRAINT "ComponentLibrary_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PluginLibrary" ADD CONSTRAINT "PluginLibrary_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PluginLibrary" ADD CONSTRAINT "PluginLibrary_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitLibrary" ADD CONSTRAINT "KitLibrary_developer_id_fkey" FOREIGN KEY ("developer_id") REFERENCES "Developer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitLibrary" ADD CONSTRAINT "KitLibrary_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitComponent" ADD CONSTRAINT "KitComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "ComponentLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KitComponent" ADD CONSTRAINT "KitComponent_kit_id_fkey" FOREIGN KEY ("kit_id") REFERENCES "KitLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
