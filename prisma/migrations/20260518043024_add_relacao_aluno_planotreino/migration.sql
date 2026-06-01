-- CreateTable
CREATE TABLE `Instrutor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Instrutor_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlanoTreino` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `alunoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ficha` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `exercicio` VARCHAR(191) NOT NULL,
    `series` INTEGER NOT NULL,
    `repeticoes` INTEGER NOT NULL,
    `instrutorId` INTEGER NOT NULL,
    `planoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlanoTreino` ADD CONSTRAINT `PlanoTreino_alunoId_fkey` FOREIGN KEY (`alunoId`) REFERENCES `Aluno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ficha` ADD CONSTRAINT `Ficha_planoId_fkey` FOREIGN KEY (`planoId`) REFERENCES `PlanoTreino`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ficha` ADD CONSTRAINT `Ficha_instrutorId_fkey` FOREIGN KEY (`instrutorId`) REFERENCES `Instrutor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
