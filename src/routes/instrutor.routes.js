import express from "express";
import { autenticarToken } from "../middlewares/auth.js";
import { criarInstrutor, listarInstrutores, buscarInstrutor, atualizarInstrutor, deletarInstrutor } from "../controllers/instrutor.controller.js";

const router = express.Router();

router.post("/", autenticarToken, criarInstrutor);
router.get("/", autenticarToken, listarInstrutores);
router.get("/:id", autenticarToken, buscarInstrutor);
router.put("/:id", autenticarToken, atualizarInstrutor);
router.delete("/:id", autenticarToken, deletarInstrutor);

export default router;
