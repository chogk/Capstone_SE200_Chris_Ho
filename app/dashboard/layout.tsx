import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth1";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/DashboardShell"; // New split component

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <DashboardShell userName={session.user?.name || ''} userImage={session.user?.image || ''}>
      {children}
    </DashboardShell>
  );
}

