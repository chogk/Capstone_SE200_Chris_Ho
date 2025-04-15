'use client';

import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem} from '@/components/ui/dropdown-menu';
import { LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  // Replace with actual user data and logout logic
  const user = {
    name: 'John Doe',
    imageUrl: '/placeholder-user.jpg', // Path to your default or user-specific image
  };

  const handleLogout = () => {
    // Implement your logout functionality here (e.g., clearing session, API call)
    console.log('Logging out...');
  };

  return (
    <div className="bg-white border-b h-16 flex items-center justify-end px-4 md:px-6">
      <>
        <DropdownMenuTrigger asChild>
          <button className="rounded-full overflow-hidden w-10 h-10 border border-gray-300 hover:border-primary transition-colors">
            <Avatar>
              {user.imageUrl ? (
                <AvatarImage src={user.imageUrl} alt={user.name} />
              ) : (
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              )}
            </Avatar>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenu align="end">
          <div className="px-4 py-2">
            <p className="font-bold">My Account</p>
            <p className="text-sm text-gray-500">{user.name}</p>
            {/* You might want to add more account details here */}
          </div>
          
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log Out</span>
          </DropdownMenuItem>
        </DropdownMenu>
      </>
    </div>
  );
};

export default Header;