"use client";

import Link from 'next/link';
import { Home, Wallet, Users2, User } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const Sidebar = () => {
  return (
    <TooltipProvider>
      <div className="flex">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r flex-col bg-background bg-white sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5 mt-16">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-accent text-black"
                >
                  <Home className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/policies"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-accent text-black"
                >
                  <Wallet className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Policies</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/customers"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-accent text-black"
                >
                  <Users2 className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
          </nav>
        </aside>

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
      </div>
    </TooltipProvider>
  );
};

export default Sidebar;
