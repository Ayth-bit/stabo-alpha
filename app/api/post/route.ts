import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prismaClient";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
    try {
        // データベース接続テスト
        await prisma.$connect();
        
        const allBBSPost = await prisma.post.findMany({
            orderBy: {
                id: 'desc'
            },
            select: {
                id: true,
                username: true,
                title: true,
                content: true
            }
        });
        
        return NextResponse.json(allBBSPost);
    } catch (error) {
        console.error('Database error:', error);
        
        // エラーの種類に応じた適切なレスポンス
        if (error instanceof Prisma.PrismaClientInitializationError) {
            return NextResponse.json({ 
                error: 'Database connection failed', 
                details: 'Could not connect to the database' 
            }, { status: 503 });
        }
        
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ 
                error: 'Database query failed', 
                code: error.code 
            }, { status: 400 });
        }
        
        return NextResponse.json({ 
            error: 'Internal server error' 
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(req: Request) {
    try {
        await prisma.$connect();
        
        const { username, title, content } = await req.json();
        
        // 入力値の検証
        if (!username || !title || !content) {
            return NextResponse.json({ 
                error: 'Missing required fields' 
            }, { status: 400 });
        }
        
        const post = await prisma.post.create({
            data: {
                username,
                title,
                content,
            },
        });
        
        return NextResponse.json(post);
    } catch (error) {
        console.error('Database error:', error);
        
        if (error instanceof Prisma.PrismaClientInitializationError) {
            return NextResponse.json({ 
                error: 'Database connection failed' 
            }, { status: 503 });
        }
        
        return NextResponse.json({ 
            error: 'Failed to create post',
            details: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}