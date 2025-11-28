"use client";

import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Calendar, MessageCircleMore } from "lucide-react";
import Link from "next/link";
import { useBookingStore } from "@/store/useBookingStore";
import { useEffect } from "react";

export default function AppSidebar() {
  const { bookings, fetchBookings } = useBookingStore();

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Image
          src="/images/ASAPRoadWorthyLogo.webp"
          alt="ASAP Roadworthy Logo"
          width={200}
          height={69}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="cursor-pointer" asChild>
                <Link href="/bookings">
                  <Calendar />
                  Bookings
                </Link>
              </SidebarMenuButton>
              <SidebarMenuButton className="cursor-pointer" asChild>
                {bookings[0] ? (
                  <Link href={`/messages/${bookings[0].uuid}`}>
                    <MessageCircleMore />
                    Messages
                  </Link>
                ) : (
                  <div className="flex items-center gap-2 opacity-50 cursor-not-allowed">
                    <MessageCircleMore />
                    Messages
                  </div>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
