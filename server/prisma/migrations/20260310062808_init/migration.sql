-- CreateTable
CREATE TABLE "Dog" (
    "id" TEXT NOT NULL,
    "shelterluvId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT,
    "age" TEXT,
    "sex" TEXT,
    "color" TEXT,
    "description" TEXT,
    "photoUrl" TEXT,
    "status" TEXT,
    "inFoster" BOOLEAN NOT NULL DEFAULT false,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "internalNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Dog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Dog_shelterluvId_key" ON "Dog"("shelterluvId");
