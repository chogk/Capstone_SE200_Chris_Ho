import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    const skip = (page - 1) * limit;

    // Fetch policy holders with their subscribed policies
    const policyHolders = await prisma.policy_Holder.findMany({
      skip,
      take: limit,
      include: {
        Policy_Subscription: {
          include: {
            Insurance_Policy: true, // Fetch the actual policy details
          },
        },
      },
    });

    const total = await prisma.policy_Holder.count();

    return NextResponse.json({
      policyHolders: policyHolders.map((holder) => ({
        id: holder.id,
        email: holder.email,
        firstName: holder.firstName,
        lastName: holder.lastName,
        policies: holder.Policy_Subscription.map((sub) => sub.Insurance_Policy.name || "Unnamed Policy"),
      })),
      total,
    });
  } catch (error) {
    console.error("Error fetching policy holders:", error);
    return NextResponse.json({ error: "Failed to fetch policy holders" }, { status: 500 });
  }
}
