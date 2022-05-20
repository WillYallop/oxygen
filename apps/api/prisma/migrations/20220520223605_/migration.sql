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
CREATE TABLE "UserComponent" (
    "id" TEXT NOT NULL,
    "component_id" TEXT NOT NULL,
    "installed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version_id" TEXT NOT NULL,

    CONSTRAINT "UserComponent_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "UserPlugin" (
    "id" TEXT NOT NULL,
    "plugin_id" TEXT NOT NULL,
    "installed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "version_id" TEXT NOT NULL,

    CONSTRAINT "UserPlugin_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "UserKit" (
    "id" TEXT NOT NULL,
    "kit_id" TEXT NOT NULL,
    "installed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserKit_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "SiteMenu" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteMenuItem" (
    "id" TEXT NOT NULL,
    "site_menu_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "parent_item" BOOLEAN NOT NULL DEFAULT false,
    "parent_id" TEXT NOT NULL,
    "external" BOOLEAN NOT NULL DEFAULT false,
    "href" TEXT NOT NULL,
    "page_id" TEXT NOT NULL,

    CONSTRAINT "SiteMenuItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "type" TEXT NOT NULL,
    "post_id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PageComponent" (
    "id" TEXT NOT NULL,
    "page_id" TEXT NOT NULL,
    "added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "component_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "field_type" TEXT NOT NULL,

    CONSTRAINT "PageComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PostType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "site_id" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "template_id" TEXT NOT NULL,

    CONSTRAINT "PostType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "site_id" TEXT NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateComponent" (
    "id" TEXT NOT NULL,
    "template_id" TEXT NOT NULL,
    "added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modified" TIMESTAMP(3) NOT NULL,
    "component_id" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "TemplateComponent_pkey" PRIMARY KEY ("id")
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
ALTER TABLE "UserComponent" ADD CONSTRAINT "UserComponent_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserComponent" ADD CONSTRAINT "UserComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "ComponentLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedComponent" ADD CONSTRAINT "PurchasedComponent_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedComponent" ADD CONSTRAINT "PurchasedComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "ComponentLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlugin" ADD CONSTRAINT "UserPlugin_version_id_fkey" FOREIGN KEY ("version_id") REFERENCES "Version"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPlugin" ADD CONSTRAINT "UserPlugin_plugin_id_fkey" FOREIGN KEY ("plugin_id") REFERENCES "PluginLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedPlugin" ADD CONSTRAINT "PurchasedPlugin_plugin_subscription_id_fkey" FOREIGN KEY ("plugin_subscription_id") REFERENCES "PluginSubscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedPlugin" ADD CONSTRAINT "PurchasedPlugin_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PurchasedPlugin" ADD CONSTRAINT "PurchasedPlugin_plugin_id_fkey" FOREIGN KEY ("plugin_id") REFERENCES "PluginLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PluginSubscription" ADD CONSTRAINT "PluginSubscription_plugin_id_fkey" FOREIGN KEY ("plugin_id") REFERENCES "PluginLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserKit" ADD CONSTRAINT "UserKit_kit_id_fkey" FOREIGN KEY ("kit_id") REFERENCES "KitLibrary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "SiteMenu" ADD CONSTRAINT "SiteMenu_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteMenuItem" ADD CONSTRAINT "SiteMenuItem_site_menu_id_fkey" FOREIGN KEY ("site_menu_id") REFERENCES "SiteMenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SiteMenuItem" ADD CONSTRAINT "SiteMenuItem_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "PostType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageComponent" ADD CONSTRAINT "PageComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "UserComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PageComponent" ADD CONSTRAINT "PageComponent_page_id_fkey" FOREIGN KEY ("page_id") REFERENCES "Page"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostType" ADD CONSTRAINT "PostType_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PostType" ADD CONSTRAINT "PostType_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Template" ADD CONSTRAINT "Template_site_id_fkey" FOREIGN KEY ("site_id") REFERENCES "Site"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateComponent" ADD CONSTRAINT "TemplateComponent_component_id_fkey" FOREIGN KEY ("component_id") REFERENCES "UserComponent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateComponent" ADD CONSTRAINT "TemplateComponent_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
