/*
  Warnings:

  - A unique constraint covering the columns `[companyUuid]` on the table `PhotoFile` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "deliveryPrice" INTEGER NOT NULL DEFAULT 800,
ADD COLUMN     "minimumOrderPrice" INTEGER NOT NULL DEFAULT 7000;

-- AlterTable
ALTER TABLE "PhotoFile" ADD COLUMN     "companyUuid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "PhotoFile_companyUuid_key" ON "PhotoFile"("companyUuid");
