import { NextResponse } from "next/server";
import prisma from "../../../lib/prismaClient" ;

export async function GET (req: Request){
    try {
        const allBBSPost  = await prisma.post.findMany();
        return NextResponse.json(allBBSPost); 
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
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
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}