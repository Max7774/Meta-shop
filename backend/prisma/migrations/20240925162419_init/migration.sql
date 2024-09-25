-- CreateEnum
CREATE TYPE "EnumOrderItemStatus" AS ENUM ('Pending', 'Payed', 'In_Delivery', 'Delivered', 'Canceled');

-- CreateEnum
CREATE TYPE "EnumRoleOfUser" AS ENUM ('ADMIN', 'DEFAULT_USER', 'MANAGER', 'COURIER');

-- CreateTable
CREATE TABLE "User" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "phone_number" TEXT NOT NULL,
    "birth_day" TEXT,
    "first_name" TEXT,
    "second_name" TEXT,
    "password" TEXT,
    "avatar_path" TEXT DEFAULT 'default-avatar.png',
    "verified" BOOLEAN,
    "verifyToken" TEXT,
    "role" "EnumRoleOfUser" NOT NULL DEFAULT 'DEFAULT_USER',
    "currentAddress" TEXT
);

-- CreateTable
CREATE TABLE "Product" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "peculiarities" TEXT,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "images" TEXT[] DEFAULT ARRAY['default-product-photo.png']::TEXT[],
    "unitofmeasurement" TEXT NOT NULL,
    "categoryUuid" TEXT,
    "userUuid" TEXT,
    "subcategoryUuid" TEXT
);

-- CreateTable
CREATE TABLE "UserClick" (
    "uuid" TEXT NOT NULL,
    "clickedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userUuid" TEXT NOT NULL,
    "productUuid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "PhotoFile" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "url" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "originalname" TEXT NOT NULL,
    "mimetype" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "productUuid" TEXT,
    "categoryUuid" TEXT
);

-- CreateTable
CREATE TABLE "Category" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "icon" TEXT DEFAULT 'default-product-photo.png',
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Subcategory" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "categoryUuid" TEXT
);

-- CreateTable
CREATE TABLE "Review" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL,
    "productUuid" TEXT
);

-- CreateTable
CREATE TABLE "Order" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "orderId" TEXT NOT NULL,
    "comment" TEXT,
    "total" INTEGER NOT NULL,
    "status" "EnumOrderItemStatus" NOT NULL DEFAULT 'Pending',
    "addressUuid" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Order_item" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "orderUuid" TEXT,
    "productUuid" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Address" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "town" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "apartment" TEXT NOT NULL,
    "intercom" TEXT NOT NULL,
    "entrance" TEXT NOT NULL,
    "floor" TEXT NOT NULL,
    "userUuid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_number_key" ON "User"("phone_number");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- CreateIndex
CREATE UNIQUE INDEX "User_verifyToken_key" ON "User"("verifyToken");

-- CreateIndex
CREATE UNIQUE INDEX "Product_uuid_key" ON "Product"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "UserClick_uuid_key" ON "UserClick"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoFile_uuid_key" ON "PhotoFile"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoFile_url_key" ON "PhotoFile"("url");

-- CreateIndex
CREATE UNIQUE INDEX "PhotoFile_categoryUuid_key" ON "PhotoFile"("categoryUuid");

-- CreateIndex
CREATE UNIQUE INDEX "Category_uuid_key" ON "Category"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_uuid_key" ON "Subcategory"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Subcategory_slug_key" ON "Subcategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Review_uuid_key" ON "Review"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Order_uuid_key" ON "Order"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderId_key" ON "Order"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "Order_item_uuid_key" ON "Order_item"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Address_uuid_key" ON "Address"("uuid");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "Category"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_subcategoryUuid_fkey" FOREIGN KEY ("subcategoryUuid") REFERENCES "Subcategory"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClick" ADD CONSTRAINT "UserClick_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "Product"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserClick" ADD CONSTRAINT "UserClick_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoFile" ADD CONSTRAINT "PhotoFile_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "Product"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subcategory" ADD CONSTRAINT "Subcategory_categoryUuid_fkey" FOREIGN KEY ("categoryUuid") REFERENCES "Category"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "Product"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_addressUuid_fkey" FOREIGN KEY ("addressUuid") REFERENCES "Address"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_item" ADD CONSTRAINT "Order_item_orderUuid_fkey" FOREIGN KEY ("orderUuid") REFERENCES "Order"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order_item" ADD CONSTRAINT "Order_item_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "Product"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_userUuid_fkey" FOREIGN KEY ("userUuid") REFERENCES "User"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
