-- CreateTable
CREATE TABLE "Leads" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "contato" TEXT NOT NULL,
    "origem_lead" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "consultor" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Leads_pkey" PRIMARY KEY ("id")
);
