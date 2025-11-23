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
      <Sidebar
        variant="sidebar"
        collapsible="none"
        className="h-svh bg-sidebar border-r"
      >
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 pt-6 pb-4 h-auto">
              <a className="flex items-center gap-2.5" href="/dashboard">
                <div className="relative w-9 h-9 shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Miss-Minutes"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-lg font-bold text-foreground tracking-tight">
                  Miss-Minutes
                </span>
              </a>
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-3 pt-4">
              <SidebarMenu className="gap-1">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      isActive={pathname === item.url}
                      className="h-11 px-3 text-base font-medium"
                    >
                      <a href={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="p-3 border-t">
          <SidebarGroup>
            <SidebarMenu className="gap-1">
              <SidebarMenuItem>
                <SidebarMenuButton className="h-auto py-2.5 px-3 hover:bg-accent/50">
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex flex-col items-start min-w-0 flex-1">
                      <span className="text-sm font-semibold truncate w-full">
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
                  className="h-10 px-3 text-sm font-medium justify-start gap-2.5 text-destructive hover:text-destructive hover:bg-destructive/10"
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
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-end border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 gap-4 px-6">
          <ThemeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6 lg:p-8 pt-6">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarWrapper;
