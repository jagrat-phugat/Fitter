/*
  Warnings:

  - A unique constraint covering the columns `[userFormId]` on the table `Plan` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Plan_userFormId_key" ON "Plan"("userFormId");
