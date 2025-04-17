'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from "next/image";

export default function TopNav_AddPolicy({ userName, userImage }: { userName: string; userImage: string }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex items-center justify-between w-full px-4 h-16 bg-gray-200 border-b shadow-md">
      {/* Left side: Burger + Page Title */}
      <div className="flex items-center gap-2">
        {/* Burger button only on mobile */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="sm:hidden focus:outline-none"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Page Title */}
        <h1 className="text-lg font-semibold hidden sm:block">
          {pathname === '/add_policy' ? 'Add Policy' : ''}
        </h1>
      </div>

      {/* Right side: Profile Image */}
      <div className="ml-auto flex items-center gap-3">
        {userImage ? (
          <Image
            src={userImage}
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-white">
            {userName ? userName.charAt(0).toUpperCase() : "U"}
          </div>
        )}
      </div>
    </div>
  );
}

