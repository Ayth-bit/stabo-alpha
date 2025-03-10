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
        // 接続テスト
        const isConnected = await testConnection();
        if (!isConnected) {
            return NextResponse.json({ 
                error: 'Database connection failed' 
            }, { 
                status: 503 
            });
        }

        const allBBSPost = await prisma.post.findMany({
            orderBy: {
                id: 'desc'
            }
        });
        
        return NextResponse.json(allBBSPost);
    } catch (error) {
        console.error('GET error:', error);
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
        const isConnected = await testConnection();
        if (!isConnected) {
            return NextResponse.json({ 
                error: 'Database connection failed' 
            }, { 
                status: 503 
            });
        }

        const { username, title, content } = await req.json();

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
        return NextResponse.json({ 
            error: 'Database error', 
            message: error instanceof Error ? error.message : 'Unknown error'
        }, { 
            status: 500 
        });
    }
}