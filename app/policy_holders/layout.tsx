import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth1";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function PolicyHoldersLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <DashboardShell
      userName={session.user?.name || ""}
      userImage={session.user?.image || ""}
      actions={
        <Link href="/add_policy_holder">
          <Button className="bg-black text-white hover:bg-gray-900">
            Add Policy Holder
          </Button>
        </Link>
      }
    >
      {children}
    </DashboardShell>
  );
}
