/*
  Warnings:

  - A unique constraint covering the columns `[adminId]` on the table `Establishment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `Establishment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Establishment" ADD COLUMN     "adminId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Establishment_adminId_key" ON "Establishment"("adminId");

-- AddForeignKey
ALTER TABLE "Establishment" ADD CONSTRAINT "Establishment_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
