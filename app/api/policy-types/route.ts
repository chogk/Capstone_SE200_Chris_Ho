import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const policyTypes = await prisma.type_Of_Policy.findMany({
      select: {
        id: true,
        type_of_policy: true
      },
      orderBy: {
        id: 'asc'
      }
    });

    return NextResponse.json(policyTypes);
  } catch (err) {
    console.error("❌ Error fetching policy types:", err);
    return NextResponse.json(
      { error: 'Failed to fetch policy types' },
      { status: 500 }
    );
  }
}