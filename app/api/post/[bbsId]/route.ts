import { NextResponse } from "next/server";
import prisma from "../../../../lib/prismaClient";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ bbsId: string }> }
) {
  const bbsId = (await params).bbsId;
  const bbsDetailData = await prisma.post.findUnique({
    where: {
      id: parseInt(bbsId),
    },
  });
  return NextResponse.json(bbsDetailData);
}