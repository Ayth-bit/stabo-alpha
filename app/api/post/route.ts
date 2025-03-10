import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prismaClient";
import { Prisma } from "@prisma/client";

// データベース接続テスト用の関数
async function testConnection() {
  try {
    await prisma.$connect();
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection test failed:', error);
    return false;
  }
}

export async function GET() {
    try {
        // 環境変数のデバッグログ
        console.log('Environment:', {
            NODE_ENV: process.env.NODE_ENV,
            DATABASE_URL: process.env.DATABASE_URL ? 'Set' : 'Not set'
        });

        const posts = await prisma.post.findMany({
            orderBy: {
                id: 'desc'
            }
        });
        
        return NextResponse.json(posts);
    } catch (error) {
        console.error('GET Error details:', {
            name: error.name,
            message: error.message,
            stack: error.stack
        });

        return NextResponse.json({
            error: 'Database error',
            message: process.env.NODE_ENV === 'development' 
                ? error.message 
                : 'Internal server error'
        }, { 
            status: 500 
        });
    }
}

export async function POST(req: Request) {
    try {
        const { username, title, content } = await req.json();
        
        if (!username || !title || !content) {
            return NextResponse.json({
                error: 'Missing required fields'
            }, { status: 400 });
        }

        const post = await prisma.post.create({
            data: {
                username,
                title,
                content
            }
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error('POST error:', error);
        
        if (error instanceof Prisma.PrismaClientInitializationError) {
            return NextResponse.json({
                error: 'Database initialization error',
                message: error.message
            }, { status: 500 });
        }

        return NextResponse.json({
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}