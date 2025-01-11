import { PrismaClient } from "@prisma/client";
import app from "./app";
import { PORT } from "./configs";

export const prisma = new PrismaClient();

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const gracefulShutdown = async (signal: string) => {
  console.log(`Received ${signal}. Shutting down gracefully...`);
  try {
    console.log("Disconnecting Prisma...");
    await prisma.$disconnect();
    console.log("Prisma disconnected.");

    server.close(() => {
      console.log("Server closed.");
      process.exit(0);
    });
  } catch (err) {
    console.error("Error during shutdown:", err);
    process.exit(1);
  }
};

process.on("SIGINT", () => gracefulShutdown("SIGINT")); // Ctrl+C
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
