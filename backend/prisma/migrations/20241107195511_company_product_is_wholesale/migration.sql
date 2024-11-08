-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "logoPath" TEXT DEFAULT 'default-product-photo.png';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isWholesale" BOOLEAN DEFAULT false;
