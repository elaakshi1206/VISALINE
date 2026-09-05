"use client";

import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  overview: "Dashboard",
  applications: "My Applications",
  documents: "My Documents",
  notifications: "Notifications",
  profile: "My Profile",
  help: "Help & Support",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const segment = pathname.split("/").pop() || "overview";
  const title = pageTitles[segment] || "Dashboard";

  return (
    <div className="flex h-screen bg-[#F8F9FC] overflow-hidden">
      <DashboardSidebar
        collapsed={collapsed}
        onCollapse={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileClose={() => setMobileOpen(false)}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardHeader title={title} onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
