import "dotenv/config";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient({
  adapter: {
    provider: "postgres", // compatível com provider = "postgresql"
  },
  errorFormat: "minimal",
  log: ["error", "warn"],
});

export default prisma;
