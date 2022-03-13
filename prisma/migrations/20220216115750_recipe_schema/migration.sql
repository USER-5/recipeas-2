/*
  Warnings:

  - The primary key for the `Recipe` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `handsOnMinutes` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servings` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalMinutes` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `id` on the `Recipe` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_pkey",
ADD COLUMN     "handsOnMinutes" INTEGER NOT NULL,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "servings" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "totalMinutes" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id");
