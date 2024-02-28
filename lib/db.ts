// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit. Example: warn(prisma-client) There
// are already 10 instances of Prisma Client actively running.

// Learn more:
// https://pris.ly/d/help/next-js-best-practices
// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices

import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
  // https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/logging
  return new PrismaClient({
    log: ["warn", "error"],
  })
}

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const db = globalThis.prisma ?? prismaClientSingleton()

export default db

if (process.env.NODE_ENV !== "production") globalThis.prisma = db
