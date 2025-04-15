import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET() {
  try {
    const policies = await prisma.insurance_Policy.findMany({
      select: { id: true, name: true }
    })
    return NextResponse.json(policies)
  } catch (err) {
    console.error('Error fetching insurance policies:', err)
    return NextResponse.json({ error: 'Failed to fetch policies' }, { status: 500 })
  }
}
