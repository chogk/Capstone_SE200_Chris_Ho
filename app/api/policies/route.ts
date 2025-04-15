import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    const [policies, total] = await Promise.all([
      prisma.insurance_Policy.findMany({
        skip,
        take: limit,
        include: {
          policy_Type: {
            select: { type_of_policy: true }
          },
        },
        orderBy: {
          id: 'asc',
        },
      }),
      prisma.insurance_Policy.count(),
    ]);

    return NextResponse.json({ policies, total });

  } catch (error) {
    console.error("Failed to fetch policies:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

