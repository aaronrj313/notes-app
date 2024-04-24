"use client";

import React from 'react'

    import {
        Router,
    UserCircle,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  import { cn } from "@/lib/utils";
import { User } from '@supabase/supabase-js'
import { signOutAction } from '@/actions/users';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

type Props = {
    user: User;
    className?: string;
};
  
  export function UserButton({user, className}: Props) {
    const router = useRouter();
    const handleSignOut = async () => {
        const toastId = toast.loading('Singing out...');
        await signOutAction();
        router.replace("/login");
        toast.dismiss(toastId);
    }
    return (
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger className={cn("text-secondary hover:text-primary transition-colors duration-200 ease-in-out", className,)}>
            <UserCircle className="size-10 sm:size-12"/>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="ml-4 mt-5 sm:mt-4">
          <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem onClick={handleSignOut} className="rounded-md p-2">
            <h3 className="text-sm">Sign Out</h3>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }


export default UserButton;