import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // busca todos os alunos
  const novoAluno = await prisma.aluno.create({
    data: {
        nome: "Ikaro",
        email: "ikaro@gmail.com",
        senha: "1234"
    }
  });
  console.log("aluno criado:", novoAluno);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
