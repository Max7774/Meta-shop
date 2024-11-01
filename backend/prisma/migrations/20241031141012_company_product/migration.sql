/*
  Warnings:

  - You are about to drop the column `companyUuid` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `discount` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_companyUuid_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "companyUuid",
DROP COLUMN "discount",
DROP COLUMN "price",
DROP COLUMN "quantity";

-- CreateTable
CREATE TABLE "CompanyProductPrice" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "productUuid" TEXT NOT NULL,
    "companyUuid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CompanyProductPrice_uuid_key" ON "CompanyProductPrice"("uuid");

-- AddForeignKey
ALTER TABLE "CompanyProductPrice" ADD CONSTRAINT "CompanyProductPrice_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "Product"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyProductPrice" ADD CONSTRAINT "CompanyProductPrice_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "Company"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
