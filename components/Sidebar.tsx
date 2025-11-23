"use client";

import React from "react";
import {
  Sidebar,
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
} from "@/components/blocks/sidebar";
import {
  User,
  Calendar,
  Inbox,
  Settings,
  LayoutDashboardIcon,
  LogOut,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import Image from "next/image";

// Menu items
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Inbox,
  },
  {
    title: "Analytics",
    url: "/analytics",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

interface SidebarWrapperProps {
  children: React.ReactNode;
  userName?: string;
  userEmail?: string;
}

const SidebarWrapper = ({
  children,
  userName,
  userEmail,
}: SidebarWrapperProps) => {
  const pathname = usePathname();

  const handleSignOut = async () => {
    // Import signOut dynamically to avoid SSR issues
    const { signOut } = await import("next-auth/react");
    signOut({ callbackUrl: "/" });
  };

  return (
    <SidebarProvider>
      <Sidebar variant="sidebar" collapsible="none" className="h-svh bg-muted">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="p-4 mb-8 h-auto">
              <a className="flex items-center gap-3" href="/dashboard">
                <div className="relative w-8 h-8">
                  <Image
                    src="/logo.png"
                    alt="CodeChrono"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl font-bold text-foreground">
                  CodeChrono
                </span>
              </a>
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                    >
                      <a className="text-xl" href={item.url}>
                        <item.icon className="h-6 w-6" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="w-full justify-between gap-3 h-auto py-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <User className="h-6 w-6 shrink-0" />
                    <div className="flex flex-col items-start min-w-0 flex-1">
                      <span className="text-xl font-medium truncate w-full">
                        {userName || "User"}
                      </span>
                      <span className="text-xs text-muted-foreground truncate w-full">
                        {userEmail || ""}
                      </span>
                    </div>
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={handleSignOut}
                  className="w-full text-xl justify-start gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-end border-b  gap-4 px-6">
          <ThemeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
