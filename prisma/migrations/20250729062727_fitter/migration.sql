-- CreateTable
CREATE TABLE "UserForm" (
    "id" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "gender" TEXT NOT NULL,
    "bmi" DOUBLE PRECISION NOT NULL,
    "goal" TEXT NOT NULL,
    "bodyType" TEXT NOT NULL,
    "pushups" INTEGER NOT NULL,
    "pullups" INTEGER NOT NULL,
    "squats" INTEGER NOT NULL,
    "crunches" INTEGER NOT NULL,
    "intensity" INTEGER NOT NULL,
    "focusArea" TEXT NOT NULL,
    "workoutPlace" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plan" (
    "id" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "userFormId" TEXT NOT NULL,

    CONSTRAINT "Plan_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Plan" ADD CONSTRAINT "Plan_userFormId_fkey" FOREIGN KEY ("userFormId") REFERENCES "UserForm"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
