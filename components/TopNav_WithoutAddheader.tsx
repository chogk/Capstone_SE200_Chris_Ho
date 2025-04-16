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

type Props = {
  userName: string;
  userImage?: string;
};

export default function TopNav({ userName, userImage }: Props) {

  //To show the initials of the Names
  const initials = userName
  ? userName
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
  : "U";

  return (
    <div className="flex justify-between items-center h-14 px-6 border-b bg-gray-200">
      <Link href="/add_policy" className="mr-20">
        {/* <Button className="bg-black text-white hover:bg-gray-800">
          <GoPlusCircle className="w-4 h-4 mr-2" />
          Add Policy
        </Button> */}
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-black">
          {userImage ? (
              <img
                src={userImage}
                alt="Profile"
                className="h-full w-full object-cover rounded-full border border-gray-300"
              />
          ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-black text-white font-bold text-sm">
            {initials}
          </div>
          )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <div className="text-black font-bold cursor-default">My Account</div>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
            <Link href="/my-account" className="text-black">
                Profile Image
            </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>
            Log Out 
        </DropdownMenuItem>
       </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
