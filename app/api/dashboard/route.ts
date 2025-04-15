import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const customers = await prisma.policy_Holder.count()
    const policies = await prisma.insurance_Policy.count()
    const revenueData = await prisma.policy_Subscription.findMany({
      select: {
        Insurance_Policy: {
          select: { base_price_sgd: true }
        }
      }
    })

    const totalRevenue = revenueData.reduce((sum, sub) => {
      return sum + parseFloat(sub.Insurance_Policy.base_price_sgd.toString())
    }, 0)

    const monthlyRevenue = await prisma.$queryRawUnsafe(`
      SELECT
        TO_CHAR(ps."purchasedAt", 'Mon YYYY') AS name,
        DATE_TRUNC('month', ps."purchasedAt") AS month_order,
        SUM(ip."base_price_sgd")::FLOAT AS total
      FROM "Policy_Subscription" ps
      JOIN "Insurance_Policy" ip ON ps."insurance_policy_id" = ip."id"
      GROUP BY TO_CHAR(ps."purchasedAt", 'Mon YYYY'), DATE_TRUNC('month', ps."purchasedAt")
      ORDER BY month_order
    `);
    
    return NextResponse.json({
      customers,
      policies,
      totalRevenue,
      sales: monthlyRevenue,
    })
  } catch (error) {
    console.error('[DASHBOARD_GET]', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
