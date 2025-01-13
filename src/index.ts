import { PrismaClient } from "@prisma/client";
import { createClient } from "redis";
import app from "./app";
import { PORT } from "./configs";

export const prisma = new PrismaClient();
export const client = createClient({
  socket: {
    reconnectStrategy: function (retries) {
      if (retries > 20) {
        console.log(
          "Too many attempts to reconnect. Redis connection was terminated"
        );
        return new Error("Too many retries.");
      } else {
        return retries * 500;
      }
    },
    connectTimeout: 10000,
  },
});
client.on("error", (error) => console.error("Redis client error:", error));
client.on("connect", () => console.log("Redis Client Connected"));

const server = app.listen(PORT, async () => {
  await client.connect();
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
