import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import PolicyHoldersContent from "./PolicyHoldersContent"; // import client-side UI logic

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return <PolicyHoldersContent userEmail={session.user?.email || ""} />;
}
