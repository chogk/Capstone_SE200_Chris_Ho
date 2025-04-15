"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { GoPlusCircle } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

export default function TopNav() {
  return (
    <div className="flex justify-between items-center h-14 px-6 border-b bg-gray-200">
      <Link href="/add_policy" className="ml-14 mt-5">
        <Button className="bg-black text-white hover:bg-gray-800">
          <GoPlusCircle className="w-4 h-4 mr-2" />
          Add Policy
        </Button>
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-9 w-9 items-center justify-center mt-5 rounded-full bg-accent text-black">
            <User className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled>
            <div className="text-black">My Account</div>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
            Log Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
