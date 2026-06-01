import express from "express";
import { autenticarToken } from "../middlewares/auth.js";
import { criarPlano, listarPlanos, buscarPlano, atualizarPlano, deletarPlano } from "../controllers/plano.controller.js";

const router = express.Router();

router.post("/", autenticarToken, criarPlano);
router.get("/", autenticarToken, listarPlanos);
router.get("/:id", autenticarToken, buscarPlano);
router.put("/:id", autenticarToken, atualizarPlano);
router.delete("/:id", autenticarToken, deletarPlano);

export default router;
