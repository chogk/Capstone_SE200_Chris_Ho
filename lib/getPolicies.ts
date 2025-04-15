// lib/getPolicies.ts
import { prisma } from "@/lib/db";

export async function getPolicies() {
  return await prisma.insurance_Policy.findMany({
    select: {
      id: true,
      name: true,
    },
  });
}
