-- CreateEnum
CREATE TYPE "EnumTypeOfClaim" AS ENUM ('Cooperation', 'Complaint', 'Other');

-- CreateTable
CREATE TABLE "Claims" (
    "uuid" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "claimType" "EnumTypeOfClaim" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Claims_uuid_key" ON "Claims"("uuid");
