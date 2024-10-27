-- AlterEnum
ALTER TYPE "EnumRoleOfUser" ADD VALUE 'COMPANY';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyUuid" TEXT;

-- CreateTable
CREATE TABLE "Company" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "oficalName" TEXT NOT NULL,
    "registrationNumber" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_uuid_key" ON "Company"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Company_registrationNumber_key" ON "Company"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Company_email_key" ON "Company"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyUuid_fkey" FOREIGN KEY ("companyUuid") REFERENCES "Company"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
