/*
  Warnings:

  - You are about to drop the column `specialist_id` on the `doctors` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "doctors" DROP CONSTRAINT "doctors_specialist_id_fkey";

-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "specialist_id";

-- CreateTable
CREATE TABLE "hospital_doctors" (
    "id" TEXT NOT NULL,
    "hospital_id" TEXT NOT NULL,
    "doctor_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "hospital_doctors_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "hospital_doctors" ADD CONSTRAINT "hospital_doctors_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "hospitals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "hospital_doctors" ADD CONSTRAINT "hospital_doctors_doctor_id_fkey" FOREIGN KEY ("doctor_id") REFERENCES "doctors"("id") ON DELETE CASCADE ON UPDATE CASCADE;
