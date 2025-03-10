import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient";
import { Prisma } from "@prisma/client";

export async function GET(req: Request) {
    try {
        console.log('Attempting to fetch posts from database...');
        const allBBSPost  = await prisma.post.findMany();
        console.log('Posts fetched successfully:', allBBSPost);
        return NextResponse.json(allBBSPost); 
    } catch (error) {
        console.error('Database error:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ 
                error: 'Database error', 
                code: error.code,
                details: error.message 
            }, { 
                status: 500 
            });
        }
        return NextResponse.json({ 
            error: 'Internal server error' 
        }, { 
            status: 500 
        });
    }
}

export async function POST (req: Request){
    try {
        const { username, title, content } = await req.json();

        const post  = await prisma.post.create({
            data: {
                username,
                title,
                content,
            },
        });
        return NextResponse.json(post); 
    } catch (error) {
        console.error('Database error:', error);
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            return NextResponse.json({ 
                error: 'Database error', 
                code: error.code,
                details: error.message 
            }, { 
                status: 500 
            });
        }
        return NextResponse.json({ 
            error: 'Internal server error' 
        }, { 
            status: 500 
        });
    }
}