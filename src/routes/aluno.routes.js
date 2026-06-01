import express from "express";
import { autenticarToken } from "../middlewares/auth.js";
import { criarAluno, listarAlunos, buscarAluno, atualizarAluno, deletarAluno } from "../controllers/aluno.controller.js";

const router = express.Router();

router.post("/", autenticarToken, criarAluno);
router.get("/", autenticarToken, listarAlunos);
router.get("/:id", autenticarToken, buscarAluno);
router.put("/:id", autenticarToken, atualizarAluno);
router.delete("/:id", autenticarToken, deletarAluno);

export default router;
