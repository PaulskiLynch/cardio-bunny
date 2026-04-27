import { PrismaClient } from '@/generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

function makePrisma(): PrismaClient {
  const url = process.env.DATABASE_URL!
  const authToken = process.env.TURSO_AUTH_TOKEN
  const adapter = new PrismaLibSql({ url, authToken })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

// Proxy defers construction until first property access — safe during build
export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    if (!globalForPrisma.prisma) globalForPrisma.prisma = makePrisma()
    return (globalForPrisma.prisma as any)[prop]
  },
})
