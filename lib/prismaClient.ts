import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined
}

// 環境変数チェックの方法を改善
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error('DATABASE_URL is missing');
    // フォールバック値を返すか、エラーをスロー
    return process.env.NODE_ENV === 'production'
      ? process.env.POSTGRES_PRISMA_URL // Amplifyの代替環境変数
      : 'postgresql://postgres:password@localhost:5432/mydb';
  }
  return url;
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  datasources: {
    db: {
      url: getDatabaseUrl(),
    },
  },
  log: ['error', 'warn'],
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma 