"use client";

import AppSidebar from "@/components/AppSidebar";
import DashboardHeader from "@/components/DashboardHeader";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { fetchUser } = useUserStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <DashboardHeader />
        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}
