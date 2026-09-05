"use client";

import { useState } from "react";
import { Bell, CheckCheck, Filter, AlertTriangle, FileText, CheckCircle, Info } from "lucide-react";
import { mockNotifications, DashboardNotification } from "@/data/dashboard/notifications";
import NotificationItem from "@/components/dashboard/NotificationItem";

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<DashboardNotification[]>(mockNotifications);
  const [activeFilter, setActiveFilter] = useState<"all" | "unread" | "action" | "status">("all");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleToggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const filteredNotifs = notifications.filter((n) => {
    if (activeFilter === "unread") return !n.isRead;
    if (activeFilter === "action") return n.category === "action";
    if (activeFilter === "status") return n.category === "status";
    return true;
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-2xl font-extrabold text-navy tracking-tight">Notifications</h2>
            {unreadCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time status updates, security notifications, and required applicant actions.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={handleMarkAllRead}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-navy hover:text-saffron px-3 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors self-start sm:self-auto shadow-sm"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveFilter("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeFilter === "all" ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setActiveFilter("unread")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeFilter === "unread" ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Unread ({unreadCount})
        </button>
        <button
          onClick={() => setActiveFilter("action")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeFilter === "action" ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Action Required ({notifications.filter((n) => n.category === "action").length})
        </button>
        <button
          onClick={() => setActiveFilter("status")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
            activeFilter === "status" ? "bg-navy text-white shadow-sm" : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          Status Updates ({notifications.filter((n) => n.category === "status").length})
        </button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifs.length > 0 ? (
          filteredNotifs.map((notif) => (
            <NotificationItem
              key={notif.id}
              notification={notif}
              onMarkRead={handleToggleRead}
            />
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-3">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-navy">No notifications</h3>
            <p className="text-xs text-slate-500 mt-1">
              You are all caught up! New updates regarding your visa will appear here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
