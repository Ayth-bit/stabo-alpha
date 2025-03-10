import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prismaClient";
import { Prisma } from "@prisma/client";

// データベース接続テスト用のヘルパー関数
async function testDatabaseConnection() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

export async function GET() {
    try {
        // 接続テスト
        const isConnected = await testDatabaseConnection();
        if (!isConnected) {
            return NextResponse.json({
                error: 'Database connection failed',
                message: 'Could not establish database connection'
            }, { status: 503 });
        }

        const posts = await prisma.post.findMany({
            orderBy: { id: 'desc' },
            take: 100 // パフォーマンスのため制限を設定
        });
        
        return NextResponse.json(posts);
    } catch (error: unknown) {
        console.error('GET Error:', error);
        return handleDatabaseError(error);
    }
}

export async function POST(req: Request) {
    try {
        // 接続テスト
        const isConnected = await testDatabaseConnection();
        if (!isConnected) {
            return NextResponse.json({
                error: 'Database connection failed',
                message: 'Could not establish database connection'
            }, { status: 503 });
        }

        const { username, title, content } = await req.json();
        
        if (!username || !title || !content) {
            return NextResponse.json({
                error: 'Validation error',
                message: 'Missing required fields'
            }, { status: 400 });
        }

        const post = await prisma.post.create({
            data: { username, title, content }
        });

        return NextResponse.json(post);
    } catch (error: unknown) {
        console.error('POST Error:', error);
        return handleDatabaseError(error);
    }
}

// エラーハンドリングヘルパー関数
function handleDatabaseError(error: unknown) {
    if (error instanceof Prisma.PrismaClientInitializationError) {
        return NextResponse.json({
            error: 'Database initialization error',
            message: 'Could not initialize database connection'
        }, { status: 503 });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json({
            error: 'Database query error',
            code: error.code,
            message: error.message
        }, { status: 400 });
    }

    return NextResponse.json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' 
            ? (error instanceof Error ? error.message : 'Unknown error')
            : 'An unexpected error occurred'
    }, { status: 500 });
}