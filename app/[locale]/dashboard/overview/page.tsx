"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText, Clock, AlertTriangle, Bell,
  CheckCircle, UploadCloud, ArrowRight,
  ChevronRight, Trash2, Play
} from "lucide-react";
import { mockApplications, mockApplicationHistory, getStatusLabel, getStatusColor } from "@/data/dashboard/applications";
import { mockNotifications } from "@/data/dashboard/notifications";
import { mockProfile } from "@/data/dashboard/profile";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { cn } from "@/lib/utils";

const activeApps = mockApplications.filter((a) => a.status !== "draft");
const draftApp = mockApplications.find((a) => a.status === "draft");
const actionApp = mockApplications.find((a) => a.status === "action_required");
const unreadCount = mockNotifications.filter((n) => !n.isRead).length;

function SummaryCard({ icon: Icon, label, value, color }: { icon: any; label: string; value: string; color: string }) {
  return (
    <div className={cn("bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4 hover:shadow-md transition-shadow")}>
      <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", color)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-2xl font-extrabold text-navy leading-none">{value}</div>
        <div className="text-xs font-semibold text-slate-500 mt-1 leading-tight">{label}</div>
      </div>
    </div>
  );
}

function AppStepTracker({ steps }: { steps: typeof mockApplications[0]["steps"] }) {
  return (
    <div className="flex items-center gap-0 mt-4 overflow-x-auto">
      {steps.map((step, i) => (
        <div key={step.id} className="flex items-center flex-shrink-0">
          <div className="flex flex-col items-center gap-1">
            <div className={cn(
              "w-7 h-7 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all",
              step.completed
                ? "bg-emerald-500 border-emerald-500 text-white"
                : step.active
                  ? "bg-saffron border-saffron text-white animate-pulse"
                  : "bg-white border-slate-300 text-slate-400"
            )}>
              {step.completed ? <CheckCircle className="w-3.5 h-3.5" /> : step.id}
            </div>
            <span className={cn("text-[10px] font-semibold whitespace-nowrap", step.active ? "text-saffron" : step.completed ? "text-emerald-600" : "text-slate-400")}>
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div className={cn("h-0.5 w-8 sm:w-12 mx-1 flex-shrink-0 -mt-4", steps[i + 1].completed || steps[i + 1].active ? "bg-emerald-400" : "bg-slate-200")} />
          )}
        </div>
      ))}
    </div>
  );
}

export default function DashboardOverviewPage() {
  const [historyFilter, setHistoryFilter] = useState<"all" | "completed" | "rejected">("all");
  const filteredHistory = historyFilter === "all"
    ? mockApplicationHistory
    : mockApplicationHistory.filter((a) => a.status === historyFilter);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome */}
      <div className="bg-gradient-to-r from-navy to-navy-light text-white rounded-2xl px-6 py-5 flex items-center justify-between overflow-hidden relative shadow-md">
        <div className="absolute right-0 top-0 opacity-5">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="" className="h-36 w-auto" />
        </div>
        <div>
          <h2 className="text-xl font-bold mb-1">Welcome back, {mockProfile.fullName} 👋</h2>
          <p className="text-white/70 text-sm">Here&apos;s an overview of your visa applications and the next steps.</p>
        </div>
        <Link
          href="/en/apply/type-selection"
          className="hidden sm:flex items-center gap-2 bg-saffron hover:bg-saffron-600 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm flex-shrink-0"
        >
          New Application <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={FileText} label="Active Applications" value={`0${activeApps.length}`} color="bg-blue-50 text-blue-600" />
        <SummaryCard icon={Clock} label="Current Status" value="Processing" color="bg-amber-50 text-amber-600" />
        <SummaryCard icon={AlertTriangle} label="Pending Actions" value="01" color="bg-red-50 text-red-500" />
        <SummaryCard icon={Bell} label="Notifications" value={`0${unreadCount}`} color="bg-saffron/10 text-saffron" />
      </div>

      {/* Action Required */}
      {actionApp ? (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-red-700 text-sm mb-0.5">⚠ Action Required</div>
              <p className="font-bold text-slate-800">Additional document required</p>
              <p className="text-slate-600 text-sm mt-1">{actionApp.remarks}</p>
              <p className="text-xs text-slate-500 mt-1.5">Application: <span className="font-semibold text-navy">{actionApp.visaType} — {actionApp.applicationNo}</span></p>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Link
              href="/en/dashboard/documents"
              className="flex items-center gap-2 bg-saffron hover:bg-saffron-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              <UploadCloud className="w-4 h-4" /> Upload Document
            </Link>
            <Link href={`/en/dashboard/applications/${actionApp.id}`} className="flex items-center gap-2 border border-slate-300 text-slate-700 hover:border-navy hover:text-navy px-4 py-2 rounded-xl text-sm font-semibold transition-all">
              View Application
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 flex items-center gap-3 shadow-sm">
          <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
          <div>
            <p className="font-bold text-emerald-800">You&apos;re all caught up!</p>
            <p className="text-sm text-emerald-700">No action is currently required from you.</p>
          </div>
        </div>
      )}

      {/* My Applications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-navy">My Applications</h3>
          <Link href="/en/dashboard/applications" className="text-sm font-semibold text-saffron hover:underline flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-4">
          {activeApps.map((app) => (
            <div key={app.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-navy">{app.visaType}</h4>
                    <StatusBadge status={app.status} size="sm" />
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">Application No. <span className="font-semibold text-slate-700">{app.applicationNo}</span></p>
                </div>
                <div className="text-right text-xs text-slate-500">
                  <div>Submitted: <span className="font-semibold">{app.submittedDate}</span></div>
                  <div>Updated: <span className="font-semibold">{app.lastUpdated}</span></div>
                </div>
              </div>
              {app.steps.length > 0 && (
                <>
                  <AppStepTracker steps={app.steps} />
                  <p className="text-xs text-slate-500 mt-2">Step {app.steps.findIndex(s => s.active) + 1} of {app.steps.length}</p>
                </>
              )}
              <div className="mt-4 flex gap-2 flex-wrap">
                <Link href={`/en/dashboard/applications/${app.id}`} className="flex items-center gap-1.5 bg-navy text-white px-4 py-2 rounded-xl text-xs font-semibold hover:bg-navy-dark transition-colors">
                  <FileText className="w-3.5 h-3.5" /> View Application
                </Link>
                <Link href="/en/status" className="flex items-center gap-1.5 border border-slate-300 text-slate-700 hover:border-navy hover:text-navy px-4 py-2 rounded-xl text-xs font-semibold transition-all">
                  Track Status
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Draft Application */}
      {draftApp && (
        <div className="bg-white rounded-2xl border-2 border-dashed border-saffron/40 shadow-sm p-5">
          <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-navy">Continue Your Application</h4>
                <StatusBadge status="draft" size="sm" />
              </div>
              <p className="text-slate-600 text-sm mt-0.5">{draftApp.visaType}</p>
              <p className="text-xs text-slate-400 mt-1">Last saved: {draftApp.lastSaved}</p>
            </div>
            <span className="text-2xl font-extrabold text-saffron">{draftApp.progress}%</span>
          </div>
          <div className="mb-3">
            <div className="w-full bg-slate-100 rounded-full h-2">
              <div className="bg-saffron rounded-full h-2 transition-all" style={{ width: `${draftApp.progress}%` }} />
            </div>
          </div>
          <p className="text-xs text-slate-500 mb-4">Remaining: {draftApp.draftSections?.join(", ")}</p>
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/en/apply/form"
              className="flex items-center gap-2 bg-saffron hover:bg-saffron-600 text-white px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm"
            >
              <Play className="w-3.5 h-3.5" /> Continue Application
            </Link>
            <button
              onClick={() => alert("Draft removed")}
              className="flex items-center gap-2 border border-red-200 text-red-500 hover:bg-red-50 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete Draft
            </button>
          </div>
        </div>
      )}

      {/* Latest Notifications */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-navy">Latest Notifications</h3>
          <Link href="/en/dashboard/notifications" className="text-sm font-semibold text-saffron hover:underline flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50 overflow-hidden">
          {mockNotifications.slice(0, 4).map((n) => (
            <div key={n.id} className={cn("px-5 py-4 hover:bg-slate-50 cursor-pointer transition-colors flex items-start gap-3", !n.isRead && "bg-blue-50/40")}>
              <span className={cn("w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0", n.category === "action" ? "bg-red-400" : n.isRead ? "bg-slate-300" : "bg-blue-400")} />
              <div className="flex-1 min-w-0">
                <p className={cn("text-sm font-semibold leading-tight", !n.isRead ? "text-navy" : "text-slate-700")}>{n.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{n.date}</p>
              </div>
              {!n.isRead && <span className="w-2 h-2 rounded-full bg-saffron flex-shrink-0 mt-2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Application History */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-navy">Application History</h3>
          <div className="flex gap-1 bg-slate-100 p-0.5 rounded-lg">
            {(["all", "completed", "rejected"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setHistoryFilter(f)}
                className={cn("px-3 py-1 rounded-lg text-xs font-semibold transition-colors capitalize", historyFilter === f ? "bg-white text-navy shadow-sm" : "text-slate-500 hover:text-navy")}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm divide-y divide-slate-50 overflow-hidden">
          {filteredHistory.length === 0 ? (
            <div className="py-12 text-center text-slate-400 text-sm">No applications in this category.</div>
          ) : filteredHistory.map((app) => (
            <div key={app.id} className="px-5 py-4 flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors">
              <div>
                <p className="font-semibold text-slate-800 text-sm">{app.visaType}</p>
                <p className="text-xs text-slate-500">{app.applicationNo} · {app.lastUpdated}</p>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={app.status} size="sm" />
                <Link href={`/en/dashboard/applications/${app.id}`} className="text-xs font-semibold text-saffron hover:underline whitespace-nowrap">View →</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
