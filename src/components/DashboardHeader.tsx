"use client";

import { initials } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarTrigger } from "./ui/sidebar";
import { LogOut } from "lucide-react";
import axiosClient from "@/lib/axios-client";
import { showError, showSuccess } from "@/lib/message";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

export default function DashboardHeader() {
  const router = useRouter();
  const { user } = useUserStore();

  const signOut = async () => {
    try {
      const res = await axiosClient.post("/auth/logout");
      showSuccess(res.data.message);
      router.push("/login");
    } catch (res: any) {
      showError(res.response.data.error);
    } finally {
    }
  };

  return (
    <div className="w-full p-4 pr-5 flex justify-between items-center">
      <SidebarTrigger />
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="cursor-pointer">
          <div className="flex items-center gap-4 text-sm">
            {user?.name}
            <Avatar className="size-10">
              <AvatarFallback>{initials(user?.name)}</AvatarFallback>
            </Avatar>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" sideOffset={8} className="w-[150px]">
          <DropdownMenuGroup>
            <DropdownMenuItem
              variant="destructive"
              className="cursor-pointer"
              onClick={() => signOut()}
            >
              <LogOut />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
