// components/Sidebar.tsx
"use client";

import Link from 'next/link';
import { Home, Wallet, Users2 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip';

export default function Sidebar() {
  return (
    <TooltipProvider>
      <div className="flex">
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 border-r flex-col bg-background bg-white sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5 mt-16">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/dashboard" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-accent text-black">
                  <Home className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Home</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/policies" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-accent text-black">
                  <Wallet className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Policy</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="/policy_holders" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 bg-accent text-black">
                  <Users2 className="h-5 w-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Policy Holder</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
      </div>
    </TooltipProvider>
  );
}
