import { PrismaClient } from '@prisma/client'

// PrismaClientの型を定義
const prismaClientSingleton = () => {
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
  })
}

// グローバル変数の型定義
declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

// prismaインスタンスの作成または再利用
const prisma = globalThis.prisma ?? prismaClientSingleton()

// 開発環境でのみグローバルに保存
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}

export { prisma } 