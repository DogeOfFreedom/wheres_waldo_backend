-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "coords" JSONB NOT NULL,
    "dimensions" JSONB NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Level_name_key" ON "Level"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Level_img_key" ON "Level"("img");
