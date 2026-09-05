"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, ChevronDown, Menu, User, Settings, HelpCircle, LogOut } from "lucide-react";
import { mockProfile } from "@/data/dashboard/profile";
import { mockNotifications } from "@/data/dashboard/notifications";
import Link from "next/link";

interface Props {
  title: string;
  onMenuClick: () => void;
}

export default function DashboardHeader({ title, onMenuClick }: Props) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifsOpen, setNotifsOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const unread = mockNotifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifsOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="bg-white border-b border-slate-100 px-4 sm:px-6 h-16 flex items-center justify-between flex-shrink-0 z-30 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-lg font-bold text-navy">{title}</h1>
      </div>

      <div className="flex items-center gap-2">
        {/* Notifications bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => { setNotifsOpen(!notifsOpen); setProfileOpen(false); }}
            className="relative p-2 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-slate-600" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
          {notifsOpen && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                <span className="font-bold text-navy text-sm">Notifications</span>
                <span className="text-xs text-slate-400">{unread} unread</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-50">
                {mockNotifications.slice(0, 4).map((n) => (
                  <div key={n.id} className={`px-4 py-3 hover:bg-slate-50 cursor-pointer transition-colors ${!n.isRead ? "bg-blue-50/50" : ""}`}>
                    <div className="flex items-start gap-2">
                      <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.isRead ? "bg-saffron" : "bg-slate-300"}`} />
                      <div>
                        <p className="text-sm font-semibold text-slate-800 leading-tight">{n.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-slate-100">
                <Link href="/dashboard/notifications" onClick={() => setNotifsOpen(false)} className="text-xs font-semibold text-saffron hover:underline">
                  View all notifications →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => { setProfileOpen(!profileOpen); setNotifsOpen(false); }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-8 h-8 bg-navy rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
              {mockProfile.fullName.charAt(0)}
            </div>
            <span className="hidden sm:block text-sm font-semibold text-slate-700 max-w-[120px] truncate">
              {mockProfile.fullName}
            </span>
            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
          </button>
          {profileOpen && (
            <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-100 py-1.5 z-50">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="font-bold text-navy text-sm">{mockProfile.fullName}</p>
                <p className="text-xs text-slate-500 truncate">{mockProfile.email}</p>
              </div>
              {[
                { href: "/dashboard/profile", icon: User, label: "Profile" },
                { href: "/dashboard/profile", icon: Settings, label: "Account Settings" },
                { href: "/dashboard/help", icon: HelpCircle, label: "Help" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-navy transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Link>
              ))}
              <div className="border-t border-slate-100 mt-1 pt-1">
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors">
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
