import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth1";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopNav_AddPolicyHolder from "@/components/TopNav_AddPolicyHolder";


export default async function PoliciesLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-gray-200">
      <Sidebar />
      <TopNav_AddPolicyHolder userName={session.user?.name || ""}
                            userImage={session.user?.image || ""}/>

      {/* Main content */}
      <div className="sm:ml-14 p-6">
        {children}
      </div>
    </div>
  );
}