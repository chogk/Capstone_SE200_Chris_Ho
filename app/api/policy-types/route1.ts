import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// API handler for GET requests
export async function GET() {
  try {
    // Fetch all policy types from the database
    //const policyTypes = await prisma.policy_Type.findMany()
    const policies = await prisma.insurance_Policy.findMany()

    select: {
      id: true,
      name: true
    }
  });


    // Send the policy types in the response
    return NextResponse.json(policyTypes)
  } catch (error) {
    console.error('Error fetching policy types:', error)
    return NextResponse.json({ error: 'Failed to fetch policy types' }, { status: 500 })
  }
}
