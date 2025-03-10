import { PrismaClient } from '@prisma/client'

const createPrismaClient = () => {
  // データベースURLの検証
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set');
    throw new Error('Database configuration is missing');
  }

  // SSL設定を追加したクライアント設定
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL
      }
    },
    log: ['error', 'warn', 'query'],
    errorFormat: 'minimal',
  }).$extends({
    query: {
      async $allOperations({ operation, model, args, query }) {
        try {
          return await query(args);
        } catch (error) {
          console.error(`Database operation failed: ${operation} on ${model}`, error);
          throw error;
        }
      },
    },
  });
};

// グローバルインスタンスの型定義
declare global {
  var prisma: PrismaClient | undefined;
}

// 開発環境ではグローバルインスタンスを再利用
export const prisma = global.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
} 