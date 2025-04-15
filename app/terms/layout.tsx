"use client";

import Link from 'next/link';
import { Home, Wallet, Users2, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import React from 'react';

const Sidebar = () => {
  return (
    <TooltipProvider>
      <div className="flex">
        <div className="flex-1 ml-14">
          <header className="flex h-14 w-full items-center justify-end pr-10 border-b bg-background px-4  bg-gray-200">        
          </header>
         
        </div>
      </div>
    </TooltipProvider> 
  );
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='bg-gray-200'>
      <Sidebar />
      <div className="sm:ml-14 p-6">
        {children} 
      </div>
    </div>
  );
}