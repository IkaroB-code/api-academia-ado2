import prisma from "../lib/prisma.js";

// Criar plano
export async function criarPlano(req, res) {
  const { titulo, descricao, alunoId } = req.body;
  if (!titulo || !descricao || !alunoId) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  try {
    const aluno = await prisma.aluno.findUnique({ where: { id: Number(alunoId) } });
    if (!aluno) return res.status(404).json({ error: "Aluno não encontrado" });

    const plano = await prisma.planoTreino.create({
      data: { titulo, descricao, alunoId: Number(alunoId) }
    });

    res.status(201).json(plano);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar plano", details: error });
  }
}

// Listar todos os planos
export async function listarPlanos(req, res) {
  const planos = await prisma.planoTreino.findMany({ include: { aluno: true } });
  res.json(planos);
}

// Buscar plano por ID
export async function buscarPlano(req, res) {
  const { id } = req.params;
  const plano = await prisma.planoTreino.findUnique({
    where: { id: Number(id) },
    include: { aluno: true, fichas: true }
  });
  if (!plano) return res.status(404).json({ error: "Plano não encontrado" });
  res.json(plano);
}

// Atualizar plano
export async function atualizarPlano(req, res) {
  const { id } = req.params;
  const { titulo, descricao } = req.body;
  try {
    const plano = await prisma.planoTreino.update({
      where: { id: Number(id) },
      data: { titulo, descricao }
    });
    res.json(plano);
  } catch {
    res.status(404).json({ error: "Plano não encontrado" });
  }
}

// Deletar plano
export async function deletarPlano(req, res) {
  const { id } = req.params;
  try {
    await prisma.planoTreino.delete({ where: { id: Number(id) } });
    res.json({ message: "Plano deletado com sucesso" });
  } catch {
    res.status(404).json({ error: "Plano não encontrado" });
  }
}
