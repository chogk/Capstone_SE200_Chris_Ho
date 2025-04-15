import { prisma } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  let body;

  try {
    body = await req.json();
  } catch (err) {
    console.error("❌ Failed to parse request JSON:", err);
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  try {
    // Check if all selected insurance policies exist
    const existingPolicies = await prisma.insurance_Policy.findMany({
      where: {
        id: {
          in: body.insurance_policy_ids
        }
      }
    });

    if (existingPolicies.length !== body.insurance_policy_ids.length) {
      return NextResponse.json({ error: 'One or more selected insurance policies do not exist' }, { status: 400 });
    }

    // Check if the policy holder already exists
    const existingHolder = await prisma.policy_Holder.findFirst({
      where: {
        OR: [
          { email: body.email },
          { id: body.id }
        ]
      },
      include: {
        Policy_Subscription: true
      }
    });

    if (existingHolder) {
      // Get existing policy subscriptions
      const existingSubscriptions = existingHolder.Policy_Subscription.map(
        sub => sub.insurance_policy_id
      );

      // Filter out policies that the holder already has
      const newPolicyIds = body.insurance_policy_ids.filter(
        id => !existingSubscriptions.includes(id)
      );

      if (newPolicyIds.length === 0) {
        return NextResponse.json(
          { error: 'Policy holder already has all selected policies' },
          { status: 400 }
        );
      }

      // Add only the new policies
      await prisma.policy_Subscription.createMany({
        data: newPolicyIds.map(policyId => ({
          policy_holder_id: existingHolder.id,
          insurance_policy_id: policyId,
        })),
      });

      return NextResponse.json(existingHolder, { status: 200 });
    }

    // If holder doesn't exist, create new holder and policies
    const newHolder = await prisma.policy_Holder.create({
      data: {
        id: body.id,
        email: body.email,
        firstName: body.firstName,
        lastName: body.lastName,
      },
    });

    // Create policy subscriptions for all selected policies
    await prisma.policy_Subscription.createMany({
      data: body.insurance_policy_ids.map(policyId => ({
        policy_holder_id: newHolder.id,
        insurance_policy_id: policyId,
      })),
    });

    return NextResponse.json(newHolder, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create policy holder' }, { status: 500 });
  }
}