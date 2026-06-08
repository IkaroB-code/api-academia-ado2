import "dotenv/config";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient({
    errorFormat: "minimal", // ou "colorless", "pretty"
    log: ["error", "warn"], // níveis de log permitidos
}); // sem datasources

export default prisma;
