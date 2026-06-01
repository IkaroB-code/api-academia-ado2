import prisma from "../lib/prisma.js";

// Criar ficha
export async function criarFicha(req, res) {
  const { exercicio, series, repeticoes, instrutorId, planoId } = req.body;
  if (!exercicio || !series || !repeticoes || !instrutorId || !planoId) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  try {
    const instrutor = await prisma.instrutor.findUnique({ where: { id: Number(instrutorId) } });
    if (!instrutor) return res.status(404).json({ error: "Instrutor não encontrado" });

    const plano = await prisma.planoTreino.findUnique({ where: { id: Number(planoId) } });
    if (!plano) return res.status(404).json({ error: "Plano não encontrado" });

    const ficha = await prisma.ficha.create({
      data: { exercicio, series, repeticoes, instrutorId: Number(instrutorId), planoId: Number(planoId) }
    });

    res.status(201).json(ficha);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar ficha", details: error });
  }
}

// Listar todas as fichas
export async function listarFichas(req, res) {
  const fichas = await prisma.ficha.findMany({ include: { instrutor: true, plano: true } });
  res.json(fichas);
}

// Buscar ficha por ID
export async function buscarFicha(req, res) {
  const { id } = req.params;
  const ficha = await prisma.ficha.findUnique({
    where: { id: Number(id) },
    include: { instrutor: true, plano: true }
  });
  if (!ficha) return res.status(404).json({ error: "Ficha não encontrada" });
  res.json(ficha);
}

// Atualizar ficha
export async function atualizarFicha(req, res) {
  const { id } = req.params;
  const { exercicio, series, repeticoes } = req.body;
  try {
    const ficha = await prisma.ficha.update({
      where: { id: Number(id) },
      data: { exercicio, series, repeticoes }
    });
    res.json(ficha);
  } catch {
    res.status(404).json({ error: "Ficha não encontrada" });
  }
}

// Deletar ficha
export async function deletarFicha(req, res) {
  const { id } = req.params;
  try {
    await prisma.ficha.delete({ where: { id: Number(id) } });
    res.json({ message: "Ficha deletada com sucesso" });
  } catch {
    res.status(404).json({ error: "Ficha não encontrada" });
  }
}
