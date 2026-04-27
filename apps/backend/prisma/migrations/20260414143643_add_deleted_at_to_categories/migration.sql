-- DropIndex
DROP INDEX "categories_name_key";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "deletedAt" TIMESTAMP(3);
