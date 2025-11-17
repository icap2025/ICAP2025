"use client";

import Loading from "@/app/loading";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  clearAdminCookies,
  getAdminData,
  isAdminAuthenticated,
} from "@/lib/auth";
import {
  CreditCard,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "Users Management",
    icon: Users,
    href: "/admin/users",
  },
  {
    title: "Notice",
    icon: CreditCard,
    href: "/admin/notice",
  },
  {
    title: "Important Dates",
    icon: FileText,
    href: "/admin/important-dates",
  },
  {
    title: "Speakers",
    icon: Settings,
    href: "/admin/speakers",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState<any>(null);

  useEffect(() => {
    const checkAuth = () => {
      if (!isAdminAuthenticated()) {
        router.push("/login");
      } else {
        const data = getAdminData();
        setAdminData(data);
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = () => {
    clearAdminCookies();
    toast.success("Logged out successfully");
    router.push("/login");
    router.refresh();
  };

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b border-gray-200 p-4 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600">
                <Home className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Admin Panel
                </h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ICAP 2025
                </p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Navigation</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <Link href={item.href}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 p-4 dark:border-gray-700">
            <div className="mb-3 border-b border-gray-200 pb-3 dark:border-gray-700">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {adminData?.fullName || "Admin"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {adminData?.email}
              </p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/10"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex flex-1 flex-col">
          <header className="border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
            </div>
          </header>
          <div className="flex-1 bg-gray-50 p-6 dark:bg-gray-900">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
