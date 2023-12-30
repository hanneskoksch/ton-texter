import { PrismaClient } from "@prisma/client";

// This file implements the Singleton pattern for PrismaClient, providing a unified instance ('db')
// based on the environment. It ensures a single PrismaClient instance is created in production,
// while in other environments, a globally cached instance is reused for optimal resource utilization.

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
