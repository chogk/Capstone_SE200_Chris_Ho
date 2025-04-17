'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import TopNav_WithoutAddheader from '@/components/TopNav_WithoutAddheader';
import { Menu } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Link from 'next/link';

export default function DashboardShell({
  children,
  userName,
  userImage,
}: {
  children: React.ReactNode;
  userName: string;
  userImage: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Desktop Only */}
      <div className="hidden sm:block w-14 bg-gray-200 border-r shadow-md">
        <Sidebar />
      </div>

      {/* Main Area */}
      <div className="flex flex-col flex-1 min-h-screen">
        {/* Top Navigation */}
        <div className="flex items-center justify-between bg-gray-200 border-b shadow-md h-16 px-4">
          {/* Left: Burger Menu (Mobile only) */}
          <div className="flex items-center">
            <Popover>
              <PopoverTrigger asChild>
                <button className="sm:hidden">
                  <Menu className="w-6 h-6" />
                </button>
              </PopoverTrigger>
              <PopoverContent side="bottom" align="start" className="w-40 p-2 space-y-2">
                <Link href="/dashboard" className="block text-sm font-medium hover:bg-gray-100 rounded p-2">
                  Dashboard
                </Link>
                <Link href="/policies" className="block text-sm font-medium hover:bg-gray-100 rounded p-2">
                  Policy
                </Link>
                <Link href="/policy_holders" className="block text-sm font-medium hover:bg-gray-100 rounded p-2">
                  Policy Holder
                </Link>
              </PopoverContent>
            </Popover>
          </div>

          {/* Right: Profile Icon */}
          <div className="ml-auto">
            <TopNav_WithoutAddheader userName={userName} userImage={userImage} />
          </div>
        </div>

        {/* Main page content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
