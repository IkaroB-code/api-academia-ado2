import express from "express";
import { autenticarToken } from "../middlewares/auth.js";
import { criarFicha, listarFichas, buscarFicha, atualizarFicha, deletarFicha } from "../controllers/ficha.controller.js";

const router = express.Router();

router.post("/", autenticarToken, criarFicha);
router.get("/", autenticarToken, listarFichas);
router.get("/:id", autenticarToken, buscarFicha);
router.put("/:id", autenticarToken, atualizarFicha);
router.delete("/:id", autenticarToken, deletarFicha);

export default router;
