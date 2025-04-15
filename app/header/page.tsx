"use client";

import Link from 'next/link';
import { Home, Wallet, Users2, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';


const header = () => {
    return (
      <TooltipProvider>

        <div className="flex-1 ml-14">
          <header className="flex h-14 w-full items-center justify-end border-b bg-background px-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-black">
                  <User className="h-5 w-5" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem disabled ><div className="text-black">My Account</div></DropdownMenuItem>
                <DropdownMenuItem onClick={() => console.log('Logging out')}>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="p-6">
            <h1 className="text-xl font-semibold">Welcome, User!</h1>
            {/* Main content goes here */}
          </main>
        </div>
    </TooltipProvider>
    )};

    export default header;