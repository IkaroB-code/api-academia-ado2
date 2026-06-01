import prisma from "../lib/prisma.js";

// Criar instrutor
export async function criarInstrutor(req, res) {
  const { nome, email } = req.body;
  if (!nome || !email) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  try {
    const existente = await prisma.instrutor.findUnique({ where: { email } });
    if (existente) return res.status(400).json({ error: "Email já cadastrado" });

    const instrutor = await prisma.instrutor.create({ data: { nome, email } });
    res.status(201).json(instrutor);
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar instrutor", details: error });
  }
}

// Listar instrutores
export async function listarInstrutores(req, res) {
  const instrutores = await prisma.instrutor.findMany();
  res.json(instrutores);
}

// Buscar instrutor por ID
export async function buscarInstrutor(req, res) {
  const { id } = req.params;
  const instrutor = await prisma.instrutor.findUnique({
    where: { id: Number(id) },
    include: { fichas: true }
  });
  if (!instrutor) return res.status(404).json({ error: "Instrutor não encontrado" });
  res.json(instrutor);
}

// Atualizar instrutor
export async function atualizarInstrutor(req, res) {
  const { id } = req.params;
  const { nome, email } = req.body;
  try {
    const instrutor = await prisma.instrutor.update({
      where: { id: Number(id) },
      data: { nome, email }
    });
    res.json(instrutor);
  } catch {
    res.status(404).json({ error: "Instrutor não encontrado" });
  }
}

// Deletar instrutor
export async function deletarInstrutor(req, res) {
  const { id } = req.params;
  try {
    await prisma.instrutor.delete({ where: { id: Number(id) } });
    res.json({ message: "Instrutor deletado com sucesso" });
  } catch {
    res.status(404).json({ error: "Instrutor não encontrado" });
  }
}
