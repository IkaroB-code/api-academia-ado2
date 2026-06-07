import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import alunoRoutes from "./routes/aluno.routes.js";
import planoRoutes from "./routes/plano.routes.js";
import fichaRoutes from "./routes/ficha.routes.js";
import instrutorRoutes from "./routes/instrutor.routes.js";
import cors from 'cors'
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();
app.use(express.json());

app.use(express.json())
app.use(cors()) 

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Rotas
app.use("/auth", authRoutes);
app.use("/alunos", alunoRoutes);
app.use("/planos", planoRoutes);
app.use("/fichas", fichaRoutes);
app.use("/instrutores", instrutorRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
