-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "companyUuid" TEXT;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "Company"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
