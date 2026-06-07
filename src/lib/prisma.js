import "dotenv/config";
import pkg from "@prisma/client";

const { PrismaClient } = pkg;

const prisma = new PrismaClient(); // sem datasources

export default prisma;
