import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";

export async function criarAluno(req, res) {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Dados invalidos" });
  }

  try {
    const existente = await prisma.aluno.findUnique({ where: { email } });
    if (existente) return res.status(400).json({ error: "Email ja cadastrado" });

    const hashed = await bcrypt.hash(senha, 10);
    const aluno = await prisma.aluno.create({
      data: { nome, email, senha: hashed },
    });

    res.status(201).json(aluno);
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar", details: error });
  }
}

export async function listarAlunos(req, res) {
  const alunos = await prisma.aluno.findMany();
  res.json(alunos);
}

export async function buscarAluno(req, res) {
  const { id } = req.params;
  const aluno = await prisma.aluno.findUnique({ where: { id: Number(id) } });
  if (!aluno) return res.status(404).json({ error: "Aluno nao encontrado" });
  res.json(aluno);
}

export async function atualizarAluno(req, res) {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    const aluno = await prisma.aluno.update({
      where: { id: Number(id) },
      data: { nome, email },
    });
    res.json(aluno);
  } catch {
    res.status(404).json({ error: "Aluno nao encontrado" });
  }
}

export async function deletarAluno(req, res) {
  const { id } = req.params;
  const alunoId = Number(id);

  try {
    await prisma.$transaction([
      prisma.ficha.deleteMany({
        where: {
          plano: {
            alunoId,
          },
        },
      }),
      prisma.planoTreino.deleteMany({ where: { alunoId } }),
      prisma.aluno.delete({ where: { id: alunoId } }),
    ]);

    res.json({ message: "Aluno deletado com sucesso" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Aluno nao encontrado" });
    }

    res.status(500).json({ error: "Erro ao deletar aluno" });
  }
}
