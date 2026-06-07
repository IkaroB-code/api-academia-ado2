-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instrutor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Instrutor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlanoTreino" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "alunoId" INTEGER NOT NULL,

    CONSTRAINT "PlanoTreino_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ficha" (
    "id" SERIAL NOT NULL,
    "exercicio" TEXT NOT NULL,
    "series" INTEGER NOT NULL,
    "repeticoes" INTEGER NOT NULL,
    "instrutorId" INTEGER NOT NULL,
    "planoId" INTEGER NOT NULL,

    CONSTRAINT "Ficha_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Instrutor_email_key" ON "Instrutor"("email");

-- CreateIndex
CREATE INDEX "PlanoTreino_alunoId_fkey" ON "PlanoTreino"("alunoId");

-- CreateIndex
CREATE INDEX "Ficha_instrutorId_fkey" ON "Ficha"("instrutorId");

-- CreateIndex
CREATE INDEX "Ficha_planoId_fkey" ON "Ficha"("planoId");

-- AddForeignKey
ALTER TABLE "PlanoTreino" ADD CONSTRAINT "FK_PlanoTreino_Aluno" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "FK_Ficha_Instrutor" FOREIGN KEY ("instrutorId") REFERENCES "Instrutor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ficha" ADD CONSTRAINT "FK_Ficha_Plano" FOREIGN KEY ("planoId") REFERENCES "PlanoTreino"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
