-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "establishmentId" TEXT;

-- AlterTable
ALTER TABLE "DeliveryRider" ADD COLUMN     "establishmentId" TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "establishmentId" TEXT,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "image" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Client" ADD CONSTRAINT "Client_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeliveryRider" ADD CONSTRAINT "DeliveryRider_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_establishmentId_fkey" FOREIGN KEY ("establishmentId") REFERENCES "Establishment"("id") ON DELETE SET NULL ON UPDATE CASCADE;
