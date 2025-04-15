import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth1";
import { redirect } from "next/navigation";
import DashboardContent from "./DashboardContent"; // import client-side UI logic

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (<DashboardContent 
            userEmail={session.user?.email || ""}
            userName={session.user?.name  || ""} 
          />
  );
}
