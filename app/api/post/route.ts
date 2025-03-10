import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prismaClient";
import { Prisma } from "@prisma/client";

export async function GET() {
    try {
        // 接続テスト
        await prisma.$queryRaw`SELECT 1`;
        
        const allBBSPost = await prisma.post.findMany({
            orderBy: {
                id: 'desc'
            }
        });
        
        return NextResponse.json(allBBSPost);
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ 
            error: 'Database error', 
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { 
            status: 500 
        });
    }
}

export async function POST(req: Request) {
    try {
        // 接続テスト
        await prisma.$queryRaw`SELECT 1`;
        
        const body = await req.json();
        const { username, title, content } = body;

        // バリデーション
        if (!username || !title || !content) {
            return NextResponse.json({ 
                error: 'Missing required fields' 
            }, { 
                status: 400 
            });
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
        
        // エラーの種類に応じた処理
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ 
                error: 'Database error', 
                code: error.code 
            }, { 
                status: 400 
            });
        }

        if (error instanceof Prisma.PrismaClientInitializationError) {
            return NextResponse.json({ 
                error: 'Database connection failed' 
            }, { 
                status: 503 
            });
        }

        return NextResponse.json({ 
            error: 'Internal server error',
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { 
            status: 500 
        });
    }
}