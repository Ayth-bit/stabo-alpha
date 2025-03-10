import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prismaClient";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
    try {
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
        
        if (error instanceof Prisma.PrismaClientInitializationError) {
            return NextResponse.json({ 
                error: 'Database connection failed', 
                details: process.env.NODE_ENV === 'development' ? error.message : 'Connection error'
            }, { status: 503 });
        }
        
        return NextResponse.json({ 
            error: 'Internal server error',
            details: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Unknown error'
        }, { status: 500 });
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
                content,
            },
        });
        
        return NextResponse.json(post);
    } catch (error) {
        console.error('Database error:', error);
        
        if (error instanceof Prisma.PrismaClientInitializationError) {
            return NextResponse.json({ 
                error: 'Database connection failed',
                details: process.env.NODE_ENV === 'development' ? error.message : 'Connection error'
            }, { status: 503 });
        }
        
        return NextResponse.json({ 
            error: 'Failed to create post',
            details: process.env.NODE_ENV === 'development' ? (error as Error).message : 'Unknown error'
        }, { status: 500 });
    }
}