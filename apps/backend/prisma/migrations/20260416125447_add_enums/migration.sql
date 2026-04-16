/*
  Warnings:

  - The `status` column on the `orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `paymentMethod` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'approved', 'delivered', 'cancelled');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('card', 'cash');

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "paymentMethod",
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'pending';
