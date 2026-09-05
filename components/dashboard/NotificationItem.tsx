"use client";

import Link from "next/link";
import { Bell, CheckCircle, AlertTriangle, FileText, Info, ArrowRight, Check } from "lucide-react";
import { DashboardNotification } from "@/data/dashboard/notifications";
import { cn } from "@/lib/utils";

interface NotificationItemProps {
  notification: DashboardNotification;
  onMarkRead?: (id: string) => void;
}

export default function NotificationItem({ notification, onMarkRead }: NotificationItemProps) {
  const getCategoryIcon = (cat: DashboardNotification["category"]) => {
    switch (cat) {
      case "action":
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case "document":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "status":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "info":
      default:
        return <Info className="w-5 h-5 text-navy" />;
    }
  };

  const getCategoryBg = (cat: DashboardNotification["category"]) => {
    switch (cat) {
      case "action":
        return "bg-red-50 border-red-100";
      case "document":
        return "bg-blue-50 border-blue-100";
      case "status":
        return "bg-emerald-50 border-emerald-100";
      case "info":
      default:
        return "bg-slate-100 border-slate-200";
    }
  };

  return (
    <div className={cn(
      "rounded-2xl border p-4 sm:p-5 transition-all shadow-sm",
      !notification.isRead ? "bg-white border-slate-200 ring-1 ring-saffron/20" : "bg-slate-50/60 border-slate-200/60 opacity-80"
    )}>
      <div className="flex items-start gap-3.5">
        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border", getCategoryBg(notification.category))}>
          {getCategoryIcon(notification.category)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className={cn("text-sm sm:text-base font-bold text-navy", !notification.isRead && "text-slate-900")}>
                  {notification.title}
                </h4>
                {!notification.isRead && (
                  <span className="w-2 h-2 rounded-full bg-saffron inline-block" />
                )}
              </div>
              <span className="text-xs text-slate-400 mt-0.5 block">{notification.date}</span>
            </div>

            {onMarkRead && (
              <button
                onClick={() => onMarkRead(notification.id)}
                className="text-xs text-slate-400 hover:text-navy px-2 py-1 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1"
                title={notification.isRead ? "Mark as unread" : "Mark as read"}
              >
                <Check className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{notification.isRead ? "Unread" : "Mark Read"}</span>
              </button>
            )}
          </div>

          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            {notification.message}
          </p>

          {notification.actionRequired && notification.actionLabel && (
            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center gap-3">
              <Link
                href="/en/dashboard/documents"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-saffron hover:bg-saffron-600 text-white text-xs font-semibold shadow-sm transition-all"
              >
                {notification.actionLabel}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
