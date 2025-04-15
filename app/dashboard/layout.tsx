import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import TopNav_WithoutAddheader from "@/components/TopNav_WithoutAddheader";


export default async function PoliciesLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="bg-gray-200">
      <Sidebar />
      <TopNav_WithoutAddheader />

      {/* Main content */}
      <div className="sm:ml-14 p-6">
        {children}
      </div>
    </div>
  );
}
