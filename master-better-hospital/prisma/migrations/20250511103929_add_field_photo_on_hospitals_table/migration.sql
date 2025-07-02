/*
  Warnings:

  - Added the required column `photo` to the `hospitals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "hospitals" ADD COLUMN     "photo" TEXT NOT NULL;
