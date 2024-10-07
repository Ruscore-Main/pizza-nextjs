import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const name = req.nextUrl.searchParams.get("name") || '';

    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: name,
                mode: "insensitive",
            }
        },
        take: 5
    });

    return NextResponse.json(products);
}