import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()

  try {
    const newPolicy = await prisma.insurance_Policy.create({
      data: {
        id: body.id,
        name: body.name,
        base_price_sgd: body.base_price_sgd,
        type_of_policy_id: parseInt(body.type_of_policy_id), 
        
      },
    })
    return NextResponse.json(newPolicy, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Failed to create policy' }, { status: 500 })
  }
}
