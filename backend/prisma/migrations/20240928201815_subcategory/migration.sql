/*
  Warnings:

  - You are about to drop the column `categoryUuid` on the `PhotoFile` table. All the data in the column will be lost.
  - You are about to drop the column `categoryUuid` on the `Product` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[subcategoryUuid]` on the table `PhotoFile` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_categoryUuid_fkey";

-- DropIndex
DROP INDEX "PhotoFile_categoryUuid_key";

-- AlterTable
ALTER TABLE "PhotoFile" DROP COLUMN "categoryUuid",
ADD COLUMN     "subcategoryUuid" TEXT;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "categoryUuid";

-- AlterTable
ALTER TABLE "Subcategory" ADD COLUMN     "icon" TEXT DEFAULT 'default-product-photo.png';

-- CreateIndex
CREATE UNIQUE INDEX "PhotoFile_subcategoryUuid_key" ON "PhotoFile"("subcategoryUuid");
