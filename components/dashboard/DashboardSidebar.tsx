"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FileText, FolderOpen, Bell,
  User, HelpCircle, LogOut, Shield, ScrollText,
  ChevronLeft, ChevronRight, X
} from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const navItems = [
  { href: "/dashboard/overview", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/applications", label: "My Applications", icon: FileText },
  { href: "/dashboard/documents", label: "My Documents", icon: FolderOpen },
  { href: "/dashboard/notifications", label: "Notifications", icon: Bell, badge: 3 },
  { href: "/dashboard/profile", label: "My Profile", icon: User },
  { href: "/dashboard/help", label: "Help & Support", icon: HelpCircle },
];

interface Props {
  collapsed: boolean;
  onCollapse: (val: boolean) => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function DashboardSidebar({ collapsed, onCollapse, mobileOpen, onMobileClose }: Props) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className={cn("flex items-center gap-3 px-4 py-5 border-b border-slate-100", collapsed && "justify-center px-3")}>
        <div className="w-10 h-10 rounded-xl overflow-hidden border border-slate-200 flex-shrink-0 shadow-sm">
          <Image src="/visaline_logo.jpg" alt="Visaline" width={40} height={40} className=" object-cover w-full h-full" />
        </div>
        {!collapsed && (
          <div>
            <div className="font-bold text-navy text-base leading-tight">VISALINE</div>
            <div className="text-[10px] text-slate-500 font-semibold leading-tight flex items-center gap-1">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="" className="h-2.5 w-auto opacity-60" />
              Applicant Portal
            </div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <div className="space-y-0.5 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.includes(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onMobileClose}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 relative group",
                  isActive
                    ? "bg-saffron text-white shadow-sm"
                    : "text-slate-600 hover:bg-saffron/8 hover:text-saffron"
                )}
              >
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                {!collapsed && (
                  <span className="flex-1 truncate">{item.label}</span>
                )}
                {!collapsed && item.badge && (
                  <span className={cn(
                    "text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0",
                    isActive ? "bg-white text-saffron" : "bg-red-500 text-white"
                  )}>
                    {item.badge}
                  </span>
                )}
                {collapsed && (
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-navy text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom links */}
      <div className={cn("border-t border-slate-100 py-3 px-2 space-y-0.5", collapsed && "px-1")}>
        {!collapsed && (
          <div className="flex gap-4 px-3 py-1 text-[11px] text-slate-400 font-medium">
            <a href="#" className="hover:text-navy transition-colors">Privacy</a>
            <a href="#" className="hover:text-navy transition-colors">Terms</a>
          </div>
        )}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors group">
          <LogOut className="w-4.5 h-4.5 flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
          {collapsed && (
            <div className="absolute left-full ml-3 px-2.5 py-1 bg-navy text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity">
              Logout
            </div>
          )}
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => onCollapse(!collapsed)}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-slate-200 rounded-full items-center justify-center shadow-sm hover:border-saffron hover:text-saffron transition-colors z-10"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-white border-r border-slate-100 shadow-sm relative transition-all duration-300",
          collapsed ? "w-16" : "w-60"
        )}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-navy/40 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="relative w-64 bg-white h-full flex flex-col shadow-2xl">
            <button onClick={onMobileClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100">
              <X className="w-5 h-5 text-slate-600" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}
