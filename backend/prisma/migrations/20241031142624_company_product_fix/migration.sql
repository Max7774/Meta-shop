/*
  Warnings:

  - You are about to drop the `CompanyProductPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CompanyProductPrice" DROP CONSTRAINT "CompanyProductPrice_companyUuid_fkey";

-- DropForeignKey
ALTER TABLE "CompanyProductPrice" DROP CONSTRAINT "CompanyProductPrice_productUuid_fkey";

-- DropTable
DROP TABLE "CompanyProductPrice";

-- CreateTable
CREATE TABLE "CompanyProduct" (
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
CREATE UNIQUE INDEX "CompanyProduct_uuid_key" ON "CompanyProduct"("uuid");

-- AddForeignKey
ALTER TABLE "CompanyProduct" ADD CONSTRAINT "CompanyProduct_productUuid_fkey" FOREIGN KEY ("productUuid") REFERENCES "Product"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CompanyProduct" ADD CONSTRAINT "CompanyProduct_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "Company"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
