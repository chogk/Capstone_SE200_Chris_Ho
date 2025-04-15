// lib/getPolicyHolders.ts
import { prisma } from "@/lib/db";

export async function getPolicyHolders(page: number, perPage: number) {
  const skip = (page - 1) * perPage;

  const [policy_Holder, total] = await Promise.all([
    prisma.policy_Holder.findMany({
      skip,
      take: perPage,
      include: {
        policy_Subscriptions: {
          include: {
            insurance_Policy: true,
          },
        },
      },
    }),
    prisma.policy_Holder.count(),
  ]);

  return { policy_Holder, totalPolicyHolders: total };
}
