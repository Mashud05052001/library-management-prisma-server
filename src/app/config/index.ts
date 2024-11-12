import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const configPrisma = new PrismaClient();

export default {
  port: process.env.PORT,
};
