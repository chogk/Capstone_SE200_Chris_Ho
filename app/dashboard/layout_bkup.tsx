// app/dashboard/layout.tsx
import Sidebar from "@/components/Sidebar"; // adjust the path if needed

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Sidebar />
      <div className="sm:ml-14 p-6">
        {children}
      </div>
    </>
  );
}
