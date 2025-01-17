import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_URL =
  process.env.DB_URL ||
  "postgresql://postgres@localhost:5432/gruubapp?schema=public";

export const jwtSecret = process.env.JWT_SECRET || "secret";
