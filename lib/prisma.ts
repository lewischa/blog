import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as { prisma?: PrismaClient }).prisma) {
    (global as { prisma?: PrismaClient }).prisma = new PrismaClient();
  }
  prisma = (global as unknown as { prisma: PrismaClient }).prisma;
}

export default prisma;