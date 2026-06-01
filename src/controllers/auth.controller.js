import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function register(req, res) {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ error: "Dados inválidos" });
  }

  try {
    const existente = await prisma.aluno.findUnique({ where: { email } });
    if (existente) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    const hashed = await bcrypt.hash(senha, 10);
    const aluno = await prisma.aluno.create({
      data: { nome, email, senha: hashed }
    });

    res.status(201).json({ id: aluno.id, nome: aluno.nome, email: aluno.email });
  } catch (error) {
    res.status(500).json({ error: "Erro ao cadastrar", details: error });
  }
}

export async function login(req, res) {
  const { email, senha } = req.body;
  const aluno = await prisma.aluno.findUnique({ where: { email } });
  if (!aluno) return res.status(404).json({ error: "Usuário não encontrado" });

  const valid = await bcrypt.compare(senha, aluno.senha);
  if (!valid) return res.status(401).json({ error: "Senha inválida" });

  const token = jwt.sign({ id: aluno.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
}
