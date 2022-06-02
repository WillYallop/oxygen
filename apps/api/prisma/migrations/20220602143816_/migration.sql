/*
  Warnings:

  - Added the required column `key` to the `Version` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Version" ADD COLUMN     "key" TEXT NOT NULL;
