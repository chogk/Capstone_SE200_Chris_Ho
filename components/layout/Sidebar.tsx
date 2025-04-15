'use client';

import Link from 'next/link';
import { Home, FileText, Users } from 'lucide-react'; // Import icons
import { cn } from '@/lib/utils'; // Assuming you have a utils.ts for Tailwind merge

const Sidebar = () => {
  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/policies', label: 'Policies', icon: FileText },
    { href: '/customers', label: 'Customers', icon: Users },
  ];

  return (
    <div className="hidden md:flex flex-col w-64 border-r bg-gray-50">
      <div className="p-4">
        {/* You might want to add a logo here */}
        <span className="font-bold text-lg">Insurance Admin</span>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center space-x-2 rounded-md p-2 hover:bg-gray-200 transition-colors',
              // You can add logic here to highlight the active link
              // pathname === item.href ? 'bg-gray-200 font-semibold' : ''
            )}
          >
            <item.icon className="w-4 h-4" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;